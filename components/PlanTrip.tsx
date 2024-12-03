import NextImage from "next/image";
import styled from "styled-components";
import Container from "./Container";
import { media } from "@/utils/media";
import Link from "next/link";
import { useTheme } from "next-themes";

const Wrapper = styled.section<{ theme: any }>`
  background-color: #ffffff;
  background-color: ${(props) =>
    props.theme === "light" ? "#ffffff" : "#000"};
  padding: 5.3rem 0;
`;
const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div<{ theme: any }>`
  margin: 0 auto;
  margin-bottom: 4rem;
  text-align: center;
  color: #010103;
  h3 {
    font-size: 2.4rem;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    color: ${(props) => (props.theme === "light" ? "#706f7b" : "#706f7b")};
  }
  h2 {
    font-size: 4.2rem;
    font-family: "Inter", sans-serif;
    margin: 1.3rem 0 3rem 0;
    position: relative;
    color: ${(props) => (props.theme === "light" ? "black" : "white")};
  }
  h2::after {
    content: "";
    position: absolute;
    top: 95%;
    width: 150%;
    aspect-ratio: 3 / 1;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 50%;
    border: 6px solid #f8d521;
    --spread: 140deg;
    --start: 290deg;
    mask: conic-gradient(
      from var(--start),
      white 0 var(--spread),
      transparent var(--spread)
    );
  }
`;
const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  margin-top: 3.7rem;
  padding: 0 3rem;

  ${media("<=desktop")} {
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
  }
  ${media("<=tablet")} {
    grid-template-columns: 1fr;
    margin-top: 1rem;
  }
`;
const Box = styled.div<{ theme: any }>`
  text-align: center;
  padding: 1rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 24rem;
    height: auto;
    cursor: pointer;
    transition: ease-in-out 0.3s;
    &:hover {
      scale: 1.02;
      transition: ease-in-out 0.3s;
    }
  }
  h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => (props.theme === "light" ? "black" : "white")};
  }
  p {
    font-size: 1.7rem;
    font-family: "Inter", sans-serif;
    color: #706f7b;
    line-height: 1.43;
  }

  ${media("<=phone")} {
    padding: 1rem 1rem;
  }
  ${media("<=tablet")} {
    grid-template-columns: 1fr;
    margin-top: 1rem;
  }
`;

function PlanTrip() {
  const { theme }: any = useTheme();
  console.log(theme);
  return (
    <>
      <Wrapper theme={theme}>
        <Container>
          <PlanContainer>
            <TitleContainer theme={theme}>
              <h3>Hire your car now</h3>
              <h2>Quick & easy</h2>
            </TitleContainer>

            <BoxContainer>
              <Box theme={theme}>
                <Link href="/rentals">
                  <img src={"/images/plan/first-icon.png"} alt="icon_img" />
                </Link>
                {/* <img src={"/images/plan/first-icon.png"} alt="icon_img" /> */}
                <h3>For Executives</h3>
                <p>
                  Choose your ride, fuel your dreams. You now have a chance to
                  show up in style. Let your presence be acknowledged. Let them
                  feel your strength.
                </p>
              </Box>

              <Box theme={theme}>
                <Link href="/rentals">
                  <img src={"/images/plan/second-icon.png"} alt="icon_img" />
                </Link>

                <h3>For Tours</h3>
                <p>
                  Hidden beyond the rugged African terrains is unexpected
                  beauty. Here, you get an opportunity to venture beyond
                  challenges with ease. Choose your dream 4x4 ride and have a
                  unique expereence. Camp with ease, feel the untamed nature.
                </p>
              </Box>

              <Box theme={theme}>
                <Link href="/rentals">
                  <img src={"/images/plan/third-icon.png"} alt="icon_img" />
                </Link>
                {/* <img src={"/images/plan/third-icon.png"} alt="icon_img" /> */}
                <h3>For Movers</h3>
                <p>
                  Relocating? Worry no more. Find movers you can trust with your
                  home. Here, safety is a key aspect. We strictly vet movers to
                  give you a perfect gome experience.
                </p>
              </Box>
            </BoxContainer>
          </PlanContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default PlanTrip;
