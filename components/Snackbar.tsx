// components/Snackbar.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SnackbarContainer = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  z-index: 9999;
`;

const CloseButton = styled.button`
  margin-left: 16px;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Snackbar = ({ message, isVisible, onClose }: any) => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(isVisible);

  useEffect(() => {
    setIsSnackbarVisible(isVisible);

    if (isVisible) {
      // Automatically close the Snackbar after 3000 milliseconds (adjust as needed)
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      // Clear the timeout when the component unmounts or when the Snackbar is closed manually
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, onClose]);

  const handleClose = () => {
    setIsSnackbarVisible(false);
    onClose();
  };

  return (
    <SnackbarContainer isVisible={isSnackbarVisible}>
      {message}
      <CloseButton onClick={handleClose}>Close</CloseButton>
    </SnackbarContainer>
  );
};

export default Snackbar;
