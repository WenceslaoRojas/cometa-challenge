'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import BgHero, { BgHeroSkeleton } from '@/app/(private)/beer/[id]/components/bg-hero';
import ProductBody, { ProductBodySkeleton } from '@/app/(private)/beer/[id]/components/product-body';
import { Beer } from '@/lib/types/beer.types';
import { getBeerById } from '@/services/beer.service';
import { getStock } from '@/services/stock.service';

interface BeerClientContainerProps {
    beerId: Beer['id'];
}

export default function BeerClientContainer({ beerId }: BeerClientContainerProps) {
    const [beer, setBeer] = useState<Beer | null>(null);
    const [stock, setStock] = useState(0);
    const router = useRouter();
    const customNotFound = () => {
        return router.push('/404');
    };

    const fetchBeer = async () => {
        try {
            const res = await getBeerById(beerId);
            if (!res) return customNotFound();
            setBeer(res);
        } catch (error) {
            console.error('Error fetching beer:', error);

            return customNotFound();
        }
    };

    const fetchStock = async () => {
        try {
            const res = await getStock();
            if (!res) return customNotFound();

            const beerStock = res.beers.find((item) => item.beerId === beerId);
            if (!beerStock) return customNotFound();

            setStock(beerStock.quantity);
        } catch (error) {
            console.error('Error fetching stock:', error);

            return customNotFound();
        }
    };

    useEffect(() => {
        fetchBeer();
        fetchStock();
    }, [beerId]);

    if (!beer) {
        return (
            <div>
                <BgHeroSkeleton />
                <ProductBodySkeleton />
            </div>
        );
    }

    return (
        <div>
            <BgHero beer={beer} />
            <ProductBody beer={beer} stock={stock} />
        </div>
    );
}
