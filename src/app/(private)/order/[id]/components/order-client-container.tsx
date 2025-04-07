'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import OrderItemsList, { OrderItemsListSkeleton } from '@/app/(private)/order/[id]/components/order-items-list';
import PayOrderButton from '@/app/(private)/order/[id]/components/pay-order-button';
import { Order } from '@/lib/types/beer.types';
import { getOrderById } from '@/services/order.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface OrderClientContainerProps {
    orderId: string;
}

export default function OrderClientContainer({ orderId }: OrderClientContainerProps) {
    const [order, setOrder] = useState<Order | null>(null);
    const router = useRouter();
    const [parent] = useAutoAnimate();
    const customNotFound = () => {
        return router.push('/404');
    };

    const fetchOrder = async () => {
        try {
            const res = await getOrderById(orderId);
            if (!res) return customNotFound();
            setOrder(res);
        } catch (error) {
            console.error('Error fetching order:', error);

            return customNotFound();
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    return (
        <div ref={parent}>
            {!order ? (
                <OrderItemsListSkeleton />
            ) : (
                <>
                    <OrderItemsList order={order} />
                    <PayOrderButton order={order} />
                </>
            )}
        </div>
    );
}
