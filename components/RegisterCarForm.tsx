import { carMakes } from "../components/CarData";
import HeroPages from "../components/HeroPages";
import { useAuthContext } from "../contexts/AuthContext";
import { addListing } from "../utils/firebase/firestore";
import { uploadListingImage } from "../utils/firebase/storage";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import Snackbar from "../components/Snackbar";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTheme } from "../components/Theme";
import Container from "../components/Container";

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

const RegisterCarForm = ({
  setOpen,
  cancelButtonRef,
}: {
  setOpen: any;
  cancelButtonRef: any;
}) => {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const { theme }: any = useTheme();
  const [carName, setCarName] = React.useState("");
  const [carMake, setCarMake] = React.useState("Toyota");
  const [carModel, setCarModel] = React.useState("");
  const [carYear, setCarYear] = React.useState(2010);
  const [carPrice, setCarPrice] = React.useState(0);
  const [carNumberPlate, setCarNumberPlate] = React.useState("");
  const [carSeats, setCarSeats] = React.useState(5);
  const [carFuel, setCarFuel] = React.useState("Diesel");
  const [carDescription, setCarDescription] = React.useState("");
  const [carImage, setCarImage] = React.useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] =
    React.useState("Default Message");

  // React.useEffect(() => {
  //   if (user === null) {
  //     router.push("/login");
  //   }
  // }, [user]);

  const clearFields = () => {
    setCarName("");
    setCarMake("Toyota");
    setCarModel("");
    setCarYear(2010);
    setCarPrice(0);
    setCarSeats(5);
    setCarFuel("Diesel");
    setCarDescription("");
    setCarImage([]);
  };
  const carNameCheck = () => {
    return carName !== "";
  };
  const carPriceCheck = () => {
    return carPrice !== 0;
  };
  const carNumberPlateCheck = () => {
    return carNumberPlate !== "";
  };
  const carModelCheck = () => {
    return carModel !== "";
  };
  const carMakeCheck = () => {
    return carMake !== "";
  };
  const carSeatsCheck = () => {
    return carSeats > 2;
  };
  const carFuelCheck = () => {
    return carFuel !== "";
  };
  const carDescriptionCheck = () => {
    return carDescription !== "";
  };
  const carImageCheck = () => {
    return carImage.length > 0;
  };

  const registerCar = async () => {
    if (
      carNameCheck() &&
      carPriceCheck() &&
      carModelCheck() &&
      carMakeCheck() &&
      carSeatsCheck() &&
      carFuelCheck() &&
      carDescriptionCheck() &&
      carImageCheck() &&
      carNumberPlateCheck()
    ) {
      console.log("All fields are filled");
      const rentalUid = uuidv4();
      setLoading(true);
      await uploadListingImage(user?.uid, carImage!, rentalUid, {
        carName,
        carPrice,
        carModel,
        carYear,
        carMake,
        carSeats,
        carDescription,
        carFuel,
        carNumberPlate,
      }).then((res) => {
        if (res) {
          setLoading(false);
          setSnackbarMessage(
            "Car registered successfully, Wait for approval before your car is listed"
          );
          setSnackbarOpen(true);
          // clearFields();
        } else {
          setSnackbarMessage("something went wrong");
          setSnackbarOpen(true);
        }
      });
    } else {
      setSnackbarMessage("All fields are not filled");
      setSnackbarOpen(true);
      return;
    }
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
                Name
                {!carNameCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={carName}
                onChange={(e: any) => {
                  setCarName(e.target.value);
                }}
                type="text"
                placeholder="Enter your cars full name"
              ></input>
              <label>
                Number Plate
                {!carNumberPlateCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={carNumberPlate}
                onChange={(e: any) => {
                  setCarNumberPlate(e.target.value);
                }}
                type="text"
                placeholder="Enter your cars number plate"
              ></input>

              <label>
                Price per day
                {!carPriceCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={carPrice}
                onChange={(e: any) => {
                  setCarPrice(e.target.value);
                }}
                type="number"
                placeholder="Enter your rate per day"
              ></input>
              <label>
                Upload images of your car
                {!carImageCheck() ? <b>*</b> : ""}
              </label>
              <input
                type="file"
                // value={carImage}
                accept="image/*"
                onChange={(e: any) => {
                  console.log("car image: ", carImage);
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    // Now you can send this file to your server or read it in the client
                    setCarImage((prev: any) => {
                      return [...prev, file];
                    });
                    console.log(file);
                  }
                }}
              />
              <input
                type="file"
                // value={carImage}
                accept="image/*"
                onChange={(e: any) => {
                  console.log("car image: ", carImage);
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    // Now you can send this file to your server or read it in the client
                    setCarImage((prev: any) => {
                      return [...prev, file];
                    });
                    console.log(file);
                  }
                }}
              />
              <input
                type="file"
                // value={carImage}
                accept="image/*"
                onChange={(e: any) => {
                  console.log("car image: ", carImage);
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    // Now you can send this file to your server or read it in the client
                    setCarImage((prev: any) => {
                      return [...prev, file];
                    });
                    console.log(file);
                  }
                }}
              />
              <input
                type="file"
                // value={carImage}
                accept="image/*"
                onChange={(e: any) => {
                  console.log("car image: ", carImage);
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    // Now you can send this file to your server or read it in the client
                    setCarImage((prev: any) => {
                      return [...prev, file];
                    });
                    console.log(file);
                  }
                }}
              />
              <input
                type="file"
                // value={carImage}
                accept="image/*"
                onChange={(e: any) => {
                  console.log("car image: ", carImage);
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    // Now you can send this file to your server or read it in the client
                    setCarImage((prev: any) => {
                      return [...prev, file];
                    });
                    console.log(file);
                  }
                }}
              />
              <input
                type="file"
                // value={carImage}
                accept="image/*"
                onChange={(e: any) => {
                  console.log("car image: ", carImage);
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    // Now you can send this file to your server or read it in the client
                    setCarImage((prev: any) => {
                      return [...prev, file];
                    });
                    console.log(file);
                  }
                }}
              />
              <label>
                Model
                {!carModelCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={carModel}
                onChange={(e: any) => {
                  setCarModel(e.target.value);
                }}
                type="text"
                placeholder="Enter the model of the car"
              ></input>
              <label>
                Make
                {!carMakeCheck() ? <b>*</b> : ""}
              </label>
              <select
                onChange={(e) => {
                  setCarMake(e.target.value);
                }}
                name="fuelType"
                placeholder="Enter the model of the car"
                value={carMake}
              >
                {carMakes.map((make: any, index: any) => {
                  return (
                    <option key={index} value={make.name}>
                      {make.name}
                    </option>
                  );
                })}
              </select>
              <label>
                Year
                {/* <b>*</b> */}
              </label>
              <input
                onChange={(e: any) => {
                  setCarYear(e.target.value);
                }}
                type="number"
                min="1900"
                max="2099"
                step="1"
                value={carYear}
              />
              <label>
                Number of seats
                {!carSeatsCheck() ? <b>*</b> : ""}
              </label>
              <input
                value={carSeats}
                onChange={(e: any) => {
                  setCarSeats(e.target.value);
                }}
                type="number"
                placeholder="Enter your rate per day"
              ></input>

              <label>
                Fuel
                {!carFuelCheck() ? <b>*</b> : ""}
              </label>
              <select
                onChange={(e) => {
                  setCarFuel(e.target.value);
                }}
                name="fuelType"
                id="fuelType"
              >
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
              </select>

              {/* <label>
                Air <b>*</b>
              </label>
              <input type="number" placeholder="Enter your rate per day"></input> */}

              <label>
                Description
                {!carDescriptionCheck() ? <b>*</b> : ""}
              </label>
              <textarea
                value={carDescription}
                onChange={(e: any) => {
                  setCarDescription(e.target.value);
                }}
                placeholder="Write your description here"
              ></textarea>
              <div className="bg-gray-50 w-full  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  className="mt-3 inline-flex lg:ml-4  w-full justify-center rounded-md bg-[#F8D521] px-3 py-2 text-sm font-semibold text-white shadow-sm  transition-all ease-in-out  hover:scale-105 sm:mt-0 sm:w-auto"
                  onClick={async () => {
                    await registerCar();
                  }}
                >
                  {loading ? "Loading..." : "Register Car"}
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

export default RegisterCarForm;
