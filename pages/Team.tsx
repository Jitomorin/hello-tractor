import Container from "@/components/Container";
import { useTheme } from "next-themes";
import { getAllEmployees, getClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Employee } from "@/sanity/lib/queries";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FacebookIcon, LinkedinIcon } from "react-share";
import styled from "styled-components";
import NextImage from "next/image";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#050505"};
`;
const Header = styled.section<{ theme: any }>`
  margin: 4rem auto;
  padding: 0 auto;
  text-align: center;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  font-family: "Inter", sans-serif;
  font-size: 5rem;
  /* border-bottom: #f8d521 5px solid; */
  position: relative;
  width: auto;
  ::after {
    content: "";
    position: absolute;
    top: 95%;
    width: 50%;
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
const TeamContainer = styled.section<{ theme: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 4rem;
  align-items: center;
  justify-items: center;
  text-align: center;
  padding: 10rem 2rem;
  width: 110rem;
  margin: 0 auto;
  @media (max-width: 1150px) {
    grid-template-columns: 1fr 1fr;
    width: -moz-fit-content;
    width: fit-content;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: -moz-fit-content;
    width: fit-content;
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    width: -moz-fit-content;
    width: fit-content;
  }
`;
const Box = styled.div<{ theme: any }>`
  width: 33rem;
  // border: 1px solid #d5d5d5;
  img {
    transition: ease-in-out 0.3s;
  }
  h3 {
    transition: ease-in-out 0.3s;
  }
  p {
    transition: ease-in-out 0.6s;
  }
  &:hover {
    img {
      scale: 1.02;
    }
    h3 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.8rem;
      font-weight: 500;
      color: #777777;
    }
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  img {
    width: 20rem;
    height: 20rem;
    border-radius: 100%;
    // height: 100%;
  }
`;
const Description = styled.div<{ theme: any }>`
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  padding: 3rem;
  h3 {
    font-size: 2.2rem;
  }
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: #777777;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  div a {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease-in-out 0.3s;
    &:hover {
      scale: 1.1;
    }
    height: 3rem;
    width: 3rem;
  }
  img {
    padding: 0;
  }
`;

function Team() {
  const { theme }: any = useTheme();
  const [employeesList, setEmployeesList] = useState<Employee[]>([]);
  const teamPpl = [
    { img: "/images/team/1.png", name: "James Brian", job: "Marketing Head" },
    { img: "/images/team/2.png", name: "Diaz Lopez", job: "CEO" },
    { img: "/images/team/3.png", name: "Dwayne Johnson", job: "Developer" },
    {
      img: "/images/team/4.png",
      name: "Will Smith Rivera",
      job: "HR Consultant",
    },
    { img: "/images/team/5.png", name: "Martin Lawrence", job: "CEO" },
  ];

  useEffect(() => {
    const client = getClient();
    const fetchEmployees = async () => {
      const employees = await getAllEmployees(client);
      console.log("employees: ", employees);
      setEmployeesList(employees);
    };
    fetchEmployees();
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <Wrapper theme={theme}>
        {/* <HeroPages name="Our Team" /> */}
        <Container>
          <Header theme={theme}>Come meet our Team</Header>
          <TeamContainer>
            {employeesList.map((ppl: any, id) => (
              <Box theme={theme} key={id}>
                <ImageContainer theme={theme}>
                  <img
                    src={urlForImage(ppl.image?.asset?._ref).url()}
                    alt="team_img"
                  />
                </ImageContainer>
                <Description theme={theme}>
                  <h3>{ppl.fullName}</h3>
                  <p>{ppl.position}</p>
                  <div>
                    {ppl.linkedin && (
                      <Link target="_blank" href={ppl.linkedin}>
                        <LinkedinIcon size={23} round={true} />
                      </Link>
                    )}
                    {ppl.facebook && (
                      <Link target="_blank" href={ppl.facebook}>
                        <FacebookIcon size={23} round={true} />
                      </Link>
                    )}
                    {ppl.instagram && (
                      <Link target="_blank" href={ppl.instagram}>
                        <NextImage
                          src="/instagram_logo.webp"
                          alt="instagram"
                          width={100}
                          height={100}
                        />
                      </Link>
                    )}
                  </div>
                </Description>
              </Box>
            ))}
          </TeamContainer>
        </Container>

        {/* <Footer /> */}
      </Wrapper>
    </>
  );
}

export default Team;
