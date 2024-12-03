import styled from "styled-components";

// underline on hover animation
export const HoverUnderlineAnimation = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: rgb(255, 175, 1);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
