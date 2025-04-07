'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import OrderList from '@/app/(private)/orders/components/tabs-lists/order-list';
import { User } from '@/lib/types/auth.types';
import { Order } from '@/lib/types/beer.types';
import { cn } from '@/lib/utils';
import { getOrders } from '@/services/order.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/tabs';
import { authStore } from '@/stores/auth.store';

const tabClassName = cn(
    'relative text-secondary text-sm data-[state=active]:font-medium data-[state=active]:text-black data-[state=active]:shadow-none',
    "data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-13px] ",
    'data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[40px] ',
    'data-[state=active]:after:h-[3px] data-[state=active]:after:bg-black ',
    'data-[state=active]:after:transition-all data-[state=active]:after:duration-300 data-[state=active]:after:ease-in-out ',
    "after:content-[''] after:absolute after:bottom-[-13px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[3px] after:bg-black"
);

export function OrdersTabsContainer() {
    const [tab, setTab] = useState<'in-progress' | 'past-orders'>('in-progress');
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const user = authStore((state: any) => state.user as User);
    const router = useRouter();
    const customNotFound = () => {
        return router.push('/404');
    };

    const handleTabChange = (value: 'in-progress' | 'past-orders') => {
        setTab(value);
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrders({ userId: user.uid });
            if (!res) {
                return customNotFound();
            }
            setOrders(res);
        } catch (error) {
            console.error('Error fetching orders:', error);

            return customNotFound();
        } finally {
            setLoading(false);
        }
    };

    const ordersToRender =
        orders?.filter((order) => {
            if (tab === 'in-progress') {
                return order.paid === false;
            } else if (tab === 'past-orders') {
                return order.paid === true;
            }

            return false;
        }) || [];

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Tabs defaultValue='in-progress' className='w-full'>
            <TabsList
                className={cn(
                    'border-secondary/20 flex w-full items-center justify-start gap-2 rounded-none border-b-[0.5px] bg-transparent px-2 pb-[10px]',
                    'bg-background sticky top-0 z-30'
                )}>
                <TabsTrigger
                    className={tabClassName}
                    value='in-progress'
                    onClick={() => handleTabChange('in-progress')}>
                    In Progress
                </TabsTrigger>
                <TabsTrigger
                    className={tabClassName}
                    value='past-orders'
                    onClick={() => handleTabChange('past-orders')}>
                    Past Orders
                </TabsTrigger>
            </TabsList>
            <TabsContent value='in-progress' className='pt-4'>
                <OrderList orders={ordersToRender.filter((order) => order.paid === false)} loading={loading} />
            </TabsContent>
            <TabsContent value='past-orders' className='pt-4'>
                <OrderList orders={ordersToRender.filter((order) => order.paid === true)} loading={loading} />
            </TabsContent>
        </Tabs>
    );
}
