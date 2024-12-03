import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CartColumn from "@/components/CartColumn";
import Divider from "@/components/Divider";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductOverview from "@/components/ProductOverview";
import Snackbar from "@/components/Snackbar";
import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  addDataWithDocName,
  deleteDocument,
  getAllRentalSlugs,
  getDocument,
  getFilteredData,
  setPickupAndDropoffLocations,
  setProductStatus,
  setRentalAvailability,
  updateBookingInformation,
  updateOrderStatus,
  updateOrderTransaction,
} from "@/utils/firebase/firestore";
import Axios from "axios";
import { uploadCoverImage } from "@/utils/firebase/storage";
import { getNumberOfDays } from "@/utils/formatDate";
import {
  calculatePrice,
  calculateSubtotal,
  formatNumber,
} from "@/utils/formatNumber";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import LocationPicker from "react-location-picker";
import { set } from "sanity";
import ExampleComponent from "@/components/ExampleComponent";
import styled from "styled-components";
import Link from "next/link";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { checkTransactionStatus, createCheckout } from "@/utils/apis";

const defaultPosition = {
  lat: 27.9878,
  lng: 86.925,
};

interface Query {
  [key: string]: string;
}

const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

function BookingCheckout(props: any) {
  const { user, loading }: any = useAuthContext();
  const { booking, settings }: any = props;
  const [transaction, setTransaction] = useState<any>({});
  const companyCut = parseFloat(settings.companyCut);
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (loading) return;
    if (user) {
      // check if the other belongs to the user
      const checkOrderUser = async () => {
        if (user?.uid !== booking.userID) {
          router.push("/dashboard/bookings/all-bookings");
        }
        if (booking.transactionID !== undefined) {
          setIsConfirmed(true);
          await checkTransactionStatus(
            booking.transactionID,
            booking.transactionSignature
          )
            .then((result: any) => {
              console.log("transaction check", result);
              if (result!.paid) {
                setIsPaid(true);
                updateBookingInformation(booking.uid, {
                  transaction: result,
                  status: "processing",
                }).then(() => {
                  router.push(`/dashboard/bookings/${booking.uid}`);
                });
              } else if (!result!.paid) {
                return;
              } else {
                // delete order if the transaction link has expired or transaction does not exist
                deleteDocument("bookings", booking.uid).then(() => {
                  alert("Transaction expired or does not exist");
                });
              }
            })
            .catch((error) => {
              console.log("error:", error);
            });
        }
        setBookingLoading(false);
      };
      checkOrderUser();
    } else {
      router.push("/login");
    }
  }, [user]);

  const handleCheckboxChange = (e: any) => {
    setIsTermsChecked(!isTermsChecked);
  };
  const validateForm = () => {
    let errors: any = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!isValidPhoneNumber(phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!addressOne.trim()) {
      errors.addressOne = "Address line 1 is required";
    }
    if (!addressTwo.trim()) {
      errors.addressTwo = "Address line 2 is required";
    }
    if (!zipCode.trim()) {
      errors.zipCode = "Zip code is required";
    }
    return errors;
  };

  const isValidEmail = (email: any) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhoneNumber = (phone: any) => {
    // Phone number validation logic
    return /^\d{10}$/.test(phone);
  };

  const isValidZipCode = (zipCode: any) => {
    // Zip code validation logic
    return /^\d{5}$/.test(zipCode);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (isTermsChecked) {
        await createCheckout(
          user!.fullName,
          user!.email,
          calculatePrice(
            booking.rental.price,
            booking.selectedDates.startDate,
            booking.selectedDates.endDate
          ) +
            booking.rental.price * (companyCut / 100),
          user?.phoneNumber,
          `http://localhost:3000/dashboard/bookings/${booking!.uid}/checkout`
        )
          .then((transaction: any) => {
            // window.open(res.data.url, "_blank");
            updateBookingInformation(booking!.uid, {
              email,
              fullName,
              phoneNumber: phone,
              address_1: addressOne,
              address_2: addressTwo,
              zipCode,
              additionalNotes,
              transaction: transaction,
              transactionID: transaction.id,
              transactionSignature: transaction.signature,
              paymentURL: transaction.url,
            })
              .then((res) => {
                // console.log("update result", res, booking.uid);
                setSnackbarMessage("Booking information updated");
                setSnackbarOpen(true);
                // router.push(transaction.url);
                router.reload();
                setIsConfirmed(true);
              })
              .catch((error: any) => {
                setSnackbarMessage(error.message);
                setSnackbarOpen(true);
              });
          })
          .catch((error: any) => {
            setSnackbarMessage(error.message);
            setSnackbarOpen(true);
          });
      } else {
        setErrors({
          termsAccepted: "You must Agree to the terms and conditions",
        });
      }
    } else {
      setErrors(formErrors);
    }
  };

  const refreshPage = () => {
    router.replace(router.asPath);
  };
  // const handleCheckboxChange = () => {
  //   setIsTermsChecked(!isTermsChecked);
  // };
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  if (bookingLoading) {
    return (
      <DefaultLayout>
        <div className="mx-auto">
          <h1 className="text-xl">Loading...</h1>
        </div>
      </DefaultLayout>
    );
  } else {
    if (transaction) {
      return (
        <DefaultLayout>
          <div className="mx-auto">
            <Breadcrumb pageName={booking.uid} index="Bookings" />

            <div className="w-full h-screen flex justify-between flex-col md:flex-row">
              {/* <div className="shadow-md rounded-md flex w-full md:w-[49.5%] p-4 h-full bg-white">
                Chat
              </div> */}
              <form className="lg:grid lg:grid-cols-2 w-full lg:gap-x-12 xl:gap-x-16">
                <div>
                  {isConfirmed ? (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Your information
                      </h2>
                      <div className="p-6 mt-4 rounded-lg border border-gray-200 bg-white shadow-lg w-full h-full">
                        <dl className="space-y-6  px-4 py-6 sm:px-6">
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Full name</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {`${booking.fullName}`}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">email</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {`${email}`}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Phone number</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {booking.phoneNumber}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Address line 1</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {booking.address_1}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Address line 2</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {booking.address_2}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Zip code</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {booking.zipCode}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Additional notes</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {booking.additionalNotes}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">status</dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {booking.status}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-lg">Payment</dt>
                            {isPaid ? (
                              <dd className="text-lg font-medium text-white bg-green-400 border border-green-500 py-1 px-3 rounded-lg">
                                Payment successful
                              </dd>
                            ) : (
                              <dd className="text-lg font-medium text-white bg-red-400 border border-red-500 py-1 px-3 rounded-lg">
                                Awaiting payment
                              </dd>
                            )}
                          </div>

                          {/* <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                            <dt className="text-2xl font-bold">Total</dt>
                            <dd className="text-2xl font-bold text-gray-900">
                              {`Ksh ${formatNumber(
                                calculatePrice(
                                  booking.rental.price,
                                  booking.selectedDates.startDate,
                                  booking.selectedDates.endDate
                                ) + companyCut
                              )}`}
                            </dd>
                          </div> */}
                        </dl>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Contact information
                      </h2>
                      <div className="p-6 mt-4 rounded-lg border border-gray-200 bg-white shadow-lg w-full h-full">
                        <h2 className="text-lg font-medium text-gray-900">
                          Your information
                        </h2>

                        <div className="mt-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              value={email}
                              id="email-address"
                              name="email-address"
                              autoComplete="email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Full name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                              }}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          {errors.fullName && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={phone}
                              onChange={(e: any) => {
                                if (!isNaN(e.target.value)) {
                                  setPhone(e.target.value);
                                }
                              }}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="mt-10 border-t border-gray-200 pt-10">
                          <h2 className="text-lg font-medium text-gray-900">
                            Address information
                          </h2>

                          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address line 1
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  value={addressOne}
                                  onChange={(e) => {
                                    setAddressOne(e.target.value);
                                  }}
                                  placeholder="Enter address line 1"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              {errors.addressOne && (
                                <p className="mt-2 text-sm text-red-500">
                                  {errors.addressOne}
                                </p>
                              )}
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address line 2
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  value={addressTwo}
                                  onChange={(e) => {
                                    setAddressTwo(e.target.value);
                                  }}
                                  placeholder="Enter address line 2"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              {errors.addressTwo && (
                                <p className="mt-2 text-sm text-red-500">
                                  {errors.addressTwo}
                                </p>
                              )}
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Zip code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  value={zipCode}
                                  onChange={(e: any) => {
                                    // check to see if the value is a number

                                    if (!isNaN(e.target.value)) {
                                      setZipCode(e.target.value);
                                    }
                                  }}
                                  placeholder="Enter zip code"
                                  autoComplete="postal-code"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.zipCode && (
                                  <p className="mt-2 text-sm text-red-500">
                                    {errors.zipCode}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Additional notes
                              </label>
                              <div className="mt-1">
                                <textarea
                                  value={additionalNotes}
                                  onChange={(e: any) => {
                                    // check to see if the value is a number

                                    setAdditionalNotes(e.target.value);
                                  }}
                                  placeholder="Enter Additional notes"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className="mt-6 flex flex-col space-x-2">
                              <div className="flex">
                                <input
                                  type="checkbox"
                                  id="termsAndConditions"
                                  className="h-6 w-6 text-indigo-600 focus:ring-0 focus:outline-none hover:cursor-pointer border-gray-300 rounded"
                                  checked={isTermsChecked}
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  htmlFor="termsAndConditions"
                                  className="ml-2 block text-lg text-gray-900"
                                >
                                  I agree to the terms and conditions
                                </label>
                              </div>

                              {errors.termsAccepted && (
                                <p className="mt-2 text-sm text-red-500">
                                  {errors.termsAccepted}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order summary */}
                <div className="my-10 lg:mt-0">
                  <h2 className="text-lg font-medium text-gray-900">
                    Booking summary
                  </h2>

                  <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <h3 className="sr-only">Rental</h3>
                    <ul role="list" className="divide-y divide-gray-200">
                      <li
                        key={booking.rental.uid}
                        className="flex flex-col px-4 py-6 sm:px-6"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={booking.rental.image[0]}
                            alt={booking.rental.name}
                            className="w-full h-full rounded-md"
                          />
                        </div>

                        <div className=" mt-6  flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <Link
                                  href={`/rentals/${booking.rental.uid}`}
                                  className="font-semibold text-gray-900 text-2xl hover:text-[#F8D521] transition-all ease-in-out"
                                >
                                  {booking.rental.name}
                                </Link>
                              </h4>
                              <p className="mt-1 text-lg text-gray-500">
                                {`${booking.rental.year}`}
                              </p>
                              <p className="mt-1 text-xl text-gray-600">
                                {`${booking.rental.location.addressLine1}, ${booking.rental.location.addressLine2}`}
                              </p>
                              <p className="mt-1 text-xl text-gray-600">
                                {`from: ${new Date(
                                  booking.selectedDates.startDate.seconds * 1000
                                ).toLocaleDateString()}`}
                              </p>
                              <p className="mt-1 text-xl text-gray-600">
                                {`to: ${new Date(
                                  booking.selectedDates.endDate.seconds * 1000
                                ).toLocaleDateString()}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-0">
                            <p className="mt-1 text-xl font-medium text-gray-900">
                              {`Ksh ${formatNumber(
                                calculatePrice(
                                  booking.rental.price,
                                  booking.selectedDates.startDate,
                                  booking.selectedDates.endDate
                                ) +
                                  calculatePrice(
                                    booking.rental.price,
                                    booking.selectedDates.startDate,
                                    booking.selectedDates.endDate
                                  ) *
                                    (companyCut / 100)
                              )}`}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <dt className="text-lg">Subtotal</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {`Ksh ${formatNumber(
                            calculatePrice(
                              booking.rental.price,
                              booking.selectedDates.startDate,
                              booking.selectedDates.endDate
                            ) +
                              calculatePrice(
                                booking.rental.price,
                                booking.selectedDates.startDate,
                                booking.selectedDates.endDate
                              ) *
                                (companyCut / 100)
                          )}`}
                        </dd>
                      </div>
                      {/* <div className="flex items-center justify-between">
                        <dt className="text-lg">Plow-mart cut</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {`Ksh ${formatNumber(companyCut)}`}
                        </dd>
                      </div> */}

                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-2xl font-bold">Total</dt>
                        <dd className="text-2xl font-bold text-gray-900">
                          {`Ksh ${formatNumber(
                            calculatePrice(
                              booking.rental.price,
                              booking.selectedDates.startDate,
                              booking.selectedDates.endDate
                            ) +
                              calculatePrice(
                                booking.rental.price,
                                booking.selectedDates.startDate,
                                booking.selectedDates.endDate
                              ) *
                                (companyCut / 100)
                          )}`}
                        </dd>
                      </div>
                    </dl>

                    {!isPaid ? (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {!isConfirmed ? (
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full rounded-md border border-transparent bg-[#F8D521] px-4 py-3 text-base font-semibold text-white shadow-sm hover:scale-105 focus:outline-none focus:ring-0 transition-all ease-in-out"
                          >
                            Confirm booking
                          </button>
                        ) : (
                          <>
                            {isPaid ? (
                              <></>
                            ) : (
                              <button
                                type="submit"
                                onClick={() => {
                                  window.open(booking.paymentURL, "_blank");
                                }}
                                className="w-full rounded-md border border-transparent bg-[#F8D521] px-4 py-3 text-base font-semibold text-white shadow-sm hover:scale-105 focus:outline-none focus:ring-0 transition-all ease-in-out"
                              >
                                Pay now
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <Snackbar
              message={snackbarMessage}
              isVisible={snackbarOpen}
              onClose={() => {
                setSnackbarOpen(false);
              }}
            />
          </div>
        </DefaultLayout>
      );
    }
  }
}

export default BookingCheckout;

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  //   console.log("params", params);
  const booking = await getDocument("bookings", params.booking);
  const settings: any = await getDocument("settings", "admin");

  if (!booking) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      booking: JSON.parse(JSON.stringify(booking)),
      settings: JSON.parse(JSON.stringify(settings)),

      //   rentalSlug: rentalSlug,
    },
  };
};
