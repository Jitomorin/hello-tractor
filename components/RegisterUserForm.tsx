import { carMakes } from "./CarData";
import HeroPages from "./HeroPages";
import { useAuthContext } from "../contexts/AuthContext";
import { addListing, addUser } from "../utils/firebase/firestore";
import { uploadListingImage } from "../utils/firebase/storage";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import Snackbar from "./Snackbar";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTheme } from "next-themes";
import Container from "./Container";
import { logout, signup } from "@/utils/firebase/authentication";
import { firebaseAuthErrors } from "@/utils/firebase/config";

const Wrapper = styled.section<{ theme: any }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "#050505"};
`;
const EnlistForm = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  padding-bottom: 5rem;
  margin: 0 0;
  form {
    display: flex;
    flex-direction: column;
  }
  form label {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
  }
  form label b {
    color: #f8d521;
  }
  form input {
    background-color: ${(props) =>
      props.theme === "light" ? "#f2f2f2" : "#272a2c"};
    color: ${(props) => (props.theme === "light" ? "#272a2c" : "#fff")};
    padding: 19px 30px 19px 30px;
    border-radius: 10px;
    font-size: 1.2rem;
    border: none;
    outline: none;
    margin-bottom: 2.3rem;
  }
  form select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: ${(props) =>
      props.theme === "light" ? "#f2f2f2" : "#272a2c"};
    color: ${(props) => (props.theme === "light" ? "#6E747C" : "#6E747C")};
    padding: 19px 30px 19px 30px;
    border-radius: 10px;
    font-size: 1.2rem;
    border: none;
    outline: none;
    margin-bottom: 2.3rem;
  }
  form textarea {
    background-color: ${(props) =>
      props.theme === "light" ? "#f2f2f2" : "#272a2c"};
    border-radius: 10px;
    height: 18rem;
    padding: 19px 30px 19px 30px;
    font-size: 1.2rem;
    border: none;
    outline: none;
    margin-bottom: 2.5rem;
    color: ${(props) => (props.theme === "light" ? "#272a2c" : "#fff")};
  }

  form button:hover {
    scale: 1.02;
  } /*# sourceMappingURL=styles.css.map */
  @media (max-width: 768px) {
    margin: 0 2rem;
  }
`;

const RegisterUserForm = ({
  setOpen,
  cancelButtonRef,
}: {
  setOpen: any;
  cancelButtonRef: any;
}) => {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const { theme }: any = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] =
    React.useState("Default Message");

  // React.useEffect(() => {
  //   if (user === null) {
  //     router.push("/login");
  //   }
  // }, [user]);

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
  const confirmPasswordCheck = () => {
    return password === confirmPassword;
  };
  const fullNameCheck = () => {
    return fullName !== "";
  };

  const isFormValid = () => {
    if (
      emailCheck() &&
      passwordCheck() &&
      confirmPasswordCheck() &&
      fullNameCheck()
    ) {
      console.log("true");
      return true;
    }

    console.log("false");
    return false;
  };

  const createUser = (email: string, password: string, fullName: string) => {
    setLoading(true);
    // run an error check in the fields
    if (!isFormValid()) {
      setSnackbarMessage("Please fill in all fields correctly");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    } else {
      signup(email, password)
        .then((userCredential: any) => {
          if (!userCredential) {
            console.log("error:", userCredential);
            setSnackbarMessage("Error creating account");
            setSnackbarOpen(true);
          } else {
            setSnackbarMessage("Redirecting to login page");
            setSnackbarOpen(true);
            const uid = userCredential.user?.uid;
            addUser({
              uid,
              email,
              fullName,
              role: "client",
              bio: "",
              profileUrl: "",
              phoneNumber,
            }).then((res: any) => {
              setSnackbarMessage("User created successfully");
            });
          }
        })
        .catch((error) => {
          console.log("error:", error.code);
          firebaseAuthErrors
            .filter((doc: any) => doc?.code === error.code)
            .map((doc: any) => {
              setSnackbarMessage(doc?.message);
              setSnackbarOpen(true);
            });
        });
    }
    // signup function

    setLoading(false);
  };

  return (
    <>
      <Wrapper theme={"light"}>
        {/* <HeroPages name="Cars" /> */}
        <div>
          <EnlistForm theme={theme}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Your form submission logic here
              }}
            >
              <label>
                Email
                {!emailCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter the user's email"
              ></input>
              <label>
                Full Name
                {!fullNameCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={fullName}
                onChange={(e: any) => {
                  setFullName(e.target.value);
                }}
                type="text"
                placeholder="Enter your user's full name"
              ></input>
              <label>
                Phone Number
                {!fullNameCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={fullName}
                onChange={(e: any) => {
                  setPhoneNumber(e.target.value);
                }}
                type="number"
                placeholder="Enter your user's phone number"
              ></input>

              <label>
                Password
                {!passwordCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter your user's password"
              ></input>
              {passwordCheck() ? (
                <></>
              ) : (
                <span
                  style={{ fontSize: "10px", marginTop: "0rem", color: "red" }}
                >
                  Password must contain at least 6 characters 1 uppercase letter
                  and 1 number
                </span>
              )}

              <label>
                Confirm Password {!confirmPasswordCheck() ? <b>*</b> : ""}
                {confirmPasswordCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={confirmPassword}
                onChange={(e: any) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                placeholder="Confirm the user's password"
              ></input>

              <div className="bg-gray-50 w-full  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => {
                    createUser(email, password, fullName);
                  }}
                  className="mt-3 inline-flex lg:ml-4  w-full justify-center rounded-md bg-[#F8D521] px-3 py-2 text-sm font-semibold text-white shadow-sm  transition-all ease-in-out  hover:scale-105 sm:mt-0 sm:w-auto"
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all ease-in-out ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>

              {/* <button
                className="save-button"
                onClick={() => {
                  registerCar();
                }}
              >
                {loading ? "Loading..." : "Register Car"}
              </button> */}
            </form>
          </EnlistForm>
        </div>
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
};

export default RegisterUserForm;
