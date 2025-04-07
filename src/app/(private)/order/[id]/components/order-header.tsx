import BackButton from '@/components/buttons/back-button';

export default function OrderHeader() {
    return (
        <header className='flex items-center justify-start space-x-6 py-4'>
            <BackButton />
            <div>
                <h1 className='text-2xl font-medium'>Payment</h1>
                <h2 className='text-secondary text-sm font-light tracking-wider'>You deserve better drinks</h2>
            </div>
        </header>
    );
}
