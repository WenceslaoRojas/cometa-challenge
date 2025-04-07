'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';
import { Order } from '@/lib/types/beer.types';
import { updateOrder } from '@/services/order.service';
import { Button } from '@/shadcn/button';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PayOrderButtonProps {
    order: Order;
}

export default function PayOrderButton({ order }: PayOrderButtonProps) {
    if (order.paid) {
        return <></>;
    }

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        setLoading(true);

        try {
            await updateOrder(order.id, {
                paid: true
            });
            toast.success('Order updated successfully');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push(ROUTES.PRIVATE.ORDERS);
        } catch (error) {
            toast.error('Error updating order');
            console.error('Error updating order:', error);
            setLoading(false);

            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            size='lg'
            className='w-full'
            title='Pay for your order'
            onClick={handleCheckout}
            disabled={loading}
            aria-label='Pay for your order'>
            Checkout Now
            <Loader2 className={`animate-spin ${loading ? 'block' : 'hidden'}`} />
        </Button>
    );
}
