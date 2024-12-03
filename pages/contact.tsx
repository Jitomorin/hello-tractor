import Link from "next/link";
import HeroPages from "../components/HeroPages";
import MapSection from "@/views/ContactPage/MapSection";
import styled from "styled-components";
import { useTheme } from "next-themes";
import Container from "@/components/Container";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#17191a"};
`;
const ContactContainer = styled.section<{ theme: any }>`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr 1fr; */
  /* gap: 3rem; */
  margin: 0 auto;
  color: #010103;
  padding: 10rem 2rem;
  background-image: url("/images/banners/bg-contact.png");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    text-align: center;
    background-image: url("");
  }
`;
const TextContainer = styled.section<{ theme: any }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* max-width: 41rem; */
  h2 {
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    font-size: 4.2rem;
    line-height: 1.3;
    margin-bottom: 2rem;
    font-family: "Inter", sans-serif;
  }
  p {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    color: #706f7b;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  a {
    text-decoration: none;
    color: #010103;
    font-size: 1.8rem;
    font-weight: 500;
    transition: all 0.2s;
    margin-bottom: 0.5rem;
  }
  a:hover {
    color: #f8d521;
  }
  @media (max-width: 950px) {
    margin: 0 auto;
    margin-bottom: 2rem;
  }
`;

const ContactForm = styled.div`
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
  }
  form label {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    @media (max-width: 768px) {
      text-align: left;
    }
  }
  form label b {
    color: #f8d521;
  }
  form input {
    background-color: ${(props) =>
      props.theme === "light" ? "#f2f2f2" : "#272a2c"};
    padding: 19px 30px 19px 30px;
    border-radius: 10px;
    font-size: 1.6rem;
    border: none;
    outline: none;
    margin-bottom: 2.3rem;
  }
  form textarea {
    background-color: ${(props) =>
      props.theme === "light" ? "#f2f2f2" : "#272a2c"};
    border-radius: 10px;
    height: 18rem;
    padding: 19px 30px 19px 30px;
    font-size: 1.6rem;
    border: none;
    outline: none;
    margin-bottom: 2.5rem;
  }
  form button {
    background-color: #f8d521;
    padding: 1.8rem 3rem;
    border-radius: 10px;
    /* box-shadow: 0 10px 15px 0 rgba(255, 83, 48, 0.35); */
    transition: all 0.3s;
    font-family: "Inter", sans-serif;
    /* border: 2px solid #ff4d30; */
    color: white;
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: ease-in-out 0.3s;
  }
  form button:hover {
    transition: ease-in-out 0.3s;
    scale: 1.03;
  } /*# sourceMappingURL=styles.css.map */
`;
const LinkContainer = styled.div<{ theme: any }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2.3rem;
  a {
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    @media (max-width: 425px) {
      font-size: 1.2rem;
    }
  }
`;

function Contact() {
  const { theme }: any = useTheme();
  return (
    <>
      {/* <Navbar /> */}
      <Wrapper theme={theme}>
        <HeroPages name="Contact" subRoute={false} />
        <Container>
          <ContactContainer>
            <TextContainer theme={theme}>
              <h2>Need additional information?</h2>
              <p>
                Contact us about anything related to our company or services.
                We'll do our best to get back to you as soon as possible.
              </p>
              <LinkContainer theme={theme}>
                <Link href="/">
                  <i className="fa-solid fa-phone"></i>&nbsp; +254 (20) 202 0099
                </Link>
                <Link href="/">
                  <i className="fa-solid fa-envelope"></i>&nbsp;
                  info@Plow-mart.com
                </Link>
                <Link href="/">
                  <i className="fa-solid fa-location-dot"></i>&nbsp; Nairobi •
                  Kahawa Sukari
                </Link>
              </LinkContainer>
            </TextContainer>
            <ContactForm theme={theme}>
              <form>
                <label>
                  Full Name <b>*</b>
                </label>
                <input type="text" placeholder="Enter your full name"></input>

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="Enter your email"></input>

                <label>
                  How can we help you? <b>*</b>
                </label>
                <textarea placeholder="Write Here.."></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send
                  Message
                </button>
              </form>
            </ContactForm>
            <MapSection />
          </ContactContainer>
        </Container>

        {/* <Footer /> */}
      </Wrapper>
    </>
  );
}

export default Contact;
