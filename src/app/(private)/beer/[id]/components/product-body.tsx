'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

// Assuming you're using a toast library
import OrderCount from '@/app/(private)/beer/[id]/components/order-count';
import Rating from '@/components/inputs/rating';
import { ROUTES } from '@/lib/constants/routes.constants';
import { User } from '@/lib/types/auth.types';
import { Beer, Order } from '@/lib/types/beer.types';
import { formatCurrency } from '@/lib/utils';
import { createOrder, getOrders, updateOrder } from '@/services/order.service';
import { getStock, updateStock } from '@/services/stock.service';
import { Button } from '@/shadcn/button';
import { Skeleton } from '@/shadcn/skeleton';
import { authStore } from '@/stores/auth.store';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductBodyProps {
    beer: Beer;
    stock: number;
}

export default function ProductBody({ beer, stock: initialStock }: ProductBodyProps) {
    const [orderCount, setOrderCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = authStore((state: any) => state.user as User);
    const router = useRouter();

    const handleOrderCountChange = useCallback(
        (newCount: number) => {
            setOrderCount(Math.max(0, Math.min(newCount, initialStock)));
        },
        [initialStock]
    );

    const handleOrderNow = useCallback(async () => {
        if (!orderCount || loading) return;

        setLoading(true);
        try {
            // Get existing unpaid order or create new one
            const orders = await getOrders({ userId: user.uid });
            const order: Order =
                orders?.find((o) => !o.paid) ||
                (await createOrder({
                    author: user.uid,
                    paid: false,
                    subtotal: 0,
                    taxes: 0,
                    discounts: 0,
                    items: [],
                    rounds: []
                }));

            const newItem = { beer, quantity: orderCount };
            const round = {
                created_at: new Date().toISOString(),
                items: [newItem]
            };

            // Update order calculations
            order.rounds = [...(order.rounds || []), round];
            order.items = [...(order.items || []), newItem];
            order.subtotal = (order.subtotal || 0) + beer.price * orderCount;
            order.taxes = (order.taxes || 0) + beer.price * orderCount * 0.2;
            order.discounts = (order.discounts || 0) + beer.price * orderCount * (beer.discount / 100);
            order.updated_at = new Date().toISOString();

            await updateOrder(order.id, order);

            // Update stock
            const currentStock = await getStock();
            if (currentStock) {
                const stockItemIndex = currentStock.beers.findIndex((item) => item.beerId === beer.id);
                if (stockItemIndex !== -1) {
                    currentStock.beers[stockItemIndex].quantity -= orderCount;
                    await updateStock({
                        beers: currentStock.beers,
                        last_updated: new Date().toISOString()
                    });
                }
            }
            router.push(ROUTES.PRIVATE.ORDER(order.id));
            setOrderCount(0);
        } catch (error) {
            console.error('Error processing order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [beer, orderCount, user.uid, loading]);

    return (
        <div className='ob-4 absolute inset-x-0 bottom-0 z-20 flex h-[50vh] w-full flex-col justify-between space-y-6 rounded-t-2xl bg-white p-4 pt-8'>
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-black'>{beer.name}</h1>
                    <Rating rating={beer.rating} />
                </div>
                <OrderCount
                    orderCount={orderCount}
                    stock={initialStock}
                    setOrderCount={handleOrderCountChange}
                    loading={loading}
                />
            </div>

            <p className='text-secondary text-pretty'>{beer.description}</p>

            <div className='space-y-2'>
                <div className='flex gap-2'>
                    <p className='text-black'>Alcohol content:</p>
                    <p className='text-secondary'>{beer.alcoholContent} % vol</p>
                </div>
                <div className='flex gap-2'>
                    <p className='text-black'>Style:</p>
                    <p className='text-secondary'>{beer.style}</p>
                </div>
            </div>

            <div className='flex w-full items-center justify-between'>
                <div>
                    <p className='text-secondary text-sm'>Price:</p>
                    {beer.discount > 0 ? (
                        <div className='flex items-center gap-2'>
                            <div className='relative'>
                                <p className='text-base text-gray-400 line-through'>{formatCurrency(beer.price)}</p>
                                <span className='absolute -top-6 -right-4 flex size-6 items-center justify-center rounded-full bg-green-700 text-xs font-light text-white'>
                                    -{beer.discount}%
                                </span>
                            </div>
                            <p className='text-xl text-black'>
                                {formatCurrency(beer.price * (1 - beer.discount / 100))}
                            </p>
                        </div>
                    ) : (
                        <p className='text-xl text-black'>{formatCurrency(beer.price)}</p>
                    )}
                </div>
                <Button
                    size='lg'
                    className='w-1/2'
                    onClick={handleOrderNow}
                    disabled={orderCount === 0 || loading}
                    aria-label='Order Now'>
                    {loading ? <Loader2 className='mr-2 animate-spin' /> : null}
                    Order Now
                </Button>
            </div>
        </div>
    );
}

export function ProductBodySkeleton() {
    return (
        <div className='absolute inset-x-0 bottom-0 z-20 flex h-[40vh] w-full flex-col justify-between space-y-6 rounded-t-2xl bg-white p-4 pt-8'>
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col space-y-2'>
                    <Skeleton className='h-6 w-1/2' />
                    <Skeleton className='h-4 w-1/4' />
                </div>
                <Skeleton className='h-10 w-1/4' />
            </div>
            <Skeleton className='h-24 w-full' />
            <div className='space-y-2'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-6 w-3/4' />
            </div>
            <div className='flex w-full items-center justify-between'>
                <Skeleton className='h-12 w-[30%]' />
                <Skeleton className='h-[40px] w-[100px]' />
            </div>
        </div>
    );
}
