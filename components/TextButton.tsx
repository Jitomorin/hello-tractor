import { PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonProps = PropsWithChildren<{ transparent?: boolean }>;

const TextButton = styled.button`
  border: none;
  background: none;
  color: rgb(255, 175, 1);
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;

  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }
`;

export default TextButton;
