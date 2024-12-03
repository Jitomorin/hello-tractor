import React from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

const Loader = () => {
  const { theme }: any = useTheme();
  return (
    <Wrapper theme={theme}>
      <div className="centered">
        <div className="loader"></div>
      </div>
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div<{ theme: any }>`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */

  /* HTML: <div class="loader"></div> */
  .loader {
    width: 60px;
    aspect-ratio: 4;
    --c: #1c4d9c 90%, #0000;
    background: radial-gradient(
        circle closest-side at left 6px top 50%,
        var(--c)
      ),
      radial-gradient(circle closest-side, var(--c)),
      radial-gradient(circle closest-side at right 6px top 50%, var(--c));
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: l4 1s infinite alternate;
  }
  @keyframes l4 {
    to {
      width: 25px;
      aspect-ratio: 1;
    }
  }
`;
