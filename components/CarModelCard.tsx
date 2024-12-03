import { useAuthContext } from "@/contexts/AuthContext";
import { media } from "@/utils/media";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

const Wrapper = styled.div<{ theme: any }>`
  /* border: 1px solid #d5d5d5; */
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#0b0b0b"};
  border-radius: 0.3rem;
  display: flex;
  width: 35rem;
  flex-direction: column;
  ${media("<=phone")} {
    grid-template-columns: 1fr;
    width: 100%;
  }
  border: ${(props) =>
    props.theme === "light" ? "1px solid #d5d5d5" : "none"};
`;
const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 0.3rem;
  img {
    width: 100%;
    height: 27rem;
  }
`;
const Description = styled.div<{ theme: any }>`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
  p {
    font-size: 2.4rem;
    font-weight: 700;
  }
  span {
    display: flex;
    gap: 0.4rem;
  }
  span i {
    font-size: 1.4rem;
    color: #ffc933;
  }
`;
const Price = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.6rem;
  }
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;
  -moz-column-gap: 7rem;
  column-gap: 7rem;
  margin-top: 2.5rem;
  margin: 2rem auto;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #c6c6c6;
  span {
    font-size: 1.8rem;
    font-weight: 500;
    color: #777777;
    text-align: left;
  }
  span i {
    color: #010103;
  }
`;
const Button = styled.button`
  background-color: #f8d521;
  padding: 1.8rem 3rem;
  border-radius: 0.3rem;
  transition: all 0.3s;
  font-size: 1.8rem;
  cursor: pointer;
  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
  :hover {
    scale: 1.07;
  }
`;

const CarModelCard = (car: any) => {
  const { user }: any = useAuthContext();
  const { theme }: any = useTheme();
  // console.log("Car: ", car);
  return (
    <Wrapper theme={theme}>
      <ImageContainer>
        <img src={car.car.image[0]} alt="car_img" />
        <Description theme={theme}>
          <PriceContainer>
            <Name>
              <p>{car.car.name}</p>
            </Name>
            <Price>
              <h4>{`Ksh${car.car.price}`}</h4>
              <p>per day</p>
            </Price>
          </PriceContainer>
          <Details>
            <span>
              <i className="fa-solid fa-car-side"></i> &nbsp; {car.car.make}
            </span>
            <span style={{ textAlign: "right" }}>
              {car.car.year} <i className="fa-solid fa-car-side"></i>
            </span>
            <span>
              <i className="fa-solid fa-car-side"></i> &nbsp;{" "}
              {`${car.car.seats} seats`}
            </span>
            <span style={{ textAlign: "right" }}>
              {car.car.fuel} &nbsp; <i className="fa-solid fa-car-side"></i>
            </span>
          </Details>
          <Button>
            {user == null ? (
              <Link href="/login">Book Ride</Link>
            ) : (
              <Link href={`/rent-now/${car.car.uid}`}>Book Ride</Link>
            )}

            {/* <Link href={`/rent-now/${car.car.uid}`}>Book Ride</Link> */}
          </Button>
        </Description>
      </ImageContainer>
    </Wrapper>
  );
};

export default CarModelCard;
