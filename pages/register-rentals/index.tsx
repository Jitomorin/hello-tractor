import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DeliveriesTable from "@/components/BookingsTable";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getFilteredData } from "@/utils/firebase/firestore";
import RegisterCarForm from "@/components/RegisterCarForm";
import { v4 as uuidv4 } from "uuid";
import { uploadListingImage } from "@/utils/firebase/storage";
import { useRouter } from "next/router";
import styled from "styled-components";
import { carCategories, carMakes } from "@/components/CarData";
import { media } from "@/utils/media";
import { useTheme } from "next-themes";
import { Spinner } from "@nextui-org/react";
import Snackbar from "@/components/Snackbar";

const EnlistForm = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
  margin: 0 0;
  border-radius: 6px;
  width: 100%;
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0 auto;
  }

  form label b {
    color: #f8d521;
  }
  form label {
    /* if not the first label */
    margin-top: 1rem;
  }
  form textarea {
    /* if not the first label */
    margin-bottom: 1rem;
  }
  /* form input {
    background-color: ${(props: any) =>
    props.theme !== "light" ? "#fff" : "#272a2c"};
    color: ${(props: any) => (props.theme !== "light" ? "#272a2c" : "#fff")};
    padding: 19px 30px 19px 30px;
    border-radius: 10px;
    font-size: 1.2rem;
    border: 1px solid #000;
    outline: none;
    margin-bottom: 2.3rem;
    :focus {
      --tw-ring-color: none;
      border: 1px solid #000;
      outline: none;
    }
  } */

  form button:hover {
    scale: 1.02;
  } /*# sourceMappingURL=styles.css.map */
  @media (max-width: 768px) {
    margin: 0 2rem;
  }
`;

function RegisterRental() {
  const { user }: any = useAuthContext();
  const { theme } = useTheme();
  const router = useRouter();
  const [carName, setCarName] = React.useState("");
  const [carMake, setCarMake] = React.useState("Toyata");
  const [category, setCategory] = React.useState("Excecutives");
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
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

  React.useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

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
    setAddressLine1("");
    setAddressLine2("");
  };
  const addressLine1Check = () => {
    return addressLine1 !== "";
  };
  const addressLine2Check = () => {
    return addressLine2 !== "";
  };
  const categoryCheck = () => {
    return category !== "";
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
      carNumberPlateCheck() &&
      categoryCheck()
    ) {
      // console.log("All fields are filled");
      const rentalUid = uuidv4();
      setLoading(true);
      console.log("ohhhh", [
        carName,
        carPrice,
        carModel,
        carYear,
        carMake,
        carSeats,
        carDescription,
        carFuel,
        carNumberPlate,
        addressLine1,
        addressLine2,
        category,
      ]);
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
        addressLine1,
        addressLine2,
        category,
      }).then((res: any) => {
        console.log(res);
        setSnackbarMessage("heee");
        setSnackbarOpen(true);
        if (res) {
          setLoading(false);
          setSnackbarMessage(
            "Car registered successfully, Wait for approval before your car is listed"
          );
          setSnackbarOpen(true);
          router.push("/rentals");
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
    <div className="mt-40 w-screen h-full">
      <div className="flex min-h-full flex-1">
        <div
          className={`flex flex-1 flex-col justify-center py-12 px-10 lg:px-20 lg:flex-none ${
            theme === "light" ? "bg-white" : "bg-white"
          } rounded-md shadow-md lg:w-1/2`}
        >
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register your rental
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Once approved your rental will be listed on the platform
            </p>
          </div>

          <EnlistForm>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label>
                Name
                {!carNameCheck() ? <b>*</b> : ""}
              </label>
              <input
                className=" block w-full lg:text-lg  rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className={`block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ${
                  theme === "light"
                    ? "ring-gray-300 placeholder:text-gray-400"
                    : ""
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6`}
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
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0  py-2 mb-2 px-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0  py-2 mb-2 px-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0 py-2 mb-2 px-1  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0 py-2 mb-2 px-1  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0 py-2 mb-2 px-1  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0  py-2 mb-2 px-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                onChange={(e) => {
                  setCarMake(e.target.value);
                }}
                name="make"
                placeholder="Select the make of the car"
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
                Category
                {!categoryCheck() ? <b>*</b> : ""}
              </label>
              <select
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log("category: ", e.target.value);
                }}
                name="category"
                placeholder="Select the category of the car"
                value={category}
              >
                {carCategories.map((category: any, index: any) => {
                  return (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <label>
                Year
                {/* <b>*</b> */}
              </label>
              <input
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
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
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                value={carDescription}
                onChange={(e: any) => {
                  setCarDescription(e.target.value);
                }}
                placeholder="Write your description here"
              ></textarea>
              <label>
                Address line 1{!addressLine1Check() ? <b>*</b> : ""}
              </label>
              <input
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                value={addressLine1}
                onChange={(e: any) => {
                  setAddressLine1(e.target.value);
                }}
                type="text"
                placeholder="Enter your cars address 1"
              ></input>
              <label>
                Address line 2{!addressLine2Check() ? <b>*</b> : ""}
              </label>
              <input
                className="  block w-full lg:text-lg  rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                value={addressLine2}
                onChange={(e: any) => {
                  setAddressLine2(e.target.value);
                }}
                type="text"
                placeholder="Enter your cars address 2"
              ></input>

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
          {loading ? (
            <button className="mt-10 inline-flex w-full text-lg justify-center rounded-md bg-[#F8D521] px-3 py-2  font-semibold text-white shadow-sm  transition-all ease-in-out  hover:scale-105 sm:mt-0 sm:w-auto">
              <Spinner color="white" />
            </button>
          ) : (
            <button
              className="mt-10 inline-flex w-full text-lg justify-center rounded-md bg-[#F8D521] px-3 py-2  font-semibold text-white shadow-sm  transition-all ease-in-out  hover:scale-105 sm:mt-0 sm:w-auto"
              onClick={async () => {
                await registerCar();
              }}
            >
              {"Register Car"}
            </button>
          )}
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/banners/merc.jpg"
            alt=""
          />
        </div>
      </div>
      <Snackbar
        message={snackbarMessage}
        isVisible={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      />
    </div>
  );
}

export default RegisterRental;
