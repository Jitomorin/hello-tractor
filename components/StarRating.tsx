// components/StarRating.js
import { useState } from "react";

const StarRating = ({ totalStars = 5, rating, handleRating }: any) => {
  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleRating(index + 1)}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick }: any) => {
  return (
    <svg
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer ${
        filled ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default StarRating;
