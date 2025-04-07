interface StarSvgProps {
    className?: string;
    style?: React.CSSProperties;
}
export default function StarSvg({ className = 'size-6', style }: StarSvgProps) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='15'
            fill='none'
            style={style}
            viewBox='0 0 16 15'
            className={className}>
            <path d='m8 0 1.796 5.528h5.813l-4.703 3.416 1.796 5.528L8 11.056l-4.702 3.416 1.796-5.528L.392 5.528h5.812z' />
        </svg>
    );
}
