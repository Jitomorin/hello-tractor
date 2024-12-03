import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import ArticleCard from "components/ArticleCard";
import Container from "components/Container";
import OverTitle from "components/OverTitle";
import SectionTitle from "components/SectionTitle";
import { useResizeObserver } from "hooks/useResizeObserver";
import { Post, SingleArticle } from "types";
import { media } from "utils/media";
import { projectId, dataset } from "@/sanity/env";
import { processImageString } from "@/utils/formatString";
import { A11y, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

interface ScrollableBlogPostsProps {
  posts: Post[];
}

export default function ScrollableBlogPosts({
  posts,
}: ScrollableBlogPostsProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

  // const oneItemWidth = 350;
  // const noOfItems = width / oneItemWidth;

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <Section>
      <Container>
        <Content>
          {/* <OverTitle>blogs</OverTitle> */}
          <SectionTitle>HR News</SectionTitle>
        </Content>
      </Container>

      <SwiperContainer>
        {true && (
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            centeredSlides
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop
          >
            {posts.map((singlePost, idx) => (
              <SwiperSlide key={idx}>
                <ArticleCard
                  title={singlePost.title}
                  description={singlePost.title}
                  imageUrl={
                    "https://cdn.sanity.io/images/" +
                    projectId +
                    "/" +
                    dataset +
                    "/" +
                    processImageString(singlePost.mainImage?.asset?._ref)
                  }
                  slug={singlePost.slug.current}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          // <Swiper
          //   modules={[Pagination, Navigation, A11y]}
          //   spaceBetween={10}
          //   loop
          //   slidesPerView={3}
          //   autoplay={{ delay: 2000 }}
          //   navigation
          // >
          //   {posts.map((singlePost, idx) => (
          //     <SwiperSlide
          //       style={{ display: "flex", justifyContent: "center" }}
          //       key={singlePost.title}
          //     >
          //       <ArticleCard
          //         title={singlePost.title}
          //         description={singlePost.title}
          //         imageUrl={
          //           "https://cdn.sanity.io/images/" +
          //           projectId +
          //           "/" +
          //           dataset +
          //           "/" +
          //           processImageString(singlePost.mainImage?.asset?._ref)
          //         }
          //         slug={singlePost.slug.current}
          //       />
          //     </SwiperSlide>
          //   ))}
          // </Swiper>
        )}
      </SwiperContainer>
    </Section>
  );
}

const Content = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:last-child {
    margin-top: 1rem;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const SwiperContainer = styled(Container)`
  position: relative;

  .swiper-button-prev,
  .swiper-button-next {
    color: rgb(255, 175, 1);

    ${media("<=desktop")} {
      display: none;
    }
  }

  & > *:first-child {
    margin-top: 4rem;
  }

  ${media("<=largeDesktop")} {
    max-width: 100%;
    padding: 0;
  }
`;
