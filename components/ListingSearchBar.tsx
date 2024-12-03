import { SearchIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  setSearchValue: any;
  onEnter: any;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchValue,
  onEnter,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (isOpen) {
      // Run onEnter if the field is open
      console.log("1");
      onEnter();
    } else {
      // Open the input field
      setIsOpen(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Close the input field when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center" ref={containerRef}>
      <div
        className={`flex items-center rounded-none transition-all duration-300 ${
          isOpen ? "w-full max-w-[50vw] px-4" : "w-10"
        }`}
      >
        {isOpen && (
          <input
            value={value}
            type="text"
            placeholder="Search for name, make, location or number plate..."
            onChange={(e) => {
              setSearchValue(e.target.value.toLowerCase());
            }}
            className="p-2 border-2 focus:border-gray-300 border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-transparent bg-[#F8F8F8]"
          />
        )}
        <button
          onClick={handleToggle}
          className="hover:scale-[1.03] flex-shrink-0 p-2 text-gray-600 hover:text-gray-800"
        >
          <SearchIcon className="size-8" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
