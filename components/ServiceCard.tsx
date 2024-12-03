import NextImage from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { generateSlug } from "@/utils/formatString";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface ServiceCardProps {
  title: string;
  imageUrl: string;
  slug: string;
}

export default function ServiceCard(props: ServiceCardProps) {
  const { title, imageUrl, slug } = props;
  return (
    <Link
      style={{ display: "flex", justifyContent: "center" }}
      href={`/services/${slug}`}
      className="w-full h-full"
    >
      <Card
        backgroundURL={urlForImage(imageUrl).height(1000).width(2000).url()}
      >
        <Container>
          <Title>{title}</Title>
        </Container>
        {/* <Image
          className="h-full w-full"
          width={100}
          height={100}
          alt={`Cover Image for ${title}`}
          src={urlForImage(imageUrl).height(100).width(100).url()}
          sizes="100vw"
          priority={true}
        /> */}
      </Card>
    </Link>
  );
}
const Title = styled.div`
  font-weight: bold;
  font-size: 2.2rem;
  align-self: flex-end;

  /* &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: rgb(255,175,1);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  } */

  /* &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  } */
`;

const Card = styled.div<{ backgroundURL: string }>`
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 3s ease-out;
  background-image: url(${(props) => props.backgroundURL});
  background-size: cover;
  background-position: center;
  /* box-shadow: var(--shadow-md); */
  flex-direction: column;
  text-align: left;

  border-radius: 0.6rem;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  /* increase scale on hover */
  &:hover {
    scale: 1.03;
    ${Title} {
      &::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const Container = styled.div`
  background: rgb(21, 35, 62, 0.8);
  height: 100%;
  width: 100%;
  align-items: flex-end;
  display: flex;
  padding: 2.5rem;
  border-radius: 0.6rem;

  transition: background 2s ease; /* Add a transition for the background property */
  &:hover {
    background: rgb(21, 35, 62, 0);
  }
`;
