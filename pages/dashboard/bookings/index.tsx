import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DeliveriesTable from "@/components/BookingsTable";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getFilteredData } from "@/utils/firebase/firestore";
import BookingsTable from "@/components/BookingsTable";
import Link from "next/link";
import { classNames } from "@/contexts/utils";
import { useRouter } from "next/router";

const tabs = [
  {
    name: "All Bookings",
    href: "/dashboard/admin/bookings/all-bookings",
    current: false,
  },
  {
    name: "Completed",
    href: "/dashboard/admin/bookings/completed-bookings",
    current: false,
  },
  {
    name: "Pending",
    href: "/dashboard/admin/bookings/pending-bookings",
    current: true,
  },
  {
    name: "Paid",
    href: "/dashboard/admin/bookings/paid-bookings",
    current: true,
  },
  {
    name: "Unpaid",
    href: "/dashboard/admin/bookings/unpaid-bookings",
    current: true,
  },
];

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/bookings/all-bookings");
  }, [user]);

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Bookings" />
        <div className="w-full h-full flex-col justify-center">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                placeholder="Tabs"
              >
                {tabs.map((tab: any) => (
                  <option
                    onClick={() => {
                      router.push(tab.href);
                    }}
                    key={tab.name}
                  >
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab: any) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-500 hover:text-gray-700",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          {/* <BookingsTable Loading={loading} deliveries={bookings} /> */}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Bookings;
