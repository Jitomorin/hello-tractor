import React, { ReactNode } from "react";
import TextButton from "./TextButton";
import CountingAnimation from "./CountingAnimation";

interface WalletStatsProps {
  title: string;
  total: number;
}

const WalletStats: React.FC<WalletStatsProps> = ({ title, total }) => {
  return (
    <div className="shadow-md flex flex-col rounded-md bg-white px-6 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11 w-11 items-start justify-start rounded-full bg-meta-2 dark:bg-meta-4">
        <TextButton>Add</TextButton>
      </div>
      <div className="mt-auto flex items-end justify-between">
        <div>
          <h4 className="text-3xl font-bold text-black dark:text-white">
            <CountingAnimation targetNumber={total} isCurrency={true} />
          </h4>
          <span className="text-xl font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default WalletStats;
