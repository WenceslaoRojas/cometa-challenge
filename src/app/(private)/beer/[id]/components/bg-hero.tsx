import { Beer } from '@/lib/types/beer.types';
import { Skeleton } from '@/shadcn/skeleton';

interface BgHeroProps {
    beer: Beer;
}

export default function BgHero({ beer }: BgHeroProps) {
    return (
        <img
            src={beer.image}
            alt={beer.name}
            className='absolute top-0 left-0 z-10 h-[80vh] w-full max-w-md object-cover'
        />
    );
}

export function BgHeroSkeleton() {
    return (
        <div className='relative h-80 w-full'>
            <Skeleton className='absolute top-0 left-0 z-10 h-full w-full' />
        </div>
    );
}
