// Tooltip.tsx
import React, { ReactNode } from "react";
import styled from "styled-components";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  visibility: hidden;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;

  ${TooltipWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <TooltipWrapper>
      {children}
      <TooltipContent>{text}</TooltipContent>
    </TooltipWrapper>
  );
};

export default Tooltip;
