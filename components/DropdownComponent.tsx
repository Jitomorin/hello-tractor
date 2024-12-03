import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const DropdownComponent: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown w-64 mx-auto mt-10">
      <button
        className="dropdown-toggle bg-blue-500 text-white py-2 px-4 rounded-full w-full flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-content mt-2 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownComponent;
