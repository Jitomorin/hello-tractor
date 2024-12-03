import React from "react";
import styled from "styled-components";
import { media } from "@/utils/media";
import { useTheme } from "next-themes";

const Wrapper = styled.div`
  padding: 1.5rem 0;
  filter: url("#goo");
  ${media("<=tablet")} {
    text-align: center;
    align-items: center;
  }
`;

const Button = styled.a`
  display: inline-block;
  text-align: center;
  background: black;
  color: #fff;
  font-weight: bold;
  padding: 2rem 4rem;
  line-height: 1;
  border-radius: 10px;
  position: relative;
  /* min-width: 8.23em; */
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  transition: color 1s ease;
  &:hover {
    color: #f8d521;
    transition: color 1s ease; /* Add a transition for the color change */
  }

  &:before,
  &:after {
    width: 4.4em;
    height: 2.95em;
    position: absolute;
    content: "";
    display: inline-block;
    background: black;
    border-radius: 50%;
    transition: transform 1s ease;
    transform: scale(0);
    z-index: -1;
  }

  &:before {
    top: -25%;
    left: 20%;
  }

  &:after {
    bottom: -25%;
    right: 20%;
  }

  &:hover:before,
  &:hover:after {
    transform: none;
  }
`;
const ButtonDark = styled.a`
  display: inline-block;
  text-align: center;
  background: #fff;
  color: #000;
  font-weight: bold;
  padding: 2rem 4rem;
  line-height: 1;
  border-radius: 10px;
  position: relative;
  /* min-width: 8.23em; */
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  transition: color 1s ease;
  &:hover {
    color: #f8d521;
    transition: color 1s ease; /* Add a transition for the color change */
  }

  &:before,
  &:after {
    width: 4.4em;
    height: 2.95em;
    position: absolute;
    content: "";
    display: inline-block;
    background: #fff;
    border-radius: 50%;
    transition: transform 1s ease;
    transform: scale(0);
    z-index: -1;
  }

  &:before {
    top: -25%;
    left: 20%;
  }

  &:after {
    bottom: -25%;
    right: 20%;
  }

  &:hover:before,
  &:hover:after {
    transform: none;
  }
`;

const GooFilter = styled.svg`
  visibility: hidden;
  position: absolute;
`;
const HeroButt = styled.a<{ theme: any }>`
  display: inline-block;
  text-align: center;
  background: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
  color: ${(props) => (props.theme === "light" ? "#fff" : "#000")};
  font-weight: bold;
  padding: 2rem 4rem;
  line-height: 1;
  border-radius: 10px;
  position: relative;
  /* min-width: 8.23em; */
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  transition: color 1s ease;
  &:hover {
    color: #f8d521;
    transition: color 1s ease; /* Add a transition for the color change */
  }

  &:before,
  &:after {
    width: 4.4em;
    height: 2.95em;
    position: absolute;
    content: "";
    display: inline-block;
    background: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
    border-radius: 50%;
    transition: transform 1s ease;
    transform: scale(0);
    z-index: -1;
  }

  &:before {
    top: -25%;
    left: 20%;
  }

  &:after {
    bottom: -25%;
    right: 20%;
  }

  &:hover:before,
  &:hover:after {
    transform: none;
  }
`;

const HeroButton = ({ name, link }: any) => {
  const { theme }: any = useTheme();
  return (
    <>
      <Wrapper>
        <HeroButt theme={theme} href={link}>
          {name}
        </HeroButt>
        {/* {
          theme === "dark" ? (
            <a className="hero_button_dark" href={link}>
              {name}
            </a>
          ) : (
            <a className="hero_button_light" href={link}>
              {name}
            </a>
          )
          // <Button href="#">Book Now</Button>
        } */}
      </Wrapper>
      <GooFilter
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </GooFilter>
    </>
  );
};

export default HeroButton;
