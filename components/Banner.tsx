import styled from "styled-components";

import CTAButton from "./CTAButton";
import { media } from "@/utils/media";

const Wrapper = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: black;
  text-align: center;
`;
const Container = styled.div`
  background: rgb(21, 35, 62, 0.8);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
`;
const ImageBackround = styled.div`
  background: url("/images/banners/banner.jpg") no-repeat center;
  width: 100%;
  height: 100%;
`;
const BannerContainer = styled.div`
  max-width: 133rem !important;
  margin: 0 auto !important;
  padding: 0 2.5rem !important;
  padding-top: 8rem;
`;
const BannerContent = styled.div`
  max-width: 133rem !important;
  margin: 0 auto !important;
  padding: 0 2.5rem !important;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  h2 {
    font-size: 5.8rem;
    /* line-height: 1.3; */
    color: #fff;
    font-family: "Inter", sans-serif;
  }
  p {
    font-size: 2.8rem;
    color: #fff;
    font-family: "Inter", sans-serif;
  }
  span {
    color: #fff;
    font-weight: 500;
  }
  ${media("<=tablet")} {
    h2 {
      font-size: 4.8rem;
    }
  }
  ${media("<=tablet")} {
    p {
      font-size: 2.4rem;
    }
  }
`;

function Banner() {
  return (
    <>
      <Wrapper>
        <ImageBackround>
          <Container>
            <BannerContainer>
              <BannerContent>
                <BannerText>
                  <h2>Reach out!</h2>
                  <p>
                    {/* Top Airports. Local Suppliers. <span>24/7</span> Support. */}
                    We'll get back to you as soon as possible
                  </p>
                </BannerText>
                <CTAButton name="Contact us" link="/contact" />
              </BannerContent>
            </BannerContainer>
          </Container>
        </ImageBackround>
      </Wrapper>
    </>
  );
}

export default Banner;
