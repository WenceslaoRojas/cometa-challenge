import DummyMiddlewareProvider from '@/lib/providers/dummy-middleware-provider';

interface PrivateLayoutProps {
    className?: string;
    children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
    return <DummyMiddlewareProvider>{children}</DummyMiddlewareProvider>;
}
