'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CartSvg from '@/components/svg/cart-svg';
import HomeSvg from '@/components/svg/home-svg';
import UserSvg from '@/components/svg/user-svg';
import { ROUTES } from '@/lib/constants/routes.constants';
import { cn } from '@/lib/utils';

const NAV_ROUTES = [
    {
        path: ROUTES.PRIVATE.HOME,
        label: 'Home',
        icon: HomeSvg
    },
    {
        path: ROUTES.PRIVATE.ORDERS,
        label: 'Orders',
        icon: CartSvg
    },
    {
        path: ROUTES.PRIVATE.PROFILE,
        label: 'Profile',
        icon: UserSvg
    }
];

export default function BottomNav() {
    const path = usePathname();

    const matchPath = (route: string) => {
        const regex = new RegExp(`^${route}`);

        return regex.test(path);
    };

    return (
        <nav className='fixed bottom-0 left-1/2 z-50 flex h-[60px] w-full max-w-md -translate-x-1/2 items-center justify-between bg-white p-4 px-[10%] shadow-md md:w-md md:px-8'>
            {NAV_ROUTES.map((route) => (
                <Link key={route.path} href={route.path} title={route.label}>
                    <route.icon className={cn('size-8', matchPath(route.path) ? 'text-primary' : 'text-secondary')} />
                </Link>
            ))}
        </nav>
    );
}
