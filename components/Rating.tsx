// components/StarRating.tsx
import React from "react";

interface StarRatingProps {
  rating: number; // The rating value (e.g., 4.5)
  outOf?: number; // Maximum possible rating, defaults to 5
}

const Rating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-7 h-7 my-auto text-yellow-500"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>{" "}
      <span className="text-lg font-semibold text-gray-700 my-auto">
        {rating}
      </span>
    </div>
  );
};

export default Rating;
