import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";
import Container from "./Container";

const Wrapper = styled.section<{ theme: any }>`
  background-image: url("/images/faq/car.png");
  padding: 10rem 0;
  background: ${(props) => (props.theme === "light" ? "#fff" : "#010103")};
  background-size: auto;
  background-repeat: no-repeat;
  background-position: 0 70%;
`;
const Content = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
`;
const Title = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
  max-width: 80rem;
  line-height: 1.5;
  h5 {
    font-size: 2.2rem;
    color: #706f7b;
  }
  h2 {
    font-size: 4.2rem;
    margin-bottom: 1.7rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  p {
    font-size: 1.6rem;
    color: #706f7b;
    font-family: "Inter", sans-serif;
  }
`;
const Questions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
`;
const Box = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#0b0b0b"};
  width: 80rem;
  cursor: pointer;
  @media (max-width: 850px) {
    width: 100%;
  }
`;
const Question = styled.div<{ active: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  padding: 1.8rem 4.5rem;
  transition: 0.15s ease;
  ${(props) => (props.active ? "background-color: #2e2b2b;" : "")}
  p {
    font-size: 1.8rem;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.active ? "#fff" : "#706f7b")};
  }
  i {
    font-size: 2rem;
  }
`;
const Answer = styled.div<{ active: any }>`
  font-size: 1.6rem;
  font-family: "Inter", sans-serif;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  color: #706f7b;
  line-height: 1.7;
  max-height: ${(props) => (props.active ? "20rem" : "0")};
  overflow: hidden;
  transition: 0.4s ease;
  padding: ${(props) => (props.active ? "2.8rem 4.5rem" : "0 4.5rem")};

  p {
    font-size: 1.8rem;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.active ? "#fff" : "#706f7b")};
  }
  i {
    font-size: 2rem;
  }
`;

function Instructions() {
  const [activeQ, setActiveQ] = useState("q1");
  const { theme }: any = useTheme();

  const openQ = (id: any) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id: any) => {
    // return activeQ === id ? "active-answer" : "";
    return activeQ === id;
  };

  const getClassQuestion = (id: any) => {
    // return activeQ === id ? "active-question" : "";
    return activeQ === id;
  };

  return (
    <>
      <Wrapper theme={theme}>
        <Container>
          <Content>
            <Title theme={theme}>
              {/* <h5>FAQ</h5> */}
              <h2>Frequently Asked Questions</h2>
              <p>
                Frequently Asked Questions About the Car Rental Booking Process
                on Our Website: Answers to Common Concerns and Inquiries.
              </p>
            </Title>

            <Questions>
              <Box theme={theme}>
                <Question
                  active={getClassQuestion("q1")}
                  id="q1"
                  onClick={() => openQ("q1")}
                  // className={`faq-box__question  ${getClassQuestion("q1")}`}
                >
                  <p>1. What is special about comparing rental car deals?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </Question>
                <Answer
                  active={getClassAnswer("q1")}
                  id="q1"
                  onClick={() => openQ("q1")}
                  // className={`faq-box__answer ${getClassAnswer("q1")}`}
                >
                  Comparing rental car deals is important as it helps find the
                  best deal that fits your budget and requirements, ensuring you
                  get the most value for your money. By comparing various
                  options, you can find deals that offer lower prices,
                  additional services, or better car models. You can find car
                  rental deals by researching online and comparing prices from
                  different rental companies.
                </Answer>
              </Box>
              <Box theme={theme}>
                <Question
                  active={getClassQuestion("q2")}
                  id="q2"
                  onClick={() => openQ("q2")}
                  // className={`faq-box__question ${getClassQuestion("q2")}`}
                >
                  <p>2. How do I find the car hires deals?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </Question>
                <Answer
                  active={getClassAnswer("q2")}
                  id="q2"
                  onClick={() => openQ("q2")}
                  // className={`faq-box__answer ${getClassAnswer("q2")}`}
                >
                  You can find car rental deals by researching online and
                  comparing prices from different rental companies. Websites
                  such as Expedia, Kayak, and Travelocity allow you to compare
                  prices and view available rental options. It is also
                  recommended to sign up for email newsletters and follow rental
                  car companies on social media to be informed of any special
                  deals or promotions.
                </Answer>
              </Box>
              <Box theme={theme}>
                <Question
                  active={getClassQuestion("q3")}
                  id="q3"
                  onClick={() => openQ("q3")}
                  // className={`faq-box__question ${getClassQuestion("q3")}`}
                >
                  <p>3. How do I find such low rental car prices?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </Question>
                <Answer
                  active={getClassAnswer("q3")}
                  id="q3"
                  onClick={() => openQ("q3")}
                  // className={`faq-box__answer ${getClassAnswer("q3")}`}
                >
                  Book in advance: Booking your rental car ahead of time can
                  often result in lower prices. Compare prices from multiple
                  companies: Use websites like Kayak, Expedia, or Travelocity to
                  compare prices from multiple rental car companies. Look for
                  discount codes and coupons: Search for discount codes and
                  coupons that you can use to lower the rental price. Renting
                  from an off-airport location can sometimes result in lower
                  prices.
                </Answer>
              </Box>
            </Questions>
          </Content>
        </Container>
      </Wrapper>
    </>
  );
}

export default Instructions;
