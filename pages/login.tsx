import AuthButton from "../components/AuthButton";
import InputField from "../components/InputField";
import Logo from "../images/logo/PlowMart.png";
import GoogleIcon from "../images/logo/google_icon.png";
import FacebookIcon from "../images/logo/facebook_icon.png";
import XIcon from "../images/logo/twitter_icon.png";
import Appleicon from "../images/logo/apple_icon.png";
import OrDivider from "../components/OrDivider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { login, logout } from "@/utils/firebase/authentication";
import Snackbar from "@/components/Snackbar";
import { useTheme } from "next-themes";
import styled from "styled-components";
import { auth, firebaseAuthErrors } from "@/utils/firebase/config";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { Spinner } from "@nextui-org/react";
import ResetPasswordModal from "@/components/ResetPasswordModal";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#17191a"};
`;
const SignupContainer = styled.div<{ theme: any }>`
  height: 120vh;
  /* width: 100vw; */
  background-image: url("/images/signup/authentication_wallpaper.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50rem 0;
  @media (max-width: 768px) {
    padding: 80rem 0;
  }
`;
const Box = styled.div<{ theme: any }>`
  background: rgba(255, 255, 255, 1);
  /* border-radius: 15px; */
  width: 40.486%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 47px;
  img {
    width: 185px;
    /* height: 80px; */
  }
  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 38px;
    /* font-weight: bold; */
  }
  @media (max-width: 1030px) {
    width: 90%;
  }
`;
const InputContainer = styled.div<{ theme: any }>`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  width: 100%;
  span {
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: 700;
  }
  input {
    background-color: #f7f7f7;
    padding: 19px 30px 19px 30px;
    /* border-radius: 10px; */
    font-size: 1.6rem;
    border: none;
    outline: none;
    /* margin-bottom: 2.3rem; */
    color: #6e747c;
    :focus {
      border: none;
      outline: none;
      --tw-ring-color: none;
    }
  }
`;
const ButtonContainer = styled.div<{ theme: any }>`
  margin-top: 70px;
  width: 100%;
`;
const AuthLink = styled.div<{ theme: any }>`
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  color: #000;
  text-decoration: none;
  display: flex;
  transition: ease-in-out 0.3s;
  p {
    margin-right: 2px;
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
  a {
    color: #1c4d9c;
    font-weight: bold;
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
  a:hover {
    scale: 1.03;
    transition: ease-in-out 0.3s;
  }
  span {
    color: #1c4d9c;
    font-weight: bold;
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
  span:hover {
    scale: 1.03;
    transition: ease-in-out 0.3s;
  }
`;
const AltSigninContianer = styled.div<{ theme: any }>`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    div {
      margin-bottom: 1rem;
      margin-left: 5rem;
      margin-right: 5rem;
    }
  }
  div {
    background-color: white;
    border-radius: 10px;
    border: 0.5px solid #d1cece;
    /* height: auto; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  button:hover {
    scale: 1.05;
  }
`;

function LogIn() {
  const { user }: any = useAuthContext();
  const { theme }: any = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");

  const emailCheck = () => {
    return (
      email !== "" &&
      email.includes("@") &&
      email.includes("@") &&
      (email.includes(".com") ||
        email.includes(".edu") ||
        email.includes(".net") ||
        email.includes(".org") ||
        email.includes(".gov") ||
        email.includes(".co") ||
        email.includes(".io") ||
        email.includes(".ai"))
    );
  };
  const passwordCheck = () => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-z]/i.test(password);
    return password.length >= 6 && hasUpperCase && hasNumber && hasLetter;
  };
  const refreshPage = () => {
    router.reload();
  };

  const isFormValid = () => {
    if (!emailCheck() && !passwordCheck()) {
      return false;
    }

    return true;
  };

  const loginUser = () => {
    // run an error check in the fields

    if (!isFormValid()) {
      setSnackbarMessage("Please fill in all fields correctly");
      setSnackbarOpen(true);
      return;
    } else {
      if (user != null) {
        setSnackbarMessage("You are already logged in");
        setSnackbarOpen(true);
      } else {
        setLoading(true);
        login(email, password)
          .then((userCredential: any) => {
            if (userCredential) {
              if (userCredential.user.emailVerified) {
                const user = userCredential.user;
                console.log(user);
                router.push("/");
                return;
              } else {
                setLoading(false);
                setSnackbarMessage("Please verify your email to login");
                setSnackbarOpen(true);
                logout().then(() => {
                  refreshPage();
                });
              }
            } else {
              // console.log("error:", userCredential);
              // setSnackbarMessage("Error logging in");
              // setSnackbarOpen(true);
            }
          })
          .catch((error) => {
            console.log("error:", error.code);
            firebaseAuthErrors
              .filter((doc) => doc?.code === error.code)
              .map((doc) => {
                setLoading(false);
                setSnackbarMessage(doc?.message);
                setSnackbarOpen(true);
              });
          });
      }
    }
  };

  useEffect(() => {
    // wait 5 seconds
    // setTimeout(() => {
    //   console.log("5 seconds have passed");
    // }, 5000);

    if (user != null) router.push("/");
  }, [user]);

  return (
    <>
      {/* <Navbar /> */}
      <Wrapper theme={theme}>
        {/* <HeroPages name="Vehicle Models" /> */}
        <SignupContainer>
          <Box theme={theme}>
            <Link href="/">
              <img
                src={"../images/logo/PlowMart.png"}
                alt="logo"
                className=""
              />
            </Link>

            <h1>Welcome back</h1>
            <InputContainer theme={theme}>
              <div style={{ display: "flex" }}>
                <span>Email</span>
                {
                  <span style={{ marginLeft: "1px", color: "red" }}>
                    {emailCheck() ? "" : "*"}
                  </span>
                }
              </div>
              <InputField
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
              />
            </InputContainer>

            <InputContainer theme={theme}>
              <div style={{ display: "flex" }}>
                <span>Password</span>
                <span style={{ marginLeft: "1px", color: "red" }}>
                  {passwordCheck() ? "" : "*"}
                </span>
              </div>
              <InputField
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your full password"
                type="password"
              />
            </InputContainer>
            <AuthLink theme={theme}>
              <p>Forgotten password?</p>
              <span>
                <ResetPasswordModal
                  callSnackbar={(mes: string) => {
                    setSnackbarMessage(mes);
                    setSnackbarOpen(true);
                  }}
                />
              </span>
            </AuthLink>

            <ButtonContainer theme={theme}>
              {loading ? (
                <AuthButton>
                  <Spinner color="white" />
                </AuthButton>
              ) : (
                <AuthButton
                  onClick={() => {
                    loginUser();
                  }}
                >
                  Continue
                </AuthButton>
              )}
            </ButtonContainer>

            <AuthLink theme={theme}>
              <p>Don't have an account?</p>
              <Link href="/signup">Sign up</Link>
            </AuthLink>
            {/* <OrDivider />
            <AltSigninContianer theme={theme}>
              <div>
                <button
                  onClick={() => {
                    setSnackbarMessage("Feature not available yet");
                    setSnackbarOpen(true);
                  }}
                >
                  <img
                    src={"../images/logo/google_icon.png"}
                    alt="google-icon"
                  />
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSnackbarMessage("Feature not available yet");
                    setSnackbarOpen(true);
                  }}
                >
                  <img
                    src={"../images/logo/facebook_icon.png"}
                    alt="facebook-icon"
                  />
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSnackbarMessage("Feature not available yet");
                    setSnackbarOpen(true);
                  }}
                >
                  <img src={"../images/logo/twitter_icon.png"} alt="X-icon" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSnackbarMessage("Feature not available yet");
                    setSnackbarOpen(true);
                  }}
                >
                  <img src={"../images/logo/apple_icon.png"} alt="apple-icon" />
                </button>
              </div>
            </AltSigninContianer> */}
          </Box>
        </SignupContainer>
        <Snackbar
          message={snackbarMessage}
          isVisible={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        />
      </Wrapper>
    </>
  );
}

export default LogIn;
