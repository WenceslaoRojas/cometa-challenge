'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';
import { User } from '@/lib/types/auth.types';
import { cn } from '@/lib/utils';
import { authService } from '@/services/firebase';
import { Button } from '@/shadcn/button';
import { authStore } from '@/stores/auth.store';

interface LogOutButtonProps {
    className?: string;
}

export default function LogOutButton({ className }: LogOutButtonProps) {
    const user = authStore((state: any) => state.user as User | null);
    const setUser = authStore((state: any) => state.setUser as (user: User | null) => void);
    const router = useRouter();

    if (!user) {
        return <></>;
    }

    const handleSignOut = async () => {
        await authService.signOut();
        setUser(null);
        router.push(ROUTES.AUTH.SIGN_IN);
    };

    return (
        <Button
            size='lg'
            className={cn('mt-8 rounded-full px-8 py-2 text-sm font-medium', className)}
            onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}
