import StarSvg from '@/components/svg/star-svg';
import { cn } from '@/lib/utils';

interface RatingProps {
    className?: string;
    rating?: number;
}

function getStarRating(rating: number = 0) {
    const stars = [];
    const normalizedRating = Math.round(rating * 2) / 2;

    for (let i = 0; i < 5; i++) {
        let fillClass = 'fill-gray-300'; // Empty star

        if (i < Math.floor(normalizedRating)) {
            fillClass = 'fill-primary'; // Full star
        } else if (i === Math.floor(normalizedRating) && normalizedRating % 1 !== 0) {
            // Half star case
            stars.push(
                <div key={i} className='relative size-4'>
                    <StarSvg className='absolute size-4 fill-gray-300' />
                    <StarSvg
                        className='fill-primary absolute size-4'
                        style={{ clipPath: 'inset(0 50% 0 0)' }} // Show left half only
                    />
                </div>
            );
            continue;
        }

        stars.push(<StarSvg key={i} className={`size-4 ${fillClass}`} />);
    }

    return stars;
}

const formatRating = (rating: number) => {
    const formattedRating = rating % 1 === 0 ? `${rating}.0` : rating.toString();

    return formattedRating;
};

export default function Rating({ className = '', rating = 0 }: RatingProps) {
    const starElements = getStarRating(rating);

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div className='flex items-center gap-1'>{starElements}</div>
            <span className='text-secondary text-sm font-medium'>{formatRating(rating)}</span>
        </div>
    );
}
