'use client';

import HeroList from '@/app/(private)/home/components/hero-list';
import HomeHeader from '@/app/(private)/home/components/home-header';
import HomeTabsContainer from '@/app/(private)/home/components/tabs-lists/home-tabs-container';
import BottomNav from '@/components/navigation/bottom-nav';

export default function Home() {
    return (
        <main className='relative flex flex-col space-y-6 overflow-y-auto py-4 pb-[60px]'>
            <HomeHeader />
            <HeroList />
            <HomeTabsContainer />
            <BottomNav />
        </main>
    );
}
