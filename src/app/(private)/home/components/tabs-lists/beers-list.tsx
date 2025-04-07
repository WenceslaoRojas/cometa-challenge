import ProductCard, { ProductCardSkeleton } from '@/components/cards/product-card';
import { Beer } from '@/lib/types/beer.types';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface BeersListProps {
    beers: Beer[];
    loading?: boolean;
}

export default function BeersList({ beers, loading }: BeersListProps) {
    const [parent] = useAutoAnimate();

    return (
        <div className='mt-4 flex flex-col space-y-6 overflow-y-auto' ref={parent}>
            {loading
                ? Array.from({ length: 10 }, (_, index) => <ProductCardSkeleton key={index} />)
                : beers?.map((beer) => <ProductCard key={beer.id} beer={beer} />)}
        </div>
    );
}
