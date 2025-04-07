import BeerClientContainer from '@/app/(private)/beer/[id]/components/beer-client-container';
import BackButton from '@/components/buttons/back-button';

interface BeerPageProps {
    params: Promise<{ id: string }>;
}

export default async function BeerPage(props: BeerPageProps) {
    const { id } = await props.params;

    return (
        <main className=''>
            <BackButton className='absolute top-6 left-4 z-20' />
            <BeerClientContainer beerId={id} />
        </main>
    );
}
