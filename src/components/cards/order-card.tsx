import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes.constants';
import { Order } from '@/lib/types/beer.types';
import { cn, formatCurrency } from '@/lib/utils';
import { ArticleCard } from '@/shadcn/card';
import { Skeleton } from '@/shadcn/skeleton';

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <Link href={ROUTES.PRIVATE.ORDER(order.id)}>
            <ArticleCard
                className={cn(
                    'mx-auto flex w-full flex-shrink-0 flex-row items-center justify-between rounded-none border-none p-0 px-4 shadow-none'
                )}>
                <div className='flex flex-row items-center space-x-4'>
                    <img
                        src={order.items[0].beer.image}
                        alt={order.items[0].beer.name}
                        className='aspect-square size-[60px] rounded-lg object-cover'
                    />
                    <div>
                        <h3 className='text-base font-normal'>{order.items[0].beer.name}</h3>
                        <p className='text-secondary text-xs font-light'>
                            {`${order.items.length} rounds - ${formatCurrency(order.subtotal)}`}
                        </p>
                    </div>
                </div>
            </ArticleCard>
        </Link>
    );
}

export const OrderCardSkeleton = () => {
    return (
        <ArticleCard className='mx-auto flex w-full flex-shrink-0 flex-row items-center justify-between rounded-none border-none p-0 px-4 shadow-none'>
            <div className='flex w-full flex-row items-center justify-between space-x-4'>
                <Skeleton className='aspect-square size-[60px] rounded-lg object-cover' />
                <div className='flex w-2/3 flex-col space-y-2'>
                    <Skeleton className='h-5 w-full' />
                    <Skeleton className='h-4 w-2/3' />
                </div>
            </div>
        </ArticleCard>
    );
};
