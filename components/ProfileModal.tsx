import React, { useState } from "react";
import MailchimpSubscribe, {
  DefaultFormFields,
} from "react-mailchimp-subscribe";
import { EnvVars } from "env";
import useEscClose from "hooks/useEscKey";
import { media } from "utils/media";
import Button from "./Button";
import CloseIcon from "./CloseIcon";
import Container from "./Container";
import Input from "./Input";
import MailSentState from "./MailSentState";
import Overlay from "./Overlay";
import styled from "styled-components";
import HeroButton from "./HeroButton";
import Snackbar from "./Snackbar";
import { set } from "sanity";
import { useTheme } from "next-themes";
import { useAuthContext } from "@/contexts/AuthContext";
import { logout } from "@/utils/firebase/authentication";

export interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { theme }: any = useTheme();
  const [email, setEmail] = useState("");
  const { user }: any = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");

  useEscClose({ onClose });

  return (
    <Overlay>
      <Container>
        <Card theme={theme}>
          <CloseIconContainer theme={theme}>
            <div onClick={onClose}>
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
                ></path>
              </svg>
            </div>
          </CloseIconContainer>
          <>
            {/* <Title theme={theme}>Profile</Title> */}
            <Column theme={theme}>
              <h1>You are logged in</h1>
              <span>
                <p>Full Name</p>
                {user?.fullName}
              </span>
              <span>
                <p>Email</p>
                {user?.email}
              </span>
              {/* <button
                onClick={async () => {
                  setSnackbarMessage("Logging out...");
                  setSnackbarOpen(true);
                  await logout();
                }}
              >
                Log out
              </button> */}
              <SubmitButton
                onClick={async () => {
                  setSnackbarMessage("Logging out...");
                  setSnackbarOpen(true);
                  await logout();
                }}
              >
                Log out
              </SubmitButton>
            </Column>
          </>
        </Card>
      </Container>
      <Snackbar
        message={snackbarMessage}
        isVisible={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      />
    </Overlay>
  );
}

const Card = styled.div<{ theme: any }>`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: auto;
  padding: 10rem 10rem;
  background: ${(props) =>
    props.theme === "light" ? "rgb(251, 251, 253)" : "#17191a"};
  border-radius: 0.6rem;
  max-width: 70rem;
  overflow: hidden;
  color: rgb(10, 18, 30);

  ${media("<=tablet")} {
    padding: 7.5rem 2.5rem;
  }
`;

const CloseIconContainer = styled.div<{ theme: any }>`
  position: absolute;
  right: 2rem;
  top: 2rem;

  svg {
    cursor: pointer;
    width: 2rem;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
`;

const Title = styled.div<{ theme: any }>`
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  font-family: "Inter", sans-serif;

  ${media("<=tablet")} {
    font-size: 2.6rem;
  }
`;
const SubmitButton = styled.button`
  text-decoration: none;
  color: white;
  font-weight: 700;
  background-color: #f8d521;
  padding: 1.5rem 2.5rem;
  border-radius: 0.3rem;
  /* box-shadow: 0 10px 15px 0 rgba(255, 83, 48, 0.25); */
  transition: all 0.3s;
  /* border: 2px solid #bcc8cc; */
  font-size: 1.6rem;
  width: -moz-fit-content;
  width: fit-content;
  cursor: pointer;
  width: 100%;
  transition: ease-in-out 0.3s;
  :hover {
    scale: 1.03;
    transition: ease-in-out 0.3s;
  }
`;

const ErrorMessage = styled.p`
  color: rgb(207, 34, 46);
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
`;

const Column = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 100%;
  margin-top: 3rem;
  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 2rem;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  span {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }
  span p {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${(props) => (props.theme === "light" ? "#010103" : "#fff")};
  }

  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
