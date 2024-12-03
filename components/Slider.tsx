import styled from "styled-components";
import { media } from "@/utils/media";

export default function Slider() {
  const ImageWrapper = styled.div`
    background: url("/stock-image-1.webp");
    background-size: cover;
    background-position: center;
    ${media("<=desktop")} {
      background-size: cover;
      background-repeat: no-repeat;
    }
  `;

  const Container = styled.div`
    background: rgb(21, 35, 62, 0.6);
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 0rem;
    height: 93.5vh;
  `;

  const Title = styled.div`
    font-weight: bold;
    display: inline-block;
    text-align: center;
    align-self: center;
    max-width: 14em;
    position: relative;
    font-size: 6rem;
    margin-bottom: 2rem;
    margin-right: 5rem;
    margin-left: 5rem;
    margin-top: 20rem;
    color: white;

    /* When screen is less or equal to desktop */
    ${media("<largeDesktop")} {
      font-size: 4.6rem;
      margin-top: 20rem;
    }
    /* when screen is less than tablet */
    ${media("<tablet")} {
      margin-left: 2rem;
      margin-right: 2rem;
      align-self: center;
      justify-self: center;
    }
  `;

  return (
    <>
      <ImageWrapper>
        <Container>
          <Title>We are the architects of thriving workplaces</Title>
          {/* <ServicesRow /> */}
        </Container>
      </ImageWrapper>
      {/* <ServicesWrapper>

      </ServicesWrapper> */}
    </>
  );
}
