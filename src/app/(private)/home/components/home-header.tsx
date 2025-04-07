'use client';

import { User } from '@/lib/types/auth.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/avatar';
import { authStore } from '@/stores/auth.store';

export default function HomeHeader() {
    const user = authStore((state: any) => state.user as User | null);

    return (
        <header className='flex items-center justify-between p-4'>
            <div>
                <h1 className='text-2xl font-medium'>BeerMarket</h1>
                <h2 className='text-secondary text-sm font-light tracking-wider'>Let’s get some drinks</h2>
            </div>
            <Avatar className='size-[50px] rounded-md'>
                <AvatarImage src={user?.photoURL ?? ''} />
                <AvatarFallback>Profile Image</AvatarFallback>
            </Avatar>
        </header>
    );
}
