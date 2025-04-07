interface UserSvgProps {
    className?: string;
}

export default function UserSvg({ className = 'size-8' }: UserSvgProps) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' className={className} fill='currentColor' viewBox='0 0 32 32'>
            <path
                stroke='currentColor'
                strokeWidth='2'
                d='M30 25.938c0 1.405-.366 2.326-.93 2.97-.581.662-1.47 1.146-2.72 1.478-2.344.622-5.55.618-9.322.613h-2.056c-3.772.005-6.978.009-9.322-.613-1.25-.332-2.139-.816-2.72-1.478-.564-.644-.93-1.565-.93-2.97 0-2.791 1.465-5.247 3.975-7.04C8.494 17.098 12.032 16 16 16s7.506 1.098 10.025 2.898C28.535 20.69 30 23.146 30 25.938Z'></path>
            <circle cx='16' cy='7' r='6' stroke='currentColor' strokeWidth='2'></circle>
        </svg>
    );
}
