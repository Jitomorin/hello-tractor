import { Spinner } from "@nextui-org/react";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
export const HeartButton: React.FC<any> = ({
  loading,
  isAdded,
  onPress,
}: any) => {
  const [inWishlist, setInWishlist] = useState(isAdded);

  if (loading) {
    return (
      <button
        disabled
        className={`group relative p-2 rounded-full transition-all duration-300 ${
          isAdded ? "text-red-500" : "text-gray-700 hover:text-gray-500"
        }`}
        aria-label="Adding to Wishlist..."
      >
        <Spinner color="primary" />
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        const newBool = !isAdded;
        setInWishlist(newBool);
        onPress(newBool);
      }}
      className={`group relative p-2 rounded-full transition-all duration-300 ${
        isAdded ? "text-red-500" : "text-gray-400 hover:text-gray-500"
      }`}
      aria-label={isAdded ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <HeartIcon
        className={`w-10 h-10 text-gray-500 transition-all duration-300 ${
          isAdded
            ? "fill-red-500 animate-pulse"
            : "fill-none group-hover:fill-gray-400"
        }`}
      />
    </button>
  );
};

export default HeartButton;
