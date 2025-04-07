'use client';

import { Button } from '@/shadcn/button';

import { Minus, Plus } from 'lucide-react';

interface OrderCountProps {
    orderCount: number;
    setOrderCount: (count: number) => void;
    stock: number;
    loading: boolean;
}

export default function OrderCount({ orderCount, setOrderCount, stock, loading }: OrderCountProps) {
    return (
        <div className='flex items-center justify-center gap-2'>
            <Button
                variant='outline'
                className='w-fit border-black'
                onClick={() => setOrderCount(orderCount + 1)}
                disabled={orderCount >= stock || loading}
                aria-label='Increase order count'
                title='Increase order count'>
                <Plus />
            </Button>
            <span className='mx-2 text-lg font-bold'>{orderCount}</span>
            <Button
                variant='outline'
                className='w-fit border-black'
                onClick={() => setOrderCount(orderCount - 1)}
                disabled={orderCount <= 0}
                aria-label='Decrease order count'
                title='Decrease order count'>
                <Minus />
            </Button>
        </div>
    );
}
