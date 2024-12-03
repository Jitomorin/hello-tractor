import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
// import Container from 'components/Container';
import OverTitle from "components/OverTitle";
// import SectionTitle from 'components/SectionTitle';
import { media } from "utils/media";

export default function Cta() {
  return (
    <CtaWrapper>
      <Container>
        <Stack>
          {/* <OverTitle>Lorem ipsum dolor sit amet</OverTitle> */}
          <SectionTitle>Let's Build Your Thriving Workplace Today</SectionTitle>
          <Description> Contact Us Today to Get Started!</Description>
          <ButtonGroup>
            <NextLink href="contact" passHref>
              <Link>
                Reach Out <span>&rarr;</span>
              </Link>
            </NextLink>
          </ButtonGroup>
        </Stack>
      </Container>
    </CtaWrapper>
  );
}

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 1);
`;

const SectionTitle = styled.div`
  font-size: 5.2rem;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: rgb(255, 255, 255);

  ${media("<=desktop")} {
    font-size: 3.6rem;
  }
  ${media("<tablet")} {
    font-size: 3rem;
  }
`;

const Container = styled.div`
  background: rgb(21, 35, 62, 0.8);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Link = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  background: transparent;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
  border: 3px solid rgb(255, 255, 255);
  transition: all 0.35s;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    width: 200px;
    letter-spacing: 2px;
    border: 3px solid rgb(255, 175, 1);
    background: rgb(255, 175, 1);
    color: rgb(255, 255, 255);
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12.5rem 0;
  color: rgb(255, 255, 255);
  text-align: center;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    max-width: 80%;
    margin-top: 4rem;
  }

  ${media("<=tablet")} {
    text-align: center;

    & > *:not(:first-child) {
      max-width: 100%;
      margin-top: 2rem;
    }
  }
`;

// const OutlinedButton = styled(Button)`
//   border: 1px solid rgb(255,255,255);
//   color: rgb(255,255,255);
// `;

const CtaWrapper = styled.div`
  background: url("/pexels-pixabay-416405.webp") no-repeat center center;
  height: 50vh;
  min-height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* to change later */
  ${media("<=tablet")} {
    height: 60vh;
  }
`;
