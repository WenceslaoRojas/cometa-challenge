interface HomeSvgProps {
    className?: string;
}

export default function HomeSvg({ className = 'size-8' }: HomeSvgProps) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' className={className} viewBox='0 0 32 32'>
            <path
                fill='currentColor'
                fillRule='evenodd'
                d='M3.223 12.32A4 4 0 0 0 2 15.2V28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V15.2a4 4 0 0 0-1.224-2.88L16 0zm14.689 7.794h3.834v-1.386h-3.834v-3.906h-1.53v3.906h-3.816v1.386h3.816v3.888h1.53z'
                clipRule='evenodd'></path>
        </svg>
    );
}
