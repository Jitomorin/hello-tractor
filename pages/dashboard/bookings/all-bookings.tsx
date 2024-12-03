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
import { getUrl } from "@/utils/formatString";
import { usePathname } from "next/navigation";
const tabs = [
  {
    name: "All Bookings",
    slug: "all-bookings",
    href: "/dashboard/bookings/all-bookings",
    current: false,
  },
  {
    name: "Completed",
    slug: "completed-bookings",
    href: "/dashboard/bookings/completed-bookings",
    current: false,
  },
  {
    name: "Pending",
    slug: "pending-bookings",
    href: "/dashboard/bookings/pending-bookings",
    current: true,
  },
  {
    name: "Paid",
    slug: "paid-bookings",
    href: "/dashboard/bookings/paid-bookings",
    current: true,
  },
  {
    name: "Unpaid",
    slug: "unpaid-bookings",
    href: "/dashboard/bookings/unpaid-bookings",
    current: true,
  },
];

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const { user, loading }: any = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setOrderLoading(true);
      await getFilteredData("bookings", "userID", "==", user?.uid).then(
        (res: any) => {
          // sort deliveries by date in field called delivery_timestamp
          res.sort((a: any, b: any) => {
            return b.createdAt - a.createdAt;
          });
          setBookings(res);
          console.log(bookings[2]);
        }
      );
    };
    if (loading) return;
    else {
      if (!user) {
        router.push("/login");
      }
      fetchData();
    }
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
                defaultValue={tabs
                  .find((tab) => pathName === tab.href)
                  ?.toString()}
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
                      pathName === tab.href
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
          {bookings.length !== 0 ? (
            <BookingsTable router={router} bookings={[...bookings]} />
          ) : (
            <div className="flex h-full mt-10 justify-center">
              <h1 className="text-3xl text-gray-600 font-semibold">
                No Bookings Found
              </h1>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AllBookings;
