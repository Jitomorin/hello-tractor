import { useEffect, useState } from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { FacebookIcon, LinkedinIcon } from "react-share";
import NextLink from "next/link";
import { media } from "../utils/media";
import Link from "next/link";
import { getAllLinks, getClient } from "@/sanity/lib/client";
import { useTheme } from "next-themes";

export default function StickySocialMediaBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { theme }: any = useTheme();
  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    async function fetchLinks() {
      const client = getClient();
      const res: any = await getAllLinks(client);
      // console.log("Links: ", res);
      setLinks(res);
    }
    fetchLinks();
    // Add event listener to check screen width on mount and resize
    function handleResize() {
      setIsMobile(window.innerWidth != 768); // Adjust the breakpoint as needed
    }

    handleResize(); // Call the function initially

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Wrapper theme={theme}>
      <ShareBar>
        <SocialmediaLink>
          {links[0]?.linkedin && (
            <Link target="_blank" href={links[0]?.linkedin} passHref>
              {/* {theme === "light" ? (
              <img
                src="/linkedin-icon.png"
                alt="Linkedin Link"
                width={isMobile ? 45 : 30}
                height={isMobile ? 45 : 30}
              />
            ) : (
              <img
                src="/linkedin-icon-white.png"
                alt="Linkedin Link"
                width={isMobile ? 45 : 30}
                height={isMobile ? 45 : 30}
              />
            )} */}
              {/* <LinkedinIcon size={isMobile ? 40 : 30} round={true} /> */}
              <img
                src={
                  theme === "light" ? "/linkedin.svg" : "/linkedin-white.svg"
                }
                alt="LinkedIn Link"
                width={isMobile ? 30 : 25}
                height={isMobile ? 30 : 25}
              />
            </Link>
          )}
        </SocialmediaLink>
        <SocialmediaLink>
          {links[0]?.instagram && (
            <Link target="_blank" href={links[0]?.instagram} passHref>
              {/* <TwitterIcon size={50} round={true} /> */}
              <img
                src={
                  theme === "light" ? "/instagram.svg" : "/instagram-white.svg"
                }
                alt="Instagram Link"
                width={isMobile ? 30 : 25}
                height={isMobile ? 30 : 25}
              />
              {/* {theme === "light" ? (
              <img
                src="/instagram-icon.png"
                alt="Instagram Link"
                width={isMobile ? 45 : 30}
                height={isMobile ? 45 : 30}
              />
            ) : (
              <img
                src="/instagram-icon-white.png"
                alt="Instagram Link"
                width={isMobile ? 45 : 30}
                height={isMobile ? 45 : 30}
              />
            )} */}
            </Link>
          )}
        </SocialmediaLink>
        <SocialmediaLink>
          {links[0]?.facebook && (
            <Link target="_blank" href={links[0]?.facebook} passHref>
              {/* {theme === "light" ? (
              <img
                src="/facebook-icon.png"
                alt="Facebook Link"
                width={isMobile ? 45 : 30}
                height={isMobile ? 45 : 30}
              />
            ) : (
              <img
                src="/facebook-icon-white.png"
                alt="Facebook Link"
                width={isMobile ? 45 : 30}
                height={isMobile ? 45 : 30}
              />
            )} */}
              {/* <FacebookIcon size={isMobile ? 40 : 30} round={true} /> */}
              <img
                src={
                  theme === "light" ? "/facebook.svg" : "/facebook-white.svg"
                }
                alt="Faceboook Link"
                width={isMobile ? 30 : 25}
                height={isMobile ? 30 : 25}
              />
            </Link>
          )}
        </SocialmediaLink>
      </ShareBar>
    </Wrapper>
  );
}
const Wrapper = styled.div<{ theme: any }>`
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translateY(-20%);
  margin-right: 1rem;
  z-index: 1000;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 15px;
  background-color: ${(props: any) =>
    props.theme === "light" ? "rgba(255, 255, 255, 0.8)" : "transparent"};
  backdrop-filter: blur(10px);
  ${media("<tablet")} {
    display: none;
  }
`;
const ShareBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SocialmediaLink = styled.div`
  cursor: pointer;
  padding: 0, 0.9rem;
  transition: ease-in-out 0.3s;
  margin-bottom: 2rem;
  &:hover {
    scale: 1.2;
    transition: ease-in-out 0.3s;
  }
`;
