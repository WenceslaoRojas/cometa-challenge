import { User } from '@/lib/types/auth.types';
import { NewOrder, Order } from '@/lib/types/beer.types';
import { databaseService } from '@/services/firebase';

export function createOrder(order: NewOrder): Promise<Order> {
    return databaseService.addData<Order>('orders', order);
}

export function getOrders({ userId }: { userId: User['uid'] }): Promise<Order[]> {
    return databaseService.getDataByFilter<Order>('orders', 'author', '==', userId);
}

export function getOrderById(orderId: string): Promise<Order | null> {
    return databaseService.getDataById<Order>('orders', orderId);
}

export function updateOrder(orderId: string, order: Partial<Order>): Promise<void> {
    return databaseService.setData('orders', orderId, order);
}
