import { Stock } from '@/lib/types/beer.types';
import { databaseService } from '@/services/firebase';

const STOCK_ID = process.env.NEXT_PUBLIC_STOCK_ID;

export function createStock(stock: Stock): Promise<Stock> {
    return databaseService.addData<Stock>('stocks', stock);
}

export function getStock(): Promise<Stock | null> {
    if (!STOCK_ID) {
        throw new Error('Stock ID is required for fetching stocks');
    }

    return databaseService.getDataById<Stock>('stocks', STOCK_ID);
}

export function updateStock(stock: Partial<Stock>): Promise<void> {
    if (!STOCK_ID) {
        throw new Error('Stock ID is required for updating stock');
    }

    return databaseService.setData('stocks', STOCK_ID, stock);
}
