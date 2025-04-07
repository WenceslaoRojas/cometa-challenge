import OrderCard, { OrderCardSkeleton } from '@/components/cards/order-card';
import { Order } from '@/lib/types/beer.types';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface OrderListProps {
    orders: Order[];
    loading?: boolean;
}

export default function OrderList({ orders, loading }: OrderListProps) {
    const [parent] = useAutoAnimate();

    if (orders.length === 0 && !loading) {
        return (
            <div className='mt-4 flex flex-col space-y-6 overflow-y-auto'>
                <NoOrders />
            </div>
        );
    }

    return (
        <div ref={parent} className='mt-4 flex flex-col space-y-6 overflow-y-auto'>
            {loading
                ? new Array(5).fill(0).map((_, index) => <OrderCardSkeleton key={index} />)
                : orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
    );
}

function NoOrders() {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <p className='text-secondary'>No orders found</p>
        </div>
    );
}
