import Link from 'next/link';

import Rating from '@/components/inputs/rating';
import { ROUTES } from '@/lib/constants/routes.constants';
import { Beer } from '@/lib/types/beer.types';
import { cn } from '@/lib/utils';
import { ArticleCard, CardContent, CardFooter, CardTitle } from '@/shadcn/card';
import { Skeleton } from '@/shadcn/skeleton';

type CardProps = React.ComponentProps<typeof ArticleCard> & {
    product: Beer;
};

export default function RecommendedCard({ product, ...props }: CardProps) {
    return (
        <Link href={ROUTES.PRIVATE.BEER(product.id)}>
            <ArticleCard
                className={cn(
                    'h-[210px] w-[200px] flex-shrink-0 overflow-hidden border-0 border-none p-0 pb-2 shadow-sm ring-0 outline-none'
                )}
                {...props}>
                <CardContent className='p-0'>
                    <img src={product.image} alt={product.name} className='aspect-video h-full w-full object-cover' />
                </CardContent>
                <CardFooter className='flex flex-col items-start justify-between space-y-2 p-2'>
                    <CardTitle className='text-base font-normal'>
                        <p>{product.name}</p>
                    </CardTitle>
                    <Rating rating={product.rating} />
                </CardFooter>
            </ArticleCard>
        </Link>
    );
}

export function RecommendedCardSkeleton() {
    return (
        <div className='h-[210px] w-[200px] flex-shrink-0 overflow-hidden border-0 border-none p-0 pb-2 shadow-sm ring-0 outline-none'>
            <Skeleton className='h-[140px] w-full' />
            <div className='flex flex-col items-start justify-between space-y-2 p-2'>
                <Skeleton className='h-5 w-full' />
                <Skeleton className='h-4 w-20' />
            </div>
        </div>
    );
}
