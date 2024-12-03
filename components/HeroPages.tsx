import Link from "next/link";
import styled from "styled-components";
import { useTheme } from "next-themes";

const Wrapper = styled.section`
  width: 100%;
  height: 41rem;
  background-image: url("/images/hero/car-background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
const Container = styled.div`
  max-width: 133rem !important;
  margin: 0 auto !important;
  padding: 0 2.5rem !important;
`;
const Overlay = styled.div<{ theme: any }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) =>
    props.theme === "light"
      ? "rgba(190, 190, 190, 0.8)"
      : "rgba(0, 0, 0, 0.8)"};
`;
const TextContainer = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: relative;
  width: 100%;
  height: 41rem;
  text-align: center;
  justify-content: center;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  h3 {
    font-size: 3.6rem;
    margin-bottom: 1.5rem;
    font-family: "Inter", sans-serif;
    border-bottom: #f8d521 3px solid;
    margin-right: auto;
    margin-left: auto;
  }
  p {
    font-size: 1.6rem;
    font-weight: 600;
    font-family: "Inter", sans-serif;
  }
  p a {
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
    text-decoration: none;
    transition: all 0.2s;
  }
  p a:hover {
    color: #f8d521;
  }
`;

function HeroPages({ name, subRoute }: any) {
  const { theme }: any = useTheme();

  if (subRoute) {
    return (
      <>
        <Wrapper>
          <Overlay theme={theme}></Overlay>
          <Container>
            <TextContainer theme={theme}>
              <h3>{name}</h3>
              {/* <p>
                <Link href="/">Home</Link> / {name}
              </p> */}
            </TextContainer>
          </Container>
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <Wrapper>
        <Overlay theme={theme}></Overlay>
        <Container>
          <TextContainer theme={theme}>
            <h3>{name}</h3>
            <p>
              <Link href="/">Home</Link> / {name}
            </p>
          </TextContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default HeroPages;
