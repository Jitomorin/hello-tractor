import NextImage from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { generateSlug } from "@/utils/formatString";
import { media } from "@/utils/media";
import { useTheme } from "next-themes";

interface BasicCardProps {
  title: string;
  description: string;
  imageUrl: string;
  useImage: boolean;
  FaIcon?: any;
  istransparent?: boolean;
}

export default function BasicCard({
  title,
  description,
  imageUrl,
  useImage,
  FaIcon,
  istransparent,
}: BasicCardProps) {
  const { theme }: any = useTheme();
  return (
    <Card theme={theme} isTransparent={istransparent!}>
      {useImage ? (
        <NextImage src={imageUrl} alt="header image" width={100} height={100} />
      ) : (
        <FontAwesomeIcon
          // color={theme !== "light" ? "#fff" : ""}
          style={theme !== "light" ? { color: "#fff" } : {}}
          icon={FaIcon}
          width={70}
          height={70}
        />
      )}
      <Title theme={theme}>{title}</Title>
      <Description theme={theme}>{description}</Description>
    </Card>
  );
}
const Title = styled.div<{ theme: string }>`
  font-family: "Inter", sans-serif;
  /* font-weight: bold; */
  display: inline-block;
  position: relative;
  font-size: 2.2rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-bottom: 5rem;
  ${(props) => (props.theme === "light" ? "color: black;" : "color: white;")}

  &::after {
    content: "";
    position: absolute;
    top: 95%;
    width: 150%;
    aspect-ratio: 3 / 1;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 50%;
    border: 6px solid #f8d521;
    /* Use a conic gradient mask to hide and show the bits you want */
    --spread: 140deg;
    --start: 290deg;
    mask: conic-gradient(
      from var(--start),
      white 0 var(--spread),
      transparent var(--spread)
    );
  }
  ${media("<tablet")} {
    margin-left: 0rem;
    margin-right: 0rem;
  }
  /* &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  } */
`;

const Card = styled.div<{ isTransparent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  border: ${(props) =>
    props.theme === "light" ? "1px solid #d5d5d5" : "none"};
  ${(props) =>
    props.isTransparent
      ? "background: transparent;"
      : "background: rgb(255,255,255);"}
  ${(props) =>
    props.theme !== "light"
      ? "background: #0b0b0b;"
      : "background: rgb(255,255,255);"}
  /* box-shadow: var(--shadow-md); */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  border-radius: 0.6rem;
  color: rgb(255, 255, 255);
  font-size: 1.6rem;
  padding: 3 2rem;
  ${media("<tablet")} {
    padding: 3 0rem;
    font-size: 1.2rem;
  }

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const Description = styled.div`
  font-family: "Inter", sans-serif;
  ${(props) => (props.theme === "light" ? "color: black;" : "color: #706f7b;")}

  opacity: 0.6;
  font-size: 1.7rem;
  ${media("<tablet")} {
    font-size: 1.3rem;
  }
`;
