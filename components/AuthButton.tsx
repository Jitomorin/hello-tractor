import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  background-color: #1c4d9c;
  color: white;
  font-weight: 700;
  font-size: 20px;
  /* border-radius: 15px; */
  padding: 20px;
  width: 100%;
  transition: ease-in-out 0.3s;

  &:hover {
    scale: 1.02;
    transition: ease-in-out 0.3s;
  }
`;

const AuthButton = ({ children, onClick }: any) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default AuthButton;
