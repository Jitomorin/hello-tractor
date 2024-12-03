import NextImage from "next/image";
import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "components/Container";
import { media } from "utils/media";
import { Partner } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

interface PartnersProps {
  partners: Partner[];
}

const PARTNER_LOGOS = [
  "logoipsum-logo-1.svg",
  "logoipsum-logo-2.svg",
  "logoipsum-logo-3.svg",
  "logoipsum-logo-4.svg",
  "logoipsum-logo-5.svg",
  "logoipsum-logo-6.svg",
  "logoipsum-logo-7.svg",
  "logoipsum-logo-1.svg",
  "logoipsum-logo-2.svg",
  "logoipsum-logo-3.svg",
  "logoipsum-logo-4.svg",
  "logoipsum-logo-5.svg",
  "logoipsum-logo-6.svg",
  "logoipsum-logo-7.svg",
];

export default function Partners({ partners }: PartnersProps) {
  console.log(partners);
  return (
    <PartnersWrapper>
      <Title>official partners</Title>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        loop={true}
        freeMode={true}
        autoplay={true}
        speed={7000}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1025: { slidesPerView: 6 },
        }}
        className="swiper-wrapper"
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.company}>
            <Link href={partner.website} target="_blank">
              <NextImage
                src={urlForImage(partner.logo?.asset?._ref).url()}
                alt={partner.company}
                width={200}
                height={200}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </PartnersWrapper>
  );
}

function normalizePartnerLogoName(logo: string) {
  return logo.replace(".svg", "");
}

const Title = styled.h3`
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  line-height: 0;
  text-transform: uppercase;
  margin-bottom: 5rem;
  text-align: center;
  opacity: 0.8;
  font-size: bold;

  ${media("<=desktop")} {
    line-height: 1.5;
  }
`;

const PartnersWrapper = styled(Container)`
  \ ${media("<=largeDesktop")} {
    max-width: 90%;
  }
  .swiper-wrapper {
    will-change: transform;
    transition-timing-function: linear;
    margin-top: 0.5rem;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-slide {
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;
