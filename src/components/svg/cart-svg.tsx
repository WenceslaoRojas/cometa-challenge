interface CartSvgProps {
    className?: string;
}

export default function CartSvg({ className = 'size-8' }: CartSvgProps) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' className={className} fill='none' viewBox='0 0 32 32'>
            <path
                stroke='currentColor'
                strokeWidth='2'
                d='M26.133 22.31c.409 4.118-2.827 7.69-6.966 7.69h-6.334c-4.14 0-7.375-3.572-6.966-7.69l.952-9.606A3 3 0 0 1 9.805 10h12.39a3 3 0 0 1 2.986 2.704z'></path>
            <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 17h8m-8 4h8'></path>
            <path
                fill='currentColor'
                fillRule='evenodd'
                d='M19.86 9.337C19.95 8.92 20 8.473 20 8c0-3.062-2.069-5-4-5s-4 1.938-4 5c0 .473.05.92.14 1.337a9.4 9.4 0 0 0-1.864.767A8 8 0 0 1 10 8c0-3.866 2.686-7 6-7s6 3.134 6 7c0 .733-.097 1.44-.276 2.104a9.4 9.4 0 0 0-1.864-.767'
                clipRule='evenodd'></path>
        </svg>
    );
}
