import { urlForImage } from "@/sanity/lib/image";
import { media } from "@/utils/media";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import NextImage from "next/image";
import { getAllLinks, getClient } from "@/sanity/lib/client";
import { formatNumber } from "@/utils/formatNumber";
import { useRouter } from "next/router";

const Spinner = styled.div`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0, 0, 0, 0.2588235294);
  border-bottom-color: #4e4e4e;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  right: 43%;
`;
const Wrapper = styled.div`
  gap: 11rem;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  ${media("<=largeDesktop")} {
    gap: 2rem;
  }
  ${media("<=tablet")} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }
`;
const PickCar = styled.div`
  width: 50rem;
  position: relative;
  img {
    width: 100%;
    border-radius: 10px;
  }
  ${media("<=tablet")} {
    width: 100%;
  }
`;
const Description = styled.div`
  width: 25rem;
`;
const Price = styled.div<{ theme: any }>`
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) =>
    props.theme === "light" ? "#999291" : "#414141"};
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: white;
  padding: 0.3rem 1.9rem;
  white-space: nowrap;
  span {
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ButtonContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  @media (max-width: 768px) {
    align-items: start;
    margin-top: 5rem;
    margin: 0 auto;
  }
`;
const LinkContainer = styled.div<{ show: any }>`
  display: flex;
  transform: translateY(${(props) => (props.show ? "0" : "100%")});
  transition: transform 0.4s;
  justify-content: start;
  padding: 1.8rem 0rem;
  z-index: 0;

  @media (max-width: 768px) {
  }
`;
const BookLink = styled.a`
  width: 100%;
  transition: ease-in-out 0.3s;
  &:hover {
    scale: 1.04;
  }
`;
const Table = styled.div<{ theme: any }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  font-size: 1.6rem;
  border-bottom: 1px solid #d5d5d5;
  color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
`;
const BookButton = styled.div<{ theme: any }>`
  background-color: #f8d521;
  padding: 1rem;
  border-radius: 10px;
  margin: 2rem auto;
  transition: all 0.3s;
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  &:hover {
    scale: 1.07;
  }
`;
const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  grid-template-rows: auto;
  padding: 0.9rem 0.5rem;
  p {
    font-weight: 700;
  }
`;
const AnimatedButton = styled.button<{ theme: any }>`
  margin-top: 2rem;
  background-color: #f8d521;
  padding: 1.8rem 3rem;
  border-radius: 0.3rem;
  transition: all 0.3s;
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    scale: 1.07;
  }
`;

function CarBox({ car, carID, theme }: any) {
  const [carLoad, setCarLoad] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchLinks() {
      const client = getClient();
      const res: any = await getAllLinks(client);
      // console.log("Links: ", res);
      setLinks(res);
    }
    fetchLinks();
  }, []);

  return (
    <Wrapper>
      {/* car */}
      <PickCar>
        {carLoad && <Spinner />}
        <img
          style={{ display: carLoad ? "none" : "block" }}
          src={car.image[0]}
          alt="car_img"
          onLoad={() => setCarLoad(false)}
        />
      </PickCar>
      {/* description */}
      <Description>
        <Price theme={theme}>
          <span>Ksh{formatNumber(car.price)}</span>/ per day
        </Price>
        <Table theme={theme}>
          <Column>
            <p>Name</p>
            <span>{car.name}</span>
          </Column>
          <Column>
            <p>Model</p>
            <span>{car.model}</span>
          </Column>

          <Column>
            <p>Make</p>
            <span>{car.make}</span>
          </Column>

          <Column>
            <p>Year</p>
            <span>{car.year}</span>
          </Column>

          <Column>
            <p>Seats</p>
            <span>{car.seats}</span>
          </Column>

          <Column>
            <p>Fuel</p>
            <span>{car.fuel}</span>
          </Column>
        </Table>
        {/* btn cta */}
        <ButtonContainer>
          <BookButton
            onClick={() => {
              router.push(`/rentals/${car.uid}`);
            }}
            theme={theme}
          >
            {/* <Link href="">Book Ride</Link> */}
            Book Ride
          </BookButton>
        </ButtonContainer>
        {/* <AnimatedButton>
          <Link href="/rent-now">Rent Now</Link>
        </AnimatedButton> */}
      </Description>
    </Wrapper>
  );
}

export default CarBox;
