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
import { Button, Divider } from "@nextui-org/react";
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

function Announcements() {
  const { user, loading }: any = useAuthContext();
  const [announcements, setAnnouncements]: any = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      await getAllData("announcements").then((res: any) => {
        setAnnouncements(res);
        console.log(res);
      });
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
          <Button
            className="w-14 h-14"
            variant="light"
            onPress={() => {
              router.push("/dashboard/home");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-14 h-14 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </Button>
          <div className="bg-white w-full h-full p-2 shadow-lg rounded-lg min-h-screen min-w-full">
            <h1 className="font-semibold text-3xl mt-2">Announcements</h1>
            <div className="flex flex-col mt-6">
              {announcements.map((announcement: any) => (
                <div key={announcement.uid} className="py-5 px-3">
                  <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                    <h3 className="text-xl font-semibold text-gray-800">
                      <a href={announcement.href} className="">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {announcement.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-lg text-gray-600">
                      {announcement.message}
                    </p>
                  </div>
                  <Divider className="my-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}

export default Announcements;
