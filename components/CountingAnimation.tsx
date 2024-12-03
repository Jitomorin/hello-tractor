import { formatNumber } from "@/utils/formatNumber";
import React, { useState, useEffect } from "react";

const CountingAnimation = ({ targetNumber, isCurrency }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < targetNumber) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 0.2);
      return () => clearTimeout(timer);
    }
  }, [count, targetNumber]);

  if (isCurrency) {
    return <div>{`Ksh ${formatNumber(count)}`}</div>;
  }
  return <div>{formatNumber(count)}</div>;
};

export default CountingAnimation;
