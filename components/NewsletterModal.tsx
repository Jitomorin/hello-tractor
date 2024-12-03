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

export interface NewsletterModalProps {
  onClose: () => void;
}

export default function NewsletterModal({ onClose }: NewsletterModalProps) {
  const { theme }: any = useTheme();
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");

  useEscClose({ onClose });

  function onSubmit(
    event: React.FormEvent<HTMLFormElement>,
    enrollNewsletter: (props: DefaultFormFields) => void
  ) {
    event.preventDefault();
    console.log({ email });
    if (email) {
      enrollNewsletter({ EMAIL: email });
      setSnackbarMessage("Thanks for subscribing!");
    }
  }

  return (
    <MailchimpSubscribe
      url={EnvVars.MAILCHIMP_SUBSCRIBE_URL}
      render={({ subscribe, status, message }: any) => {
        const hasSignedUp = status === "success";
        return (
          <Overlay>
            <Container>
              <Card
                theme={theme}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                  onSubmit(event, subscribe)
                }
              >
                <CloseIconContainer theme={theme}>
                  <CloseIcon onClick={onClose} />
                </CloseIconContainer>
                {hasSignedUp && <MailSentState />}
                {!hasSignedUp && (
                  <>
                    <Title theme={theme}>Subscribe to our newsletter?</Title>
                    <Column>
                      <CustomInput
                        theme={theme}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        placeholder="Enter your email..."
                        name="EMAIL"
                        required
                      />
                      <AnimatedButton
                        name="Subscribe"
                        as="button"
                        type="submit"
                        disabled={hasSignedUp}
                      >
                        Submit
                      </AnimatedButton>
                    </Column>
                    {message && (
                      <ErrorMessage
                        dangerouslySetInnerHTML={{ __html: message as string }}
                      />
                    )}
                  </>
                )}
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
      }}
    />
  );
}

const Card = styled.form<{ theme: any }>`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: auto;
  padding: 10rem 5rem;
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

const ErrorMessage = styled.p`
  color: rgb(207, 34, 46);
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 3rem;

  ${media("<=tablet")} {
    flex-direction: column;
  }
`;

const CustomButton = styled(Button)`
  height: 100%;
  padding: 1.8rem;
  margin-left: 1.5rem;
  box-shadow: var(--shadow-lg);

  ${media("<=tablet")} {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
  }
`;
const AnimatedButton = styled.div<{ theme: any }>`
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

const CustomInput = styled(Input)<{ theme: any }>`
  width: 60%;
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.theme === "light" ? "#f2f2f2" : "#272a2c"};
  color: ${(props) => (props.theme === "light" ? "" : "#fff")};

  ${media("<=tablet")} {
    width: 100%;
  }
`;
