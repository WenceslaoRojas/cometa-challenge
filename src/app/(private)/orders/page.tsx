import { OrdersTabsContainer } from '@/app/(private)/orders/components/tabs-lists/orders-tabs-container';
import BottomNav from '@/components/navigation/bottom-nav';

export default function OrdersPage() {
    return (
        <main className='flex flex-col py-10'>
            <div className='mb-16 w-full px-8'>
                <h1 className='text-2xl text-black'>Your Orders</h1>
                <p className='text-secondary text-sm font-light'>Wait for the best drinks.</p>
            </div>
            <OrdersTabsContainer />
            <BottomNav />
        </main>
    );
}
