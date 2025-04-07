import type { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { APP_NAME } from '@/lib/constants/app.constants';
import { Toaster } from '@/shadcn/sonner';

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
    title: APP_NAME,
    description: 'A fresh and vibrant marketplace for drink lovers'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html suppressHydrationWarning lang='es'>
            <body className={`${poppins.variable} bg-background text-foreground antialiased`}>
                <div className='font-poppins md:outline-primary relative mx-auto max-h-screen min-h-screen max-w-md overflow-hidden overflow-y-auto bg-white md:outline'>
                    <ThemeProvider attribute='class'>{children}</ThemeProvider>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
