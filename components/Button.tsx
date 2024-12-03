import { PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonProps = PropsWithChildren<{ transparent?: boolean }>;

const Button = styled.button<ButtonProps>`
  border: none;
  background: none;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  background: ${(p) => (p.transparent ? "transparent" : "rgb(21,35,62)")};
  padding: 1.75rem 2.25rem;
  font-size: 1.2rem;
  color: ${(p) => (p.transparent ? "rgb(10,18,30)" : "rgb(255,255,255)")};
  text-transform: uppercase;
  font-family: var(--font);
  font-weight: bold;
  border-radius: 0.4rem;
  border: ${(p) => (p.transparent ? "none" : "2px solid rgb(21,35,62)")};
  transition: transform 0.3s;
  backface-visibility: hidden;
  will-change: transform;
  cursor: pointer;

  span {
    margin-left: 2rem;
  }

  &:hover {
    transform: scale(1.025);
    background: ${(p) => (p.transparent ? "transparent" : "rgb(255,175,1)")};
    border: ${(p) => (p.transparent ? "none" : "2px solid rgb(255,175,1)")};
  }
`;

export default Button;
