import BgShape from "/images/hero/hero-bg.png";
import HeroCar from "/images/hero/main-car.png";
import { useEffect, useState } from "react";
import CTAButton from "./HeroButton";
import HeroButton from "./HeroButton";
import StickySocialMediaBar from "./StickySocialMediaBar";
import Loading from "./Loading";
import NextImage from "next/image";
import styled from "styled-components";
import Container from "./Container";
import { media } from "@/utils/media";
import { useTheme } from "next-themes";

const Wrapper = styled.section<{ theme: any }>`
  width: 100%;
  height: 97vh;
  background-color: ${(props) =>
    props.theme === "light" ? "#f8f8f8" : "#17191a"};
  position: relative;
`;
const HeroContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  ${media("<=tablet")} {
    justify-content: center;
  }
`;
const HeroText = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  z-index: 3;
  max-width: 50rem;
  margin-top: 5rem;
  h2 {
    font-size: 2rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    ${media("<=tablet")} {
      text-align: center;
      align-items: center;
      align-self: center;
    }
  }
  h4 {
    font-size: 2.2rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  h1 {
    font-size: 5.2rem;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    line-height: 1.2;
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;

    ${media("<=tablet")} {
      text-align: center;
      align-items: center;
      font-size: 3.2rem;
      align-self: center;
    }
  }
  h1 div {
    border-bottom: 5px solid #f8d521;
    margin-right: 4px;
  }
  h1 span {
    color: rgb(20, 14, 13);
  }
  p {
    font-size: 1.5rem;
    font-family: "Inter", sans-serif;
    line-height: 1.6;
    color: #706f7b;
    margin-bottom: 4rem;
    ${media("<=tablet")} {
      text-align: center;
      align-items: center;
      align-self: center;
    }
  }
`;
const HeroImage = styled.img`
  z-index: 2;
  position: absolute;
  right: 0;
  width: 60%;
  margin-top: 5rem;
  ${media("<=tablet")} {
    display: none;
  }
`;
const Shape = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  z-index: 0;
  @media (max-width: 800px) {
    display: none;
  }
`;

function Hero() {
  // const [goUp, setGoUp] = useState(false);
  const { theme }: any = useTheme();

  return (
    <>
      <Wrapper theme={theme}>
        <Container>
          {theme === "light" ? (
            <Shape
              className="opacity-[0.8]"
              src={"/images/hero/tiny.png"}
              alt="bg-shape"
            />
          ) : (
            <Shape
              className="opacity-[0.8]"
              src={"/images/hero/tiny.png"}
              alt="bg-shape"
            />
          )}
          <HeroContent>
            <HeroText theme={theme}>
              {/* <h4>Explore</h4> */}
              <h1>
                <div>Pata Ride</div> Yako
              </h1>
              <h2>the largest car-sharing marketplace in Africa</h2>
              <p>
                Experience the ride of a lifetime with the car you've always
                dreamed of. Enjoy unparalleled affordability, limitless mileage,
                and the freedom to pick up your dream car at your convenience.
                Elevate your journey with unbeatable prices and a range of
                flexible options that go beyond the ordinary.
              </p>
              {/* <div className="hero-content__text__btns">
                <Link
                  onClick={bookBtn}
                  className="hero-content__text__btns__book-ride"
                  to="/rent-now"
                >
                  Browse Cars &nbsp;
                </Link>

                
              </div> */}
              <HeroButton name={"Browse cars"} link="/rentals" />
            </HeroText>

            {/* NextImage */}
            <HeroImage src={"/images/hero/main-car.png"} alt="car-img" />
          </HeroContent>
          {/* <Loading/> */}
        </Container>
      </Wrapper>
    </>
  );
}

export default Hero;
