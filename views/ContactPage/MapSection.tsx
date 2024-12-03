import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "components/Button";
import Input from "components/Input";
import { media } from "utils/media";
import MailSentState from "../../components/MailSentState";
import Map from "components/Map";
import { useTheme } from "next-themes";

export default function MapSection() {
  const { theme }: any = useTheme();
  return (
    <Wrapper theme={theme}>
      <h3>Come see us!</h3>
      <Map />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ theme: any }>`
  flex: 2;
  margin: 0 10rem;

  h3 {
    font-size: 3.5rem;
    /* font-weight: bold; */
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    margin-top: 3rem;
    margin-bottom: 3rem;
    font-family: "Inter", sans-serif;
  }
  ${media("<=largeDesktop")} {
    max-width: 90%;
  }
  ${media("<tablet")} {
    margin: 0 2rem;
  }
`;
