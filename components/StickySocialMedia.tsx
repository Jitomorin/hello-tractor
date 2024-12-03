import { useEffect, useState } from "react";
import styled from "styled-components";
// import { FacebookIcon, LinkedinIcon } from "react-share";
import { media } from "../utils/media";
import WhatsappIcon from "/images/logo/whatsapp_logo.webp";
import InstagramIcon from "/images/logo/instagram_logo.webp";
import LinkedinIcon from "/images/logo/linkedin_icon.png";
import FacebookIcon from "/images/logo/facebook_icon.png";
import Link from "next/link";

export default function StickySocialMediaBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
    <Wrapper>
      <ShareBar>
        <SocialmediaLink>
          <Link target="_blank" href="https://www.linkedin.com" passHref>
            {/* <LinkedinIcon size={isMobile ? 40 : 30} round={true} /> */}
            <img
              src={"/images/logo/linkedin_icon.png"}
              alt="Linkedin Link"
              width={isMobile ? 65 : 50}
              height={isMobile ? 65 : 50}
            />
          </Link>
        </SocialmediaLink>{" "}
        <SocialmediaLink>
          <Link target="_blank" href="https://www.instagram.com/" passHref>
            {/* <TwitterIcon size={50} round={true} /> */}
            <img
              src={"/images/logo/instagram_logo.webp"}
              alt="Instagram Link"
              width={isMobile ? 65 : 50}
              height={isMobile ? 65 : 50}
            />
          </Link>
        </SocialmediaLink>{" "}
        <SocialmediaLink>
          <Link target="_blank" href="https://www.facebook.com/" passHref>
            {/* <FacebookIcon size={isMobile ? 40 : 30} round={true} /> */}
            <img
              src={"/images/logo/facebook_icon.png"}
              alt="Facebook Link"
              width={isMobile ? 65 : 50}
              height={isMobile ? 65 : 50}
            />
          </Link>
        </SocialmediaLink>{" "}
        <SocialmediaLink>
          <Link target="_blank" href="https://wa.me/" passHref>
            {/* <TwitterIcon size={50} round={true} /> */}
            <img
              src={"/images/logo/whatsapp_logo.webp"}
              alt="Whatsapp Link"
              width={isMobile ? 60 : 45}
              height={isMobile ? 60 : 45}
            />
          </Link>
        </SocialmediaLink>{" "}
      </ShareBar>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  /* position: fixed; */
  /* top: 50%; */
  transform: translateY(-30%);
  margin-left: 0.4rem;
  z-index: 1000;
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
  padding: 0, 0.5rem;
  &:hover {
    scale: 1.2;
  }
`;
