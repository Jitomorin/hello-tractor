import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "components/Container";
import Separator from "components/Separator";
import { media } from "utils/media";
import RichText from "components/RichText";
import ArticleCard from "@/components/ArticleCard";
import { dataset, projectId } from "@/sanity/env";
import { processImageString } from "@/utils/formatString";
import { Post } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

interface BlogPostProps {
  posts: Post[];
}

export default function BlogPostSlider({ posts }: BlogPostProps) {
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
    <Wrapper>
      <TitleContent>
        <Title>HR News</Title>
      </TitleContent>
      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        slidesPerView={isMobile ? 3 : 1}
        navigation={isMobile}
        loop
        style={{ padding: "2rem" }}
      >
        {posts.map((singlePost, idx) => (
          <SwiperSlide
            style={{ display: "flex", justifyContent: "center" }}
            key={idx}
          >
            <ArticleCard
              title={singlePost.title!}
              description={singlePost.date!}
              imageUrl={urlForImage(singlePost.coverImage)
                .height(1000)
                .width(2000)
                .url()}
              slug={singlePost.slug!}
              categories={singlePost.categories!}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

const Wrapper = styled(Container)`
  position: relative;
  width: 100%;
  ${media("<largeDesktop")} {
    max-width: 90%;
  }

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

const OurteamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
`;
const TitleContent = styled.div`
  margin-top: 1rem;
  margin-bottom: 10rem;
  text-align: center;
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

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.4rem;
`;

const AuthorTitle = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
`;

const AuthorName = styled.p`
  font-weight: normal;
  font-size: 2.6rem;
`;

const AuthorImageContainer = styled.div`
  display: flex;
  border-radius: 10rem;
  margin-right: 4rem;
  overflow: hidden;
`;
