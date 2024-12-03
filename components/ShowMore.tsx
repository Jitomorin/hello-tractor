import { Button } from "@nextui-org/react";
import { useState } from "react";

type ShowMoreProps = {
  children: React.ReactNode;
  maxHeight?: number; // Maximum height before "Show More"
};

const ShowMore: React.FC<ShowMoreProps> = ({ children, maxHeight = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-[1000px]" : `max-h-[${maxHeight}px]`
        }`}
      >
        <div className="relative">{children}</div>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="light"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 rounded-lg text-lg text-primary transition-all duration-300 focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default ShowMore;
