import { User } from '@/lib/types/auth.types';

export interface Stock {
    last_updated: string;
    beers: {
        beerId: Beer['id'];
        quantity: number;
    }[];
}

export interface Beer {
    created_at: string;
    updated_at: string;
    id: string;
    name: string;
    image: string;
    description: string;
    rating: number;
    price: number;
    alcoholContent: number;
    style: string;
    discount: number;
}

export interface Order {
    author: User['uid'];
    id: string;
    created_at: string;
    updated_at: string;
    paid: boolean;
    subtotal: number;
    taxes: number;
    discounts: number;
    items: Item[];
    rounds: Round[];
}

export interface NewOrder {
    author: User['uid'];
    paid: boolean;
    subtotal: number;
    taxes: number;
    discounts: number;
    items: [];
    rounds: [];
}

export interface Round {
    created_at: string;
    items: Item[];
}

export interface Item {
    beer: Beer;
    quantity: number;
}
