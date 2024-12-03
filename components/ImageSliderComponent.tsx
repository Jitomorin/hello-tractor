import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "components/Container";
import Separator from "components/Separator";
import { media } from "utils/media";
import RichText from "components/RichText";
import { type } from "os";
import NextLink from "next/link";
import { FacebookIcon, LinkedinIcon } from "react-share";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function ImageSliderComponent({ images }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add event listener to check screen width on mount and resize
    function handleResize() {
      setIsMobile(window.innerWidth >= 768); // Adjust the breakpoint as needed
    }

    handleResize(); // Call the function initially

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex justify-center">
      <Separator />
      <Wrapper>
        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          slidesPerView={1}
          autoplay
          centeredSlides
          navigation={isMobile}
          loop
        >
          {images.map((image: any, idx: any) => (
            <SwiperSlide key={idx}>
              <Card>
                <img src={image} alt={`image`} />
                {/* <Content>“{singleTestimonial.content}”</Content> */}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
      {/* <Separator /> */}
    </div>
  );
}

const Wrapper = styled(Container)`
  position: relative;
  margin-bottom: 3rem;
  margin-top: 9rem;
  width: 90vw;

  .swiper-button-prev,
  .swiper-button-next {
    color: rgb(255, 175, 1);
  }

  .swiper-button-prev {
    color: rgb(255, 255, 255);
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23currentColor'%2F%3E%3C%2Fsvg%3E");
  }

  .swiper-button-next {
    color: rgb(255, 255, 255);
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23currentColor'%2F%3E%3C%2Fsvg%3E");
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
  }

  & > *:not(:first-child) {
    margin-top: 5rem;
  }
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 3rem;
  letter-spacing: -0.03em;

  ${media("<=tablet")} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
  ${media("<tablet")} {
    font-size: 3rem;
  }
`;
const TitleContent = styled.div`
  margin-top: 1rem;
  margin-bottom: 10rem;
  margin: 0 25rem;
  text-align: center;
  ${media("<=tablet")} {
    max-width: 100%;
    margin: 5rem 0;
  }
`;
const Content = styled.blockquote`
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  font-style: italic;
  max-width: 60%;

  ${media("<=desktop")} {
    max-width: 100%;
  }
`;

const SliderSeperator = styled(Separator)`
  margin-bottom: 3rem;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.8rem;
`;

const AuthorTitle = styled.p`
  font-weight: bold;
  font-size: 2rem;
  ${media("<tablet")} {
    font-size: 1rem;
  }
`;
const AuthorSocials = styled.div`
  display: flex;
  margin: 1rem 0;
  overflow: hidden;
`;

const AuthorName = styled.p`
  font-weight: normal;
  font-size: 3rem;
  ${media("<tablet")} {
    font-size: 2rem;
  }
`;

const AuthorImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  margin-right: 4rem;
  overflow: hidden;
  height: 15rem;
  width: 15rem;
  ${media("<tablet")} {
    height: 9rem;
    width: 9rem;
    margin-right: 2rem;
  }
`;
const SocialmediaLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
  padding: 0, 0.5rem;
  :hover {
    color: rgb(255, 175, 1);
  }

  &:not(:last-child) {
    /* margin-left: 1rem; */
  }

  &:hover {
    transform: scale(1.07);
  }
`;
