import Link from 'next/link';

import Rating from '@/components/inputs/rating';
import { ROUTES } from '@/lib/constants/routes.constants';
import { Beer } from '@/lib/types/beer.types';
import { cn, formatCurrency } from '@/lib/utils';
import { ArticleCard } from '@/shadcn/card';
import { Skeleton } from '@/shadcn/skeleton';

interface ProductCardProps {
    beer: Beer;
}

export default function ProductCard({ beer }: ProductCardProps) {
    const hasDiscount = beer.discount > 0;
    const discountedPrice = hasDiscount ? beer.price * (1 - beer.discount / 100) : beer.price;

    return (
        <Link href={ROUTES.PRIVATE.BEER(beer.id)}>
            <ArticleCard
                className={cn(
                    'mx-auto flex w-full flex-shrink-0 flex-row items-center justify-between rounded-none border-none p-0 px-4 shadow-none'
                )}>
                <div className='flex flex-row items-center space-x-4'>
                    <img
                        src={beer.image}
                        alt={beer.name}
                        className='aspect-square size-[60px] rounded-lg object-cover'
                    />
                    <div>
                        <h3 className='text-base font-normal'>{beer.name}</h3>
                        {hasDiscount ? (
                            <div className='flex items-center gap-2 text-xs'>
                                <p className='text-secondary font-light line-through'>{formatCurrency(beer.price)}</p>
                                <p className='font-medium text-red-500'>{formatCurrency(discountedPrice)}</p>
                            </div>
                        ) : (
                            <p className='text-secondary text-xs font-light'>{formatCurrency(beer.price)}</p>
                        )}
                    </div>
                </div>
                <Rating rating={beer.rating} />
            </ArticleCard>
        </Link>
    );
}

export function ProductCardSkeleton() {
    return (
        <ArticleCard className='mx-auto flex w-full flex-shrink-0 flex-row items-center justify-between rounded-none border-none p-0 px-4 shadow-none'>
            <div className='flex flex-row items-center space-x-4'>
                <Skeleton className='aspect-square size-[60px] rounded-lg' />
                <div>
                    <Skeleton className='mb-2 h-[20px] w-[100px]' />
                    <Skeleton className='h-[15px] w-[80px]' />
                </div>
            </div>
            <Skeleton className='h-4 w-20' />
        </ArticleCard>
    );
}
