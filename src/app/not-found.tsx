import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes.constants';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/shadcn/button';

export default function NotFound() {
    return (
        <main className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6'>
            <div className='max-w-md text-center'>
                <h1 className='mb-6 text-4xl font-bold tracking-tight text-gray-800'>Oops! Page Not Found</h1>

                <p className='mb-8 text-lg text-gray-600'>
                    Don’t worry, this is just a code challenge. The full app isn’t here yet!
                </p>

                <Link href={ROUTES.PRIVATE.HOME} className={cn(buttonVariants({ variant: 'default' }), 'w-full')}>
                    Go Back Home
                </Link>
            </div>
        </main>
    );
}
