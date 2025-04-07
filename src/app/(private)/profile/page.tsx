'use client';

import LogOutButton from '@/components/buttons/log-out-button';
import BottomNav from '@/components/navigation/bottom-nav';
import { User } from '@/lib/types/auth.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/avatar';
import { authStore } from '@/stores/auth.store';

export default function PageProfile() {
    const user = authStore((state: any) => state.user as User | null);

    return (
        <main className='from-primary to-secondary flex h-screen w-full flex-col items-center py-12'>
            <div className='rounded-full border-2 border-dashed p-2'>
                <Avatar className='size-24 rounded-full'>
                    <AvatarImage src={user?.photoURL ?? ''} />
                    <AvatarFallback>Profile Image</AvatarFallback>
                </Avatar>
            </div>

            <p className='mt-4 text-lg font-medium'>{user?.displayName}</p>
            <p className='text-secondary text-sm font-light tracking-wider'>{user?.email}</p>

            <LogOutButton />
            <BottomNav />
        </main>
    );
}
