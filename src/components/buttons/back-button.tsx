'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/button';

import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
    className?: string;
}
export default function BackButton({ className }: BackButtonProps) {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <Button className={cn('size-7 !p-0', className)} onClick={handleBack} aria-label='Go back' title='Go back'>
            <ChevronLeft className='size-6' />
        </Button>
    );
}
