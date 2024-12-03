import { useEffect, useState } from "react";
import CarBox from "./CarBox";
import { CAR_DATA } from "./CarData";
import styled from "styled-components";
import Container from "./Container";
import { getAllTopCars, getClient } from "@/sanity/lib/client";
import { getRentalsBasedOnRating } from "@/utils/firebase/firestore";
import { useTheme } from "next-themes";

const Wrapper = styled.section<{ theme: any }>`
  padding: 10rem 0;
  background-color: ${(props) =>
    props.theme === "light" ? "#f8f8f8" : "#000"};
`;
const PickContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div<{ theme: any }>`
  margin: 0 auto;
  text-align: center;
  color: #010103;
  max-width: 50rem;
  margin-bottom: 5rem;
  p {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    color: #706f7b;
    line-height: 1.5;
  }
  h3 {
    font-size: 2.4rem;
    font-family: "Inter", sans-serif;
    font-weight: 500;
  }
  h2 {
    font-size: 4.2rem;
    font-family: "Inter", sans-serif;
    margin: 0.5rem 0 1rem 0;
    color: ${(props) => (props.theme !== "light" ? "#fff" : "#010103")};
  }
`;
const CarContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: 5rem;
  }
`;

const PickBox = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
const PickBoxButton = styled.button<{ theme: any; active: boolean }>`
  font-size: 2rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  padding: 1.5rem 2.5rem;
  background-color: ${(props) =>
    props.theme === "light" ? "##f8f8f8" : "#000"};
  background-color: ${(props) => (!props.active ? "#F8D521" : "")};
  color: ${(props) =>
    props.theme === "light"
      ? (props) => (!props.active ? "#fff" : "#000")
      : (props) => (!props.active ? "#fff" : "#fff")};
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background-color: ${(props) =>
      !props.active
        ? ""
        : (props) => (props.theme === "light" ? "#E0E0E0" : "#414141")};
    color: white;
  }
`;

function PickCar() {
  const [active, setActive] = useState("");
  const [colorBtn, setColorBtn] = useState("");
  const [topCarList, setTopCarList]: any = useState([]);
  const { theme }: any = useTheme();

  const btnID = (id: any) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id: any) => {
    return colorBtn !== id;
  };
  const isActive = (uid: string) => {
    if (active !== uid) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const client = getClient();
    const fetchCars = async () => {
      getRentalsBasedOnRating().then((res: any) => {
        setTopCarList(res.slice(0, 5));
        setActive(res[0].uid);
        coloringButton(res[0].uid);
      });
      // const cars: any = await getAllTopCars(client);
      // console.log("cars: ", cars);
    };
    fetchCars();
  }, []);

  return (
    <>
      <Wrapper theme={theme}>
        <Container>
          <PickContainer>
            <TitleContainer theme={theme}>
              {/* <h3>Vehicle Models</h3> */}
              <h2>Our top hires</h2>
              <p>
                Choose from our top car models and book your ride in a few easy
                steps
              </p>
            </TitleContainer>
            <CarContent>
              {/* pick car */}
              <PickBox theme={theme}>
                {topCarList.map((car: any, id: any) => (
                  <PickBoxButton
                    theme={theme}
                    active={isActive(car.uid)}
                    // className={`${coloringButton("btn1")}`}
                    onClick={() => {
                      setActive(car.uid);
                      btnID(car.uid);
                    }}
                  >
                    {car.name}
                  </PickBoxButton>
                ))}
                {/* <PickBoxButton
                  theme={theme}
                  active={coloringButton("btn2")}
                  id="btn2"
                  onClick={() => {
                    setActive("FirstCar");
                    btnID("btn2");
                  }}
                >
                  VW Golf 6
                </PickBoxButton>
                <PickBoxButton
                  theme={theme}
                  active={coloringButton("btn3")}
                  id="btn3"
                  onClick={() => {
                    setActive("ThirdCar");
                    btnID("btn3");
                  }}
                >
                  Toyota Camry
                </PickBoxButton>
                <PickBoxButton
                  theme={theme}
                  active={coloringButton("btn4")}
                  id="btn4"
                  onClick={() => {
                    setActive("FourthCar");
                    btnID("btn4");
                  }}
                >
                  BMW 320 ModernLine
                </PickBoxButton>
                <PickBoxButton
                  theme={theme}
                  active={coloringButton("btn5")}
                  id="btn5"
                  onClick={() => {
                    setActive("FifthCar");
                    btnID("btn5");
                  }}
                >
                  Mercedes-Benz GLK
                </PickBoxButton>
                <PickBoxButton
                  theme={theme}
                  active={coloringButton("btn6")}
                  id="btn6"
                  onClick={() => {
                    setActive("SixthCar");
                    btnID("btn6");
                  }}
                >
                  VW Passat CC
                </PickBoxButton> */}
              </PickBox>
              {topCarList
                .filter((doc: any) => doc?.uid === active)
                .map((car: any, id: any) => (
                  <CarBox theme={theme} car={car} carID={id} />
                ))}
              {/* {active === "FirstCar" && (
                <CarBox theme={theme} data={CAR_DATA} carID={0} />
              )}
              {active === "SecondCar" && (
                <CarBox theme={theme} data={CAR_DATA} carID={1} />
              )}
              {active === "ThirdCar" && (
                <CarBox theme={theme} data={CAR_DATA} carID={2} />
              )}
              {active === "FourthCar" && (
                <CarBox theme={theme} data={CAR_DATA} carID={3} />
              )}
              {active === "FifthCar" && (
                <CarBox theme={theme} data={CAR_DATA} carID={4} />
              )}
              {active === "SixthCar" && (
                <CarBox theme={theme} data={CAR_DATA} carID={5} />
              )} */}
            </CarContent>
          </PickContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default PickCar;
