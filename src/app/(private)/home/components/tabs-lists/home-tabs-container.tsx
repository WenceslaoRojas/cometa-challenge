'use client';

import { useEffect, useState } from 'react';

import BeersList from '@/app/(private)/home/components/tabs-lists/beers-list';
import { Beer } from '@/lib/types/beer.types';
import { cn } from '@/lib/utils';
import { getBeers } from '@/services/beer.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/tabs';

import { toast } from 'sonner';

const tabClassName = cn(
    'relative text-secondary text-sm data-[state=active]:font-medium data-[state=active]:text-black data-[state=active]:shadow-none ',
    "data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-13px] ",
    'data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[40px] ',
    'data-[state=active]:after:h-[3px] data-[state=active]:after:bg-black ',
    'data-[state=active]:after:transition-all data-[state=active]:after:duration-300 data-[state=active]:after:ease-in-out ',
    "after:content-[''] after:absolute after:bottom-[-13px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[3px] after:bg-black"
);

export default function HomeTabsContainer() {
    const [tab, setTab] = useState<'new-beer' | 'popular'>('new-beer');
    const [beers, setBeers] = useState<Beer[]>([]);
    const [loading, setLoading] = useState(true);

    const handleTabChange = (value: 'new-beer' | 'popular') => {
        setTab(value);
    };

    const fetchBeers = async () => {
        setLoading(true);
        try {
            const res = await getBeers();
            if (res) {
                setBeers(res);
            }
        } catch (error) {
            console.error('Error fetching beers:', error);
            toast.error('Error fetching beers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBeers();
    }, []);

    // Sort beers without mutating original array
    const sortedNewBeers = [...beers].sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);

        // Handle invalid dates
        if (isNaN(dateA.getTime())) return 1; // Push invalid dates to end
        if (isNaN(dateB.getTime())) return -1;

        return dateB.getTime() - dateA.getTime(); // Newest first
    });

    const sortedPopularBeers = [...beers].sort((a, b) => b.rating - a.rating);

    return (
        <Tabs defaultValue={tab} className='w-full'>
            <TabsList
                className={cn(
                    'border-secondary/20 flex w-full items-center justify-start gap-2 rounded-none border-b-[0.5px] bg-transparent px-2 pb-[10px]',
                    'bg-background sticky top-0 z-30'
                )}>
                <TabsTrigger className={tabClassName} value='new-beer' onClick={() => handleTabChange('new-beer')}>
                    New Beers
                </TabsTrigger>
                <TabsTrigger className={tabClassName} value='popular' onClick={() => handleTabChange('popular')}>
                    Popular Beers
                </TabsTrigger>
            </TabsList>
            <TabsContent value='new-beer' className='pt-4'>
                <BeersList beers={sortedNewBeers} loading={loading} />
            </TabsContent>
            <TabsContent value='popular' className='pt-4'>
                <BeersList beers={sortedPopularBeers} loading={loading} />
            </TabsContent>
        </Tabs>
    );
}
