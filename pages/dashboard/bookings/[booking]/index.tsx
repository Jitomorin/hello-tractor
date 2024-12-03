import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CartColumn from "@/components/CartColumn";
import Divider from "@/components/Divider";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductOverview from "@/components/ProductOverview";
import Snackbar from "@/components/Snackbar";
import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import {
  addDataWithDocName,
  checkIfChatExists,
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
import { StatusPill } from "@/components/StatusPill";
import ProgressBar from "@/components/ProgressBar";
import { PaidPill } from "@/components/PaidPill";
import OrderColumn from "@/components/OrderColumn";
import { Button } from "@nextui-org/react";
import ConfirmationCodeFormModal from "@/components/ConfirmationCodeFormModal";
import ConfirmationCodeOrderModal from "@/components/ConfirmationCodeOrderModal";
import { generateConfirmationCode } from "@/utils/formatString";
import ConfirmationCodeBookingModal from "@/components/ConfirmationCodeBookingModal";
import ReviewModal from "@/components/ReviewModal";

const defaultPosition = {
  lat: 27.9878,
  lng: 86.925,
};

interface Query {
  [key: string]: string;
}

function Booking(props: any) {
  const { user, loading }: any = useAuthContext();
  const { booking, settings }: any = props;
  const [transaction, setTransaction] = useState<any>({});
  const router = useRouter();
  const patarideCut = parseFloat(settings.companyCut);
  const [activeProduct, setActiveProduct] = useState("");
  const [openBooking, setOpenBooking] = useState(false);
  const [orderLoading, setOrderLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [host, setHost]: any = useState({});
  const [client, setClient]: any = useState({});

  const refreshPage = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    if (loading) return;
    if (!user || user == null) {
      router.push("/login");
    }
    // check if the other belongs to the user
    const checkOrderUser = async () => {
      if (user?.uid !== booking.userID) {
        router.push("/dashboard/bookings/all-bookings");
      }
      setOrderLoading(false);
    };
    const fetchUserData = async () => {
      await getDocument("users", booking.userID).then((clientRes: any) => {
        setClient(clientRes);
        // console.log("client", clientRes);
        getDocument("users", booking.rental.userID).then((hostRes: any) => {
          setHost(hostRes);
          // console.log("host", hostRes);
        });
      });
    };

    checkOrderUser().then(() => {
      fetchUserData();
    });
  }, [user]);

  const createChat = async () => {
    // if chat with this user exists then navigate to it if not then create it and then navigate to it
    checkIfChatExists(booking.rental.userID, user.uid).then((result: any) => {
      console.log("resuuulr", result);
      if (result.length !== 0) {
        router.push(`/dashboard/chats/${result[0].uid}`);
      } else {
        const uid = uuidv4();
        addDataWithDocName("chats", uid, {
          chat: [],
          createdAt: new Date(),
          updatedLast: new Date(),
          userID: user.uid,
          users: [user.uid, booking.rental.userID],
          uid,
        }).then(() => {
          router.push(`/dashboard/chats/${uid}`);
        });
      }
    });
  };

  if (orderLoading) {
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
            <OrderColumn
              cut={parseFloat(settings.companyCut)}
              booking={booking}
              open={openBooking}
              setOpen={setOpenBooking}
              callSnackBar={(message: string) => {
                setSnackbarMessage(message);
                setSnackbarOpen(true);
              }}
            />
            <Breadcrumb pageName={booking.uid} index="Bookings" />

            <div className="w-full h-auto flex justify-between flex-col md:flex-row">
              {/* <div className="shadow-md rounded-md flex w-full md:w-[49.5%] p-4 h-full bg-white">
                Chat
              </div> */}
              <div className="bg-white h-auto w-full shadow-lg rounded-lg">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Booking Details
                  </h1>

                  <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
                    <dl className="flex">
                      <dt className="text-gray-500">Booking ID&nbsp;</dt>
                      <dd className="font-medium text-gray-900">
                        {booking.uid}
                      </dd>
                      <dt>
                        <span className="sr-only">Date</span>
                        <span className="mx-2 text-gray-400" aria-hidden="true">
                          &middot;
                        </span>
                      </dt>
                      <dd className="font-medium text-gray-900">
                        <time dateTime="2021-03-22">
                          {new Date(
                            booking.createdAt.seconds * 1000
                          ).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </time>
                      </dd>
                    </dl>
                    <div className="mt-4 sm:mt-0">
                      <a
                        href={`/dashboard/bookings/${booking.uid}/invoice`}
                        className="font-medium text-primary hover:text-primary-400"
                      >
                        View invoice
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="sr-only">Products purchased</h2>

                    <div className="space-y-24">
                      <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
                        <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                            <img
                              src={booking.rental.image[0]}
                              alt={booking.rental.name}
                              className="object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            <a
                              className="hover:underline transition-all text-2xl font-semibold ease-in-out"
                              href={`/rentals/${booking.rental.uid}`}
                            >
                              {booking.rental.name}
                            </a>
                          </h3>
                          <p className="mt-1 font-medium text-gray-900 text-xl">
                            {`${formatNumber(booking.rental.price)}Ksh`}
                          </p>
                          <p className="mt-3 text-gray-500">
                            {booking.rental.description}
                          </p>
                        </div>
                        <div className="sm:col-span-12 md:col-span-7">
                          <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                            <div>
                              <dt className="font-medium text-gray-900">
                                Host Information
                              </dt>
                              <dd className="mt-3 space-y-3 text-gray-500">
                                <div
                                  className="flex space-x-2 cursor-pointer w-auto py-2 hover:scale-[1.03] transition-all ease-in-out rounded-lg"
                                  onClick={() => {
                                    router.push(`/profile/${host?.uid}`);
                                  }}
                                >
                                  <div className="w-14 h-14 rounded-full  overflow-hidden">
                                    <img
                                      className=" object-cover"
                                      src={
                                        host?.profileUrl === ""
                                          ? "/images/profile.png"
                                          : host?.profileUrl
                                      }
                                      alt="avatar"
                                    />
                                  </div>
                                  <div className="flex justify-center flex-col">
                                    <p className="font-semibold">
                                      {host.fullName}
                                    </p>
                                    <p>{host.email}</p>
                                  </div>
                                </div>

                                <div className="flex space-x-4">
                                  <Button
                                    variant="light"
                                    onClick={createChat}
                                    type="button"
                                    className="text-primary rounded-lg font-semibold transition-all ease-in-out p-2"
                                  >
                                    Message Host
                                  </Button>
                                </div>
                              </dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-900">
                                Client information
                              </dt>
                              <dd className="mt-3 space-y-3 text-gray-500">
                                <div
                                  className="flex space-x-2 cursor-pointer w-auto py-2 hover:scale-[1.015] transition-all ease-in-out rounded-lg"
                                  onClick={() => {
                                    router.push(`/profile/${client?.uid}`);
                                  }}
                                >
                                  <div className="w-14 h-14 rounded-full  overflow-hidden">
                                    <img
                                      className=" object-cover"
                                      src={
                                        client?.profileUrl === ""
                                          ? "/images/profile.png"
                                          : client?.profileUrl
                                      }
                                      alt="avatar"
                                    />
                                  </div>
                                  <div className="flex justify-center flex-col">
                                    <p className="font-semibold">
                                      {client.fullName}
                                    </p>
                                    <p>{client.email}</p>
                                  </div>
                                </div>

                                <div className="flex space-x-4">
                                  {/* <button
                                    type="button"
                                    className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
                                  >
                                    Message Host
                                  </button> */}
                                  {user?.uid === booking.userID && (
                                    <Button
                                      variant="light"
                                      onClick={() => {
                                        setOpenBooking(true);
                                      }}
                                      type="button"
                                      className="text-primary rounded-lg p-2 font-semibold"
                                    >
                                      Edit Booking
                                    </Button>
                                  )}
                                </div>
                              </dd>
                            </div>
                          </dl>
                          <div className="mt-6 flex flex-col space-y-6">
                            <StatusPill status={booking.status} />
                            <ProgressBar status={booking.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing */}
                  <div className="mt-24">
                    <h2 className="sr-only">Billing Summary</h2>

                    <div className="rounded-lg bg-gray-100 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
                      <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                        <div>
                          <dt className="font-medium text-gray-900">Address</dt>
                          <dd className="mt-3 text-gray-500">
                            {/* <span className="block">Floyd Miles</span> */}
                            <span className="block">{booking.address_1}</span>
                            <span className="block">{booking.address_2}</span>
                            <span className="block">{booking.zipCode}</span>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Payment information
                          </dt>
                          <dd className="mt-3 flex">
                            <PaidPill isPaid={booking.transaction.paid} />
                          </dd>
                          {!booking.transaction.paid && (
                            <dd className="mt-3 flex">
                              <button
                                onClick={() => {
                                  router.push(booking.transaction.url);
                                }}
                                type="button"
                                className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
                              >
                                Pay Now
                              </button>
                            </dd>
                          )}
                        </div>
                      </dl>

                      <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                        <div className="flex items-center justify-between pb-4">
                          <dt className="text-gray-600">From</dt>
                          <dd className="font-medium text-gray-900">
                            {`${new Date(
                              booking.selectedDates.startDate.seconds * 1000
                            ).toLocaleDateString()}`}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">To</dt>
                          <dd className="font-medium text-gray-900">
                            {`${new Date(
                              booking.selectedDates.endDate.seconds * 1000
                            ).toLocaleDateString()}`}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd className="font-medium text-gray-900">
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
                                  (patarideCut / 100)
                            )}`}
                          </dd>
                        </div>
                        {/* <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Plow-mart cut</dt>
                          <dd className="font-medium text-gray-900">{`Ksh ${formatNumber(
                            patarideCut
                          )}`}</dd>
                        </div> */}
                        {/* <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Tax</dt>
                          <dd className="font-medium text-gray-900">$6.16</dd>
                        </div> */}
                        <div className="flex items-center justify-between pt-4">
                          <dt className="font-medium text-gray-900">Total</dt>
                          <dd className="font-semibold text-lg text-indigo-600">
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
                                  (patarideCut / 100)
                            )}`}
                          </dd>
                        </div>
                        {booking.status !== "completed" ? (
                          <>
                            {booking.confirmed ? (
                              <div className="flex items-center justify-between pt-4">
                                <dt className="font-medium text-gray-900"></dt>
                                <dd className="font-semibold text-lg text-indigo-600">
                                  <ConfirmationCodeBookingModal
                                    user={user}
                                    callFunction={async () => {
                                      if (booking.confirmationCode === "") {
                                        const code = generateConfirmationCode();
                                        console.log(
                                          "confirmation code is:",
                                          code
                                        );
                                        updateBookingInformation(booking.uid, {
                                          confirmationCode: code,
                                        }).then((res) => {
                                          router.reload();
                                          return code;
                                        });
                                      } else {
                                        return booking.confirmationCode;
                                      }
                                    }}
                                    callSnackbar={(message: string) => {
                                      setSnackbarMessage(message);
                                      setSnackbarOpen(true);
                                    }}
                                    booking={booking}
                                  />
                                </dd>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between pt-4">
                                <dt className="font-medium text-gray-900"></dt>
                                <dd className="font-semibold text-lg text-indigo-600">
                                  <ConfirmationCodeFormModal
                                    user={user}
                                    callSnackbar={(message: string) => {
                                      setSnackbarMessage(message);
                                      setSnackbarOpen(true);
                                    }}
                                    booking={booking}
                                  />
                                </dd>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-between pt-4">
                            <dt className="font-medium text-gray-900"></dt>
                            <dd className="font-semibold text-lg text-indigo-600">
                              <ReviewModal
                                user={user}
                                callSnackbar={(message: string) => {
                                  setSnackbarMessage(message);
                                  setSnackbarOpen(true);
                                }}
                                rental={booking.rental}
                              />
                            </dd>
                          </div>
                        )}

                        {booking.status === "processing" &&
                          booking.transaction.paid &&
                          !booking.placed && (
                            <div className="flex items-center justify-between pt-10">
                              <dt className="font-medium text-gray-900"></dt>
                              <dd className="font-semibold text-lg text-indigo-600">
                                <button
                                  onClick={async () => {
                                    // remove confirmationCode field
                                    const {
                                      confirmationCode,
                                      confirmed,
                                      ...destructuresBookingObject
                                    } = booking;
                                    const uid = uuidv4();
                                    await addDataWithDocName("orders", uid, {
                                      ...destructuresBookingObject,
                                      orderUID: uid,
                                      timestamp: new Date(),
                                      confirmationCode: "",
                                      confirmed: false,
                                      cashedOut: false,
                                    }).then(() => {
                                      setSnackbarMessage(
                                        "Host has successfully recieved the order, please wait a moment"
                                      );
                                      setSnackbarOpen(true);
                                      updateBookingInformation(booking.uid, {
                                        placed: true,
                                      }).then(() => {
                                        router.reload();
                                      });
                                    });
                                  }}
                                  type="button"
                                  className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
                                >
                                  Place Order
                                </button>
                              </dd>
                            </div>
                          )}
                      </dl>
                    </div>
                  </div>
                </div>
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
        </DefaultLayout>
      );
    }
  }
}

export default Booking;

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  //   console.log("params", params);
  const booking: any = await getDocument("bookings", params.booking);
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
