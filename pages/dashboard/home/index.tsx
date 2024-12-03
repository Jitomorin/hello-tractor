"use client";

import dynamic from "next/dynamic";

import CardDataStats from "@/components/CardDataStats";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WalletStats from "@/components/WalletStats";
import styled from "styled-components";
import Image from "next/image";
import {
  faCar,
  faCreditCard,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableOne from "@/components/Tables/TableOne";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import {
  HomeIcon,
  ClockIcon,
  ScaleIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ChevronRightIcon,
  CheckBadgeIcon,
  UsersIcon,
  ReceiptRefundIcon,
  AcademicCapIcon,
  ChatBubbleOvalLeftIcon,
  ClipboardDocumentIcon,
  TruckIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { AnyAaaaRecord } from "dns";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  getAllData,
  getDataLength,
  getFilteredData,
} from "@/utils/firebase/firestore";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import AnnouncementsModal from "@/components/AnnouncementsModal";
import { announcements } from "./temp";

// const announcements = [
//   {
//     id: 1,
//     title: "Office closed on July 2nd",
//     href: "#",
//     preview:
//       "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
//   },
//   {
//     id: 2,
//     title: "New password policy",
//     href: "#",
//     preview:
//       "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
//   },
//   {
//     id: 3,
//     title: "Office closed on July 2nd",
//     href: "#",
//     preview:
//       "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
//   },
// ];
const actions = [
  {
    icon: TruckIcon,
    name: "Rentals",
    href: "/rentals",
    description: "View available rentals",
  },
  {
    icon: ClipboardDocumentIcon,
    name: "Bookings",
    href: "/dashboard/bookings",
    description: "Manage your bookings",
  },
  {
    icon: ChatBubbleOvalLeftIcon,
    name: "Messages",
    href: "/dashboard/chats",
    description: "Check your messages",
  },
  {
    icon: Cog6ToothIcon,
    name: "Settings",
    href: "/dashboard/settings",
    description: "Access your settings",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function Home() {
  const { user, loading }: any = useAuthContext();
  const [rentalsLength, setRentalsLength] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [announcements, setAnnouncements]: any = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      await getFilteredData("bookings", "userID", "==", user.uid).then(
        (res: any) => {
          // sort deliveries by date in field called delivery_timestamp
          res.sort((a: any, b: any) => {
            return b.createdAt - a.createdAt;
          });
          setBookings(res);

          getDataLength("rentals", user?.uid).then((rentalsRes) => {
            setRentalsLength(rentalsRes);
            getAllData("announcements").then((res: any) => {
              setAnnouncements(res);
              console.log(res);
            });
          });
        }
      );
    };
    if (loading) return;
    if (!user) {
      router.push("/login");
    } else {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return <div className="m-auto w-full h-full text-4xl">Loading...</div>;
  }
  return (
    <DefaultLayout>
      <main className="mt-2 pb-8">
        <div className="mx-auto">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              {/* Welcome panel */}
              <section aria-labelledby="profile-overview-title">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg ">
                  <h2 className="sr-only" id="profile-overview-title">
                    Profile Overview
                  </h2>
                  <div className="bg-white p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="flex-shrink-0">
                          <img
                            className="mx-auto h-20 w-20 rounded-full object-cover"
                            src={
                              user?.profileUrl === ""
                                ? "/images/profile.png"
                                : user?.profileUrl
                            }
                            alt=""
                          />
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-lg font-semibold text-gray-600">
                            Welcome back,
                          </p>
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {user?.fullName}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:mt-0">
                        <a
                          href={`/profile/${user?.uid}`}
                          className="flex items-center justify-center rounded-md bg-primary hover:scale-[1.03] transition-all ease-in-out px-3 py-2 text-sm font-semibold text-white"
                        >
                          View profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-evenly  divide-gray-200 border-t border-gray-200 bg-gray-50 ">
                    <div className="px-6 py-5 text-center text-sm font-medium">
                      <span className="text-gray-900">{rentalsLength}</span>{" "}
                      <span className="text-gray-600">{"Rentals"}</span>
                    </div>
                    <div className="px-6 py-5 text-center text-sm font-medium">
                      <span className="text-gray-900">{bookings.length}</span>{" "}
                      <span className="text-gray-600">{"Bookings"}</span>
                    </div>

                    {}
                  </div>
                </div>
              </section>

              {/* Actions panel */}
              <section aria-labelledby="quick-links-title">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-lg sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                  <h2 className="sr-only" id="quick-links-title">
                    Quick links
                  </h2>
                  {actions.map((action: any, actionIdx: any) => (
                    <div
                      key={action.name}
                      className={classNames(
                        actionIdx === 0
                          ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                          : "",
                        actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                        actionIdx === actions.length - 2
                          ? "sm:rounded-bl-lg"
                          : "",
                        actionIdx === actions.length - 1
                          ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                          : "",
                        "group relative bg-white hover:scale-[1.03] transition-all ease-in-out p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                      )}
                    >
                      <div>
                        <span
                          className={classNames(
                            "inline-flex rounded-lg p-3 ring-2 ring-primary-100 bg-primary-50"
                          )}
                        >
                          <action.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-lg font-medium">
                          <a href={action.href} className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {action.name}
                          </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {action.description}
                        </p>
                      </div>
                      <span
                        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              {/* Announcements */}
              <section aria-labelledby="announcements-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      className="text-base font-medium text-gray-900"
                      id="announcements-title"
                    >
                      Announcements
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul
                        role="list"
                        className="-my-5 divide-y divide-gray-200"
                      >
                        {announcements.map((announcement: any) => (
                          <li key={announcement.uid} className="py-5">
                            <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                              <h3 className="text-sm font-semibold text-gray-800">
                                <a
                                  href={announcement.href}
                                  className="hover:underline focus:outline-none"
                                >
                                  {/* Extend touch target to entire panel */}
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
                                  {announcement.title}
                                </a>
                              </h3>
                              <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                {announcement.message}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="/dashboard/home/announcements"
                        className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white transition-all ease-in-out hover:scale-[1.03]"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Hires */}
              <section aria-labelledby="recent-hires-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      className="text-base font-medium text-gray-900"
                      id="recent-hires-title"
                    >
                      Recent Bookings
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul
                        role="list"
                        className="-my-5 divide-y divide-gray-200"
                      >
                        {bookings.slice(0, 3).map((booking: any) => (
                          <li key={booking.uid} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 "
                                  src={booking.rental.image[0]}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {booking.rental.name}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  {booking.uid}
                                </p>
                              </div>
                              <div>
                                <Button
                                  onClick={() => {
                                    router.push(
                                      `/dashboard/bookings/${booking.uid}`
                                    );
                                  }}
                                  variant="light"
                                  // className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white hover:scale-[1.03] transition-all ease-in-out"
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="/dashboard/bookings"
                        className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white transition-all ease-in-out hover:scale-[1.03]"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <CardDataStats title="Total Users" total={1900}>
          <FontAwesomeIcon
            // color={theme !== "light" ? "#fff" : ""}
            style={{ color: "#656575" }}
            icon={faUsers}
          />
        </CardDataStats>
        <CardDataStats title="Total amount made" total={13600} currency={true}>
          <FontAwesomeIcon
            // color={theme !== "light" ? "#fff" : ""}
            style={{ color: "#656575" }}
            icon={faCreditCard}
          />
        </CardDataStats>
        <CardDataStats title="My Rentals" total={3} levelDown currency={false}>
          <FontAwesomeIcon
            // color={theme !== "light" ? "#fff" : ""}
            style={{ color: "#656575" }}
            icon={faCar}
          />
        </CardDataStats>
        <WalletStats title="Balance" total={6000} />
      </div> */}
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        <div className="col-span-12 xl:col-span-12">
          <TableOne />
        </div>
      </div> */}
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div> */}
    </DefaultLayout>
  );
}

export default Home;
