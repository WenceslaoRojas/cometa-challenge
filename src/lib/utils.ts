import { Item } from '@/lib/types/beer.types';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Calculates the price details for a given item.
 *
 * @param item - The item for which to calculate the price.
 * @returns An object containing price details:
 *   - subtotal: The price before discount (price * quantity)
 *   - discount: The discount percentage of the beer (if any)
 *   - discountAmount: The monetary value of the discount
 *   - total: The final price after discount
 */
export function getItemPrice(item: Item) {
    const subtotal = item.beer.price * item.quantity;
    const discountPercentage = item.beer.discount ? item.beer.discount / 100 : 0;
    const discountAmount = subtotal * discountPercentage;
    const total = subtotal - discountAmount;

    return {
        subtotal,
        discount: item.beer.discount,
        discountAmount,
        total
    };
}

/**
 * Formats a numerical value as a currency string in USD format.
 *
 * @param value - The numerical value to format as currency
 * @returns A string representing the value formatted as USD currency (e.g., "$1,234.56")
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56); // Returns "$1,234.56"
 * formatCurrency(1000); // Returns "$1,000.00"
 * ```
 */
export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}
