import React from "react";
import styled from "styled-components";
import AutofitGrid from "components/AutofitGrid";
import BasicCard from "components/BasicCard";
import Container from "components/Container";
import { media } from "utils/media";
import SectionTitle from "./SectionTitle";
import OverTitle from "./OverTitle";
import {
  faCar,
  faCog,
  faCreditCard,
  faLeaf,
  faLightbulb,
  faMoneyBillWave,
  faShield,
  faShieldAlt,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

const INSTRUCTIONS = [
  {
    imageUrl: "/grid-icons/integrity_icon.png",
    icon: faUsers,
    title: "Multi Support",
    description:
      "You will be in direct contact with our support team to guide you through the account opening process. You need to have a registered business/company and road-worthy vehicles meeting our minimum requirements - not older than 5 years, 2000cc, comprehensive insurance cover, and fully loaded.",
  },
  {
    imageUrl: "/grid-icons/diversity_icon.png",
    icon: faMoneyBillWave,
    title: "Flexible Daily Rates",
    description:
      "You will set your desired daily rates and specify other details such as availability for out-of-town drives. You will be able to view amounts due for payment and request your payments as frequently as you wish",
  },
  {
    imageUrl: "/grid-icons/adaptability.png",
    icon: faCreditCard,
    title: "Payment Management",
    description:
      "You will be able to generate statements, view vehicle hire history, and review your daily rates, as you wish. A commission will be retained by Pata Ride as stipulated in our company policy",
  },
  {
    imageUrl: "/grid-icons/innovation.png",
    icon: faCar,
    title: "Vehicle Dispatch & Management",
    description:
      "The target clients will be shown vehicles within their geographical radius (5 Km) to make delivery and collection of the vehicle practical, affordable, and timely.",
  },

  {
    imageUrl: "/grid-icons/meditation.png",
    icon: faUserFriends,
    title: "Other Hosts' Profiles",
    description:
      "The car-sharing marketplace is made up of cars offered by a variety of other hosts, both Companies and individuals. Now, you can peek inside their seller profiles and look at the car collections by other hosts.",
  },
];

export default function InstructionsGrid() {
  const { theme }: any = useTheme();
  return (
    <Wrapper theme={theme}>
      <Content>
        {/* <OverTitle>Core values</OverTitle> */}
        <Title theme={theme}>
          Here are some great features of our Car-sharing Marketplace
        </Title>
      </Content>
      <Container>
        <CustomAutofitGrid>
          {INSTRUCTIONS.map((singleFeature, idx) => (
            <BasicCard
              useImage={false}
              istransparent={false}
              FaIcon={singleFeature.icon}
              key={singleFeature.title}
              {...singleFeature}
            />
          ))}
        </CustomAutofitGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ theme?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
  /* background-color: black; */
  ${(props) => (props.theme !== "light" ? "background-color: black;" : "")}
`;
const Content = styled.div`
  margin-top: 1rem;
  margin-bottom: 5rem;
  text-align: center;
`;
const Title = styled.div<{ theme?: string }>`
  ${(props) => (props.theme === "light" ? "color: black;" : "color: white;")}
  font-family: "Inter", sans-serif;
  font-size: 5.2rem;
  /* font-weight: bold; */
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  /* padding: 3rem auto; */

  ${media("<tablet")} {
    font-size: 3rem;
  }
`;
const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;
  margin: 0 auto;
  padding: 0 5rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--autofit-grid-item-size), 1fr)
  );
  ${media("<=tablet")} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  ${media("<tablet")} {
    padding: 0 0;
    margin: 0 0;
  }

  justify-items: center; /* Horizontally center-align grid items */
  align-content: center; /* Vertically center-align grid items */

  /* Center the last item */
  & > *:last-child {
    grid-column: span 2;
    padding: 3rem 15rem;
    ${media("<=tablet")} {
      padding: 0 1.5rem;
      grid-column: span 1;
    }
  }
`;
