import Faq from "@/components/Faq";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Navbar from "../components/Navbar";
import PlanTrip from "../components/PlanTrip";
import Team from "./Team";
import { useEffect, useState } from "react";
import { getAllData, getData } from "@/utils/firebase/firestore";
import styled from "styled-components";
import { useTheme } from "next-themes";
import Container from "@/components/Container";
import { getAllAbout, getClient } from "@/sanity/lib/client";
import { AboutInterface } from "@/sanity/lib/queries";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#050505"};
`;
const AboutMain = styled.div<{ theme: any }>`
  margin: 5rem auto;
  display: flex;
  gap: 5rem;
  max-width: 90rem;
  align-items: center;
  @media (max-width: 960px) {
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    max-width: 49rem;
  }
  @media (max-width: 520px) {
    max-width: 100%;
  }
`;
const AboutImage = styled.img`
  width: 43rem;
  height: 43rem;
  border-radius: 10px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
  @media (max-width: 520px) {
    width: 100%;
    height: auto;
  }
`;
const TextContainer = styled.div<{ theme: any }>`
  color: #010103;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  text-align: right;
  h3 {
    font-size: 2.2rem;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #706f7b;
  }
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 4.2rem;
    line-height: 1.2;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  p {
    font-size: 1.6rem;
    color: #706f7b;
    font-family: "Inter", sans-serif;
    line-height: 1.5;
    margin-top: 2rem;
    margin-bottom: 4rem;
  }
  span p {
    margin-top: 0.5rem;
    color: #706f7b;
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    text-align: center;
    h2 {
      font-size: 3.2rem;
    }
  }
`;

const TextIconBox = styled.div`
  display: flex;
  justify-content: end;
  span p {
    margin: auto 0;
    padding: 0;
    align-items: center;
    font-size: 1.7rem;
  }

  @media (max-width: 520px) {
    /* grid-template-columns: 1fr; */
    margin: 0 auto;
    /* gap: 0; */

    p {
      margin-top: 0;
    }
  }
`;
const Icon = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
  img {
    width: 7rem;
    margin: 0 auto;
  }
  p {
    font-size: 1.2rem;
    color: #706f7b;
    margin-top: 0.5rem;
    padding: auto 0;
    margin: auto 0;
    display: flex;
    align-items: center; /* Vertically aligns the text in the center */
    justify-content: center; /* Horizontally aligns the text in the center */
  }
  span {
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center; /* Horizontally aligns the text in the center */
    gap: 1rem;
  }
  span h4 {
    font-size: 4.6rem;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  @media (max-width: 520px) {
    span {
      text-align: center;
      flex-direction: column;
    }
  }
`;

function About() {
  const [numberOfRentals, setNumberOfRentals] = useState(0);
  const { theme }: any = useTheme();
  const [aboutText, setAboutText] = useState<AboutInterface[]>([]);

  useEffect(() => {
    const client = getClient();
    const fetchRentals = async () => {
      const data = await getData("rentals");
      setNumberOfRentals(data.length);
    };
    const fetchAboutText = async () => {
      const data: AboutInterface[] = await getAllAbout(client);
      setAboutText(data);
    };
    fetchRentals();
    fetchAboutText();
  }, []);

  return (
    <>
      <Wrapper theme={theme}>
        <HeroPages name="About" subRoute={false} />
        <Container>
          <AboutMain>
            <AboutImage
              src={"/images/about/about-main.jpg"}
              alt="car-renting"
            />
            <TextContainer theme={theme}>
              {aboutText.map((about: AboutInterface) => {
                return (
                  <>
                    <h3>About Company</h3>
                    <h2>{about.mission}</h2>
                    <p>{about.aboutText}</p>
                  </>
                );
              })}
              {/* <h3>About Company</h3>
              <h2>You start the engine and your adventure begins</h2>
              <p>
                Welcome to Plow-mart! We're a dynamic car-rental company with a passion for connecting people who want to rent out cars to their hosts. We've become a trusted name in the industry. Our talented team delivers top-notch car rental services, prioritizing both client and host satisfaction. Join us on our journey as we push boundaries and make a positive impact.
              </p> */}
              <TextIconBox>
                <Icon theme={theme}>
                  <img src={"/images/about/car-icon.png"} alt="car-icon" />
                  <span>
                    <h4>{numberOfRentals}</h4>
                    <p>Cars you can hire</p>
                  </span>
                </Icon>
                {/* <div className="about-main__text__icons__box">
                  <img src={"/images/about/icon2.png"} alt="car-icon" />
                  <span>
                    <h4>1</h4>
                    <p>Rental Outlets</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img
                    src={"/images/about/icon3.png"}
                    alt="car-icon"
                    className="last-fk"
                  />
                  <span>
                    <h4>75</h4>
                    <p>Repair Shop</p>
                  </span>
                </div> */}
              </TextIconBox>
            </TextContainer>
          </AboutMain>
          <PlanTrip />
          <Team />
          <Faq />
        </Container>
      </Wrapper>
      {/* <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2>Book a car by getting in touch with us</h2>
            <span>
              <i className="fa-solid fa-phone"></i>
              <h3> +254 (20) 202 0099 </h3>
            </span>
          </div>
        </div>
      </div> */}
      {/* <Footer /> */}
    </>
  );
}

export default About;
