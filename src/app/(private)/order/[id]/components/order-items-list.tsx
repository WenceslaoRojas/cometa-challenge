import { useId } from 'react';

import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes.constants';
import { Order } from '@/lib/types/beer.types';
import { formatCurrency, getItemPrice } from '@/lib/utils';
import { Separator } from '@/shadcn/separator';
import { Skeleton } from '@/shadcn/skeleton';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface OrderItemsListProps {
    order: Order;
}

export default function OrderItemsList({ order }: OrderItemsListProps) {
    const [parent] = useAutoAnimate();

    const orderTotal = order.items.reduce((sum, item) => {
        const { total } = getItemPrice(item);

        return sum + total;
    }, 0);

    return (
        <div className='space-y-6' ref={parent}>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Order Items</h2>
            </div>

            <ul className='space-y-4'>
                {order.items.map((item) => {
                    const { discount, total, discountAmount, subtotal } = getItemPrice(item);

                    return (
                        <li key={useId()} className='rounded-md border p-4'>
                            <Link
                                href={ROUTES.PRIVATE.BEER(item.beer.id)}
                                title='View Beer'
                                className='flex flex-row items-center space-x-4'>
                                <div className='relative h-16 w-16 flex-shrink-0'>
                                    <img
                                        src={item.beer.image}
                                        alt={item.beer.name}
                                        className='h-full w-full rounded-md object-cover'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-medium'>{item.beer.name}</h3>
                                    <p className='text-muted-foreground text-sm'>
                                        {item.beer.style} • {item.beer.alcoholContent}% ABV
                                    </p>
                                </div>
                                <div className='flex flex-col items-end text-sm'>
                                    <p className='text-muted-foreground'>
                                        {formatCurrency(item.beer.price)} × {item.quantity}
                                    </p>
                                    <p>Subtotal: {formatCurrency(subtotal)}</p>
                                    {discount > 0 && (
                                        <p className='text-green-600'>
                                            -{formatCurrency(discountAmount)} ({item.beer.discount}%)
                                        </p>
                                    )}
                                    <p className='font-semibold'>Total: {formatCurrency(total)}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Separator className='my-4' />

            <div className='p-4'>
                <div className='grid grid-cols-2 gap-2'>
                    <p className='text-muted-foreground'>Subtotal:</p>
                    <p className='text-right'>{formatCurrency(order.subtotal)}</p>

                    <p className='text-muted-foreground'>Taxes:</p>
                    <p className='text-right'>{formatCurrency(order.taxes)}</p>

                    <p className='text-muted-foreground'>Discounts:</p>
                    <p className='text-right text-green-600'>-{formatCurrency(order.discounts)}</p>

                    <p className='font-bold'>Total:</p>
                    <p className='text-right font-bold'>{formatCurrency(orderTotal)}</p>
                </div>
            </div>
        </div>
    );
}

export function OrderItemsListSkeleton() {
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Order Items</h2>
            </div>

            <ul className='space-y-4'>
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className='rounded-md border p-4'>
                        <div className='flex flex-row items-center space-x-4'>
                            <Skeleton className='h-16 w-16 flex-shrink-0' />
                            <div className='flex-1'>
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='mt-2 h-4 w-full' />
                            </div>
                            <div className='flex flex-col items-end text-sm'>
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='mt-2 h-4 w-full' />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Separator className='my-4' />

            <div className='p-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-full' />
            </div>
        </div>
    );
}
