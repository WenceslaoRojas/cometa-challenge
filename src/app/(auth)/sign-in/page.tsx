import GithubAuthButton from '@/components/buttons/github-auth-button';
import BartenderSVG from '@/components/svg/bartender-svg';

export default function SignUpPage() {
    return (
        <main className='bg-primary h-screen w-full p-6 py-8 text-white'>
            <div className='mb-26'>
                <h1 className='text-2xl font-medium'>Sign In</h1>
                <p className='text-secondary text-sm font-normal'>Find your best ever drink</p>
            </div>
            <div className='flex flex-col space-y-6'>
                <BartenderSVG className='mx-auto h-1/2 w-1/2' />
                <span className='flex items-center justify-center text-white'>Login Or Create account with </span>
                <div className='mx-auto flex w-8/12 items-center justify-center gap-4'>
                    <GithubAuthButton />
                </div>
            </div>
            <p className='text-secondary absolute bottom-10 left-0 w-full text-center text-sm font-light'>
                Cometa Challenge - {new Date().getFullYear()}
            </p>
        </main>
    );
}
