import styled from "styled-components";
import Container from "components/Container";
import { media } from "utils/media";
import Slider from "components/Slider";

export default function Hero() {
  return (
    <HeroWrapper>
      <Slider />
    </HeroWrapper>
  );
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 0.13rem;
  flex-direction: column;
  height: 80vh;
  width: 100%;

  ${media("<=desktop")} {
    padding-top: 1rem;
    flex-direction: column;
  }
`;
