import { useAuthContext } from "@/contexts/AuthContext";
import { media } from "@/utils/media";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";
import "swiper/swiper-bundle.css";
import "@/css/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { formatNumber } from "@/utils/formatNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div<{ theme: any }>`
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props) => (props.theme === "light" ? "" : "background-color:#0b0b0b;")};
  transition: ease-in-out 0.3s;
  border: ${(props) =>
    props.theme === "light" ? "1px solid #c5c5c5" : "none"};
  :hover {
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
      0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  ${media("<=phone")} {
    grid-template-columns: 1fr;
    width: 260px;
    align-items: center;
  }
`;
const ImageContainer = styled.div`
  margin: 0 auto;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  border-radius: 0.3rem;
  img {
    width: 100%;
    height: 27rem;
    margin: 0 auto;
    ${media("<=phone")} {
      width: 260px;
      height: 20rem;
      align-items: center;
    }
  }
  ${media("<=phone")} {
    width: auto;
  }
`;
const Description = styled.div<{ theme: any }>`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  ${media("<=phone")} {
    /* width: auto; */
    padding: 2rem 3rem;
  }
`;
const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
  p {
    font-size: 1.4rem;
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
  flex-direction: row;
  margin-top: 2rem;
  text-align: right;
  h4 {
    font-size: 1.4rem;
    font-weight: 700;
  }
  p {
    font-size: 1.4rem;
  }
`;
const Details = styled.div<{ theme: any }>`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: start;
  row-gap: 0rem;
  flex-direction: column;

  /* -moz-column-gap: 0rem; */
  column-gap: 2rem;
  margin-top: 2.5rem;
  margin: 0rem auto;

  padding: 1rem 0;

  span {
    font-size: 1.3rem;
    font-weight: 500;

    color: ${(props) => (props.theme === "light" ? "#777777" : "#a8a8a8")};
    text-align: left;
  }
  span i {
    color: #010103;
  }
  ${media("<=phone")} {
    width: 100%;
    align-self: flex-start;
  }
`;

const CarModelCardDashboard = (props: any) => {
  const { theme }: any = useTheme();
  const { car, patarideCut }: any = props;
  // console.log("urgh", patarideCut);

  const finalPrice = (carPrice: any) => {
    const percentage = parseFloat(patarideCut) / 100;
    const price = parseFloat(carPrice);
    const result = price + price * percentage;
    return result;
  };

  return (
    <Wrapper theme={theme}>
      <Link href={`/rentals/${car.uid}`}>
        <ImageContainer>
          {/* <img src={car.image[0]} alt="car_img" /> */}
          <Swiper
            className="w-[30rem] z-0 md:w-full"
            style={{
              "--swiper": "z-index: 0",
              "--swiper-button-next": "hidden",
              "--swiper-button-prev": "hidden",
              "--swiper-pagination-color": "#FFBA08",
              "--swiper-pagination-bullet-inactive-color": "#b1b1b1",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              // "--swiper-pagination-bullet": "&hover{cursor:pointer} ",
              "--swiper-pagination-bullet-size": "8px",
              "--swiper-pagination-bullet-horizontal-gap": "6px",
              "--swiper-navigation-color": "#FFBA08",
              "--swiper-navigation": "hidden",
              "--swiper-navigation": "z-index: 1000",
              "--swiper-navigation": "&hover{display:block} ",
              "--swiper-scrollbar": "hidden",
            }}
            modules={[Pagination]}
            spaceBetween={200}
            slidesPerView={1}
            centeredSlides
            pagination={{
              clickable: true,
            }}
            navigation={false}
            loop={true}
          >
            {car.image.map((img: any, index: any) => (
              <SwiperSlide key={index}>
                <div className="w-full flex flex-col align-middle items-center">
                  <img key={index} src={img} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Description theme={theme}>
            <PriceContainer>
              <Name>
                <p>{car.name}</p>
              </Name>
            </PriceContainer>
            <Details theme={theme}>
              <span
                className={`flex space-x-2 ${
                  theme === "light" ? "text-green" : "text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <p>{car.make}</p>
              </span>
              <span className="flex space-x-2" style={{ textAlign: "left" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <p>{car.year}</p>
              </span>
              <span className="flex space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
                <p>{`${car.seats} seats`}</p>
              </span>
              <span className="flex space-x-2" style={{ textAlign: "left" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <path d="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M12,13.5V19H6V12H12V13.5M12,10H6V5H12V10M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10Z" />
                </svg>
                <p>{car.fuel}</p>
              </span>
              <span className="flex space-x-2" style={{ textAlign: "left" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <p>{`${car.location.addressLine1}, ${car.location.addressLine2}`}</p>
              </span>

              {car.availability.toString() === "true" ? (
                <div className="mt-8 inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xl font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                  Available
                </div>
              ) : (
                <div className="mt-8 inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xl font-semibold text-red-700 ring-1 ring-inset ring-green-600/20">
                  Not Available
                </div>
              )}

              <Price>
                <h4>{`Ksh${formatNumber(finalPrice(car.price))}`}</h4>
                <p>/per day</p>
              </Price>
            </Details>
            {/* <Button>
            <Link href={`/rentals/${car.uid}`}>Book Ride</Link>

          </Button> */}
          </Description>
        </ImageContainer>
      </Link>
    </Wrapper>
  );
};

export default CarModelCardDashboard;
