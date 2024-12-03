import styled from "styled-components";
import Container from "./Container";
import { useTheme } from "next-themes";
import { media } from "@/utils/media";
import { useEffect, useState } from "react";
import {
  getAllEmployees,
  getAllTestimonials,
  getClient,
} from "@/sanity/lib/client";
import { set } from "sanity";
import { urlForImage } from "@/sanity/lib/image";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#f8f8f8" : "#010103"};
  padding: 10rem 0;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
  max-width: 70rem;
  margin-bottom: 5rem;

  h2 {
    font-size: 4.2rem;
    margin-bottom: 1.4rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  p {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    color: #706f7b;
    line-height: 1.4;
    color: #706f7b;
  }
`;
const AllTestimonials = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  justify-content: center;
  padding: 3rem;
  ${media("<=desktop")} {
    padding: 0;
  }
`;
const Quotes = styled.span`
  font-size: 6.2rem;
  color: #000000;
  position: absolute;
  bottom: 33px;
  right: 60px;
  ${media("<=phone")} {
    padding: 0;
  }
`;
const TestimonialBox = styled.div<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#0b0b0b"};
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.08);
  width: 54rem;
  padding: 5.5rem;
  position: relative;
  border-radius: 10px;
  p {
    font-size: 2.2rem;
    font-weight: 500;
    font-family: "Inter", sans-serif;
  }
  &:not(:first-child) {
    ${media("<=desktop")} {
      display: none;
    }
  }
  ${media("<=desktop")} {
    padding: 5rem 3rem;
  }
`;
const Name = styled.div`
  display: flex;
`;
const Profile = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 3rem;
  img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
  }
  h4 {
    font-size: 1.8rem;
  }
  p {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }
`;

function Testimonials() {
  const { theme }: any = useTheme();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const client = getClient();
    const fetchTestimonials = async () => {
      const res: any = await getAllTestimonials(client);
      console.log("testimonials: ", res);
      setTestimonials(res);
    };
    fetchTestimonials();
  }, []);

  return (
    <>
      <Wrapper theme={theme}>
        <Container>
          <Content>
            <TitleContainer theme={theme}>
              {/* <h4>Reviewed by People</h4> */}
              <h2>Hear from our clients & hosts</h2>
              <p>
                Both our clients & hosts have a lot of good experiences to share
                since they joined our car-sharing marketplace
              </p>
            </TitleContainer>

            <AllTestimonials>
              {testimonials.map((testimonial: any, index: any) => (
                <TestimonialBox key={index} theme={theme}>
                  <Quotes>
                    <i className="fa-solid fa-quote-right"></i>
                  </Quotes>
                  <p>{testimonial.testimonial}</p>
                  <Name>
                    <Profile>
                      <img
                        src={urlForImage(
                          testimonial.clientImage?.asset?._ref
                        ).url()}
                        alt="user_img"
                      />
                      <span>
                        <h4>{testimonial.clientName}</h4>
                        {/* <p>Novi Sad</p> */}
                      </span>
                    </Profile>
                  </Name>
                </TestimonialBox>
              ))}
            </AllTestimonials>
          </Content>
        </Container>
      </Wrapper>
    </>
  );
}

export default Testimonials;
