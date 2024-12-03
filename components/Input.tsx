import styled from "styled-components";

const Input = styled.input`
  border: 1px solid rgb(255, 255, 255);
  background: rgb(255, 255, 255);
  border-radius: 0.6rem;
  font-size: 1.6rem;
  padding: 1.8rem;
  box-shadow: var(--shadow-md);
  /* color: rgb(255,255,255); */

  &:focus {
    outline: none;
    box-shadow: var(--shadow-lg);
  }
`;

export default Input;
