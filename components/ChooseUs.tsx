import Image from "next/image";
import NextImage from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Container from "./Container";
import { media } from "@/utils/media";
import HeroButton from "./HeroButton";
import { useTheme } from "next-themes";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#17191a"};
  padding: 2rem 0 10rem 0;
  background-image: url("/images/chooseUs/bg.png");
  background-position: -225px 255px;
  background-size: cover;
  background-repeat: no-repeat;
`;
const ChooseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChooseImage = styled.img`
  width: 90%;
  height: auto;
  margin: 0 auto;
  ${media("<=tablet")} {
    width: 100%;
  }
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  width: 100%;
  ${media("<=desktop")} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5.5rem;
  }
`;
const TextContainerLeft = styled.div<{ theme: any }>`
  text-align: left;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  h4 {
    font-size: 2.2rem;
    margin-bottom: 0.7rem;
    font-weight: 600;
    font-family: "Inter", sans-serif;
  }
  h2 {
    font-size: 4.2rem;
    line-height: 1.2;
    margin-bottom: 2rem;
    font-family: "Inter", sans-serif;
  }
  p {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    line-height: 1.5;
    color: #706f7b;
    margin-bottom: 3.3rem;
  }

  ${media("<=desktop")} {
    align-items: center;
    text-align: center;
  }
`;

const TextContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  max-width: 44rem;
`;
const TextContainerRightBox = styled.div`
  display: flex;
  img {
    width: 11rem;
    height: 11rem;
    margin-right: 1.1rem;
  }
  ${media("<=tablet")} {
    flex-direction: column;
    align-items: center;
  }
`;
const BoxText = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  h4 {
    font-size: 2.4rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  p {
    font-size: 1.6rem;
    color: #706f7b;
    font-family: "Inter", sans-serif;
    line-height: 1.3;
  }
`;

function ChooseUs() {
  const { theme }: any = useTheme();
  return (
    <>
      <Wrapper theme={theme}>
        <Container>
          <ChooseContainer>
            {/* <ChooseImage
              src={"/images/chooseUs/main.png"}
              style={{ width: "45%", height: "45%" }}
              alt="car_img"
            /> */}
            <TextContainer>
              <TextContainerLeft theme={theme}>
                <h4>Why Choose Us</h4>
                <h2>Best valued deals you will ever find</h2>
                <p>
                  Pata Ride is an established car rental marketplace that aims
                  to connect car owners (hosts) with, name a few: travelers,
                  tourists, road trip enthusiasts, event planners, and migrants.
                  Our passion for this innovative concept is driven by the need
                  to provide logistic solutions with a memorable experience to
                  all. Pata Ride offers the host an attractive entrepreneurship
                  opportunity with broad market access. Similarly, our clientele
                  gets a similar degree of access to various vehicles. The power
                  to select your ride lies with you.
                </p>
                <HeroButton name="Learn more" link="/about" />
                {/* <Link href="#home">
                  Learn more &nbsp;
                </Link> */}
              </TextContainerLeft>
              <TextContainerRight>
                <TextContainerRightBox>
                  <img src={"/images/chooseUs/icon1.png"} alt="car-img" />
                  <BoxText theme={theme}>
                    <h4>Cross Country Drive</h4>
                    <p>
                      Take your driving experience to the next level with our
                      top-notch vehicles for your cross-country adventures.
                    </p>
                  </BoxText>
                </TextContainerRightBox>
                <TextContainerRightBox>
                  {" "}
                  <img src={"/images/chooseUs/icon2.png"} alt="coin-img" />
                  <BoxText theme={theme}>
                    <h4>All Inclusive Pricing</h4>
                    <p>
                      Get everything you need in one convenient, transparent
                      price with our all-inclusive pricing policy.
                    </p>
                  </BoxText>
                </TextContainerRightBox>
                <TextContainerRightBox>
                  <img src={"/images/chooseUs/icon3.png"} alt="coin-img" />
                  <BoxText theme={theme}>
                    <h4>No Hidden Charges</h4>
                    <p>
                      Enjoy peace of mind with our no hidden charges policy. We
                      believe in transparent and honest pricing.
                    </p>
                  </BoxText>
                </TextContainerRightBox>
              </TextContainerRight>
            </TextContainer>
          </ChooseContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default ChooseUs;
