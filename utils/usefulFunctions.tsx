export const wait = (seconds: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

export const calculateAverageRating = (
  reviews: Array<{ rating: number }>
): number => {
  if (!reviews.length) return 0; // If no reviews, default rating to 0

  // Sum all review ratings and divide by the total number of reviews
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((totalRating / reviews.length).toFixed(1)); // Round to 1 decimal place
};

export const URLify = (file: any) => {
  return URL.createObjectURL(file);
};
