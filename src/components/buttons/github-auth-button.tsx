'use client';

import { useRouter } from 'next/navigation';

import GithubSvg from '@/components/svg/github-svg';
import { ROUTES } from '@/lib/constants/routes.constants';
import { User } from '@/lib/types/auth.types';
import { cn } from '@/lib/utils';
import { AuthResult, authService } from '@/services/firebase';
import { Button } from '@/shadcn/button';
import { authStore } from '@/stores/auth.store';

interface GithubAuthButtonProps {
    className?: string;
}

export default function GithubAuthButton({ className }: GithubAuthButtonProps) {
    const setUser = authStore((state: any) => state.setUser);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const { user }: AuthResult = await authService.signInWithGithub();
            const userData: User = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };

            setUser(userData);
            router.push(ROUTES.PRIVATE.HOME);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Button
            className={cn('cursor-pointer rounded-full bg-white', className)}
            type='button'
            onClick={handleLogin}
            size='lg'
            title='Login with Github'
            aria-label='Login with Github'>
            <GithubSvg className='size-7' />
            <span className='text-xs font-light text-black'>Github</span>
        </Button>
    );
}
