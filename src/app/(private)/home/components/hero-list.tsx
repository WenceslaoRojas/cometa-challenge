import { useEffect, useState } from 'react';

import RecommendedCard, { RecommendedCardSkeleton } from '@/components/cards/recommended-card';
import { Beer } from '@/lib/types/beer.types';
import { cn } from '@/lib/utils';
import { getBeers } from '@/services/beer.service';

import { toast } from 'sonner';

interface HeroListProps {
    className?: string;
}

export default function HeroList(props: HeroListProps) {
    const { className } = props;
    const [beers, setBeers] = useState<Beer[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className={cn('scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-4 whitespace-nowrap', className)}>
            {loading
                ? Array.from({ length: 5 }, (_, index) => <RecommendedCardSkeleton key={index} />)
                : beers.map((product) => <RecommendedCard key={product.id} product={product} />)}
        </div>
    );
}
