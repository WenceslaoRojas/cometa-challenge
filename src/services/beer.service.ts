import { Beer } from '@/lib/types/beer.types';
import { databaseService } from '@/services/firebase';

export function createBeer(beer: Beer): Promise<Beer> {
    return databaseService.addData<Beer>('beers', beer);
}

export function getBeers(): Promise<Beer[]> {
    return databaseService.getData<Beer>('beers');
}

export function getBeerById(beerId: string): Promise<Beer | null> {
    return databaseService.getDataById<Beer>('beers', beerId);
}

export function updateBeer(beerId: string, beer: Partial<Beer>): Promise<void> {
    return databaseService.setData('beers', beerId, beer);
}
