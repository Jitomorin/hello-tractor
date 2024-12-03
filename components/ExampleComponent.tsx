import React, { useState } from "react";
// import { SearchIcon, LocationMarkerIcon } from "@heroicons/react/outline";

const ExampleComponent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py-12">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 bg-blue-100 w-1/2 rounded flex justify-between items-center cursor-pointer"
      >
        <div className="flex items-center gap-2">
          search{" "}
          <h4 className="font-medium text-sm text-blue-500">
            Add bitcoin to your wallet
          </h4>
        </div>
        location
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-10 bg-black opacity-25"
        ></div>
      )}
      <div
        className={`absolute w-1/2 bg-white p-4 ${
          open
            ? "transition ease-out duration-300 opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        x-show={open}
        onClick={() => setOpen(false)}
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 translate-y-0"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 translate-y-0"
      >
        <h4 className="text-sm text-slate-400">
          Now you can earn bitcoin in your wallet just by referring coinx to one
          of your friend.
        </h4>
        <button className="bg-blue-500 p-2 text-sm text-white font-bold rounded mt-4">
          Refer now
        </button>
      </div>
    </div>
  );
};

export default ExampleComponent;
