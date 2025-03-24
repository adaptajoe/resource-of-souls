import { memo } from "react";

interface IStarRatingProps {
  rating: number;
  maxRating?: number;
  label?: string;
}

const Star = memo(function Star({ filled, index, total }: { filled: boolean; index: number; total: number }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-white" : "text-gray-500"}`}
      aria-hidden="false"
      aria-label={`${index + 1} of ${total} stars`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
});

const StarRating = memo(function StarRating({ rating, maxRating = 5, label = "Rating" }: IStarRatingProps) {
  const validRating = Math.max(0, Math.min(rating, maxRating));

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center space-x-1" role="img" aria-label={`${validRating} out of ${maxRating} ${label}`}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star key={index} filled={index < validRating} index={index} total={maxRating} />
        ))}
      </div>
      <p className="text-xs text-gray-400">
        ({rating === 1 && `Very Challenging`}
        {rating === 2 && `Challenging`}
        {rating === 3 && `Fairly Challenging`}
        {rating === 4 && `Fairly Simple`}
        {rating === 5 && `Simple`})
      </p>
    </div>
  );
});

export default StarRating;
