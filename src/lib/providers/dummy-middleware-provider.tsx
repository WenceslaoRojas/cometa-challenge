'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import BartenderSVG from '@/components/svg/bartender-svg';
import { APP_NAME } from '@/lib/constants/app.constants';
import { ROUTES } from '@/lib/constants/routes.constants';
import { User } from '@/lib/types/auth.types';
import { AuthStoreState, authStore } from '@/stores/auth.store';

interface DummyMiddlewareProviderProps {
    children: React.ReactNode;
}

export default function DummyMiddlewareProvider({ children }: DummyMiddlewareProviderProps) {
    const router = useRouter();
    const triesRef = useRef(0);
    const maxTries = 3;
    const interval = 100;
    const [verifyingUser, setVerifyingUser] = useState(true);

    useEffect(() => {
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        const verifyUser = async () => {
            while (triesRef.current < maxTries) {
                await sleep(interval);
                triesRef.current += 1;
                const authState = authStore.getState() as AuthStoreState;
                const currentUser = authState.user as User;
                if (currentUser !== null) {
                    return;
                }
            }

            router.push(ROUTES.AUTH.SIGN_IN);
        };

        triesRef.current = 0;
        verifyUser()
            .then(() => {
                setVerifyingUser(false);

                return true;
            })
            .catch((error) => {
                console.error('Error verifying user:', error);
            });
    }, [router, maxTries, interval]);

    if (verifyingUser) {
        return (
            <div className='mx-auto flex h-screen max-h-screen min-h-screen w-screen max-w-md flex-col items-center justify-center text-black'>
                <h1 className='mb-4 text-3xl font-bold'>{APP_NAME}</h1>
                <BartenderSVG className='h-2/3 w-2/3' />
                <p className='text-center'>Let me get you a drink while we review your session.</p>
            </div>
        );
    }

    return <>{children}</>;
}
