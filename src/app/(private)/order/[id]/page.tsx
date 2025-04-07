import OrderClientContainer from '@/app/(private)/order/[id]/components/order-client-container';
import OrderHeader from '@/app/(private)/order/[id]/components/order-header';
import BottomNav from '@/components/navigation/bottom-nav';

interface OrderPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
    const { id } = await params;

    return (
        <main className='space-y-6 px-6 pt-6 pb-10'>
            <OrderHeader />
            <OrderClientContainer orderId={id} />
            <BottomNav />
        </main>
    );
}
