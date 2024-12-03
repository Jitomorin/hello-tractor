import Instructions from "@/components/Instructions";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Navbar from "../components/Navbar";
import InstructionsGrid from "@/components/InstructionsGrid";
import HeroButton from "@/components/HeroButton";
import Button from "../components/Button";
import styled from "styled-components";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#050505"};
`;

function Seller() {
  const { user }: any = useAuthContext();
  const { theme }: any = useTheme();
  return (
    <>
      {/* <Navbar /> */}
      <Wrapper theme={theme}>
        <HeroPages subRoute={false} name="Host" />
        {/* <div className="container"></div> */}
        <Instructions />
        <InstructionsGrid />
        {/* <ButtonWrapper>
          {user != null ? (
            <>
              {user.role === "client" ? (
                <HeroButton name={"Request to become a host"} link="/register-car" />
              ) : (
                <HeroButton name={"Enlist your car"} link="/register-car" />
              )}
            </>
          ) : (
            <></>
          )}
        </ButtonWrapper> */}
      </Wrapper>
    </>
  );
}

export default Seller;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
`;
