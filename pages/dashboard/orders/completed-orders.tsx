import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getFilteredData } from "@/utils/firebase/firestore";
import Link from "next/link";
import { classNames } from "@/contexts/utils";
import { useRouter } from "next/router";
import { getUrl } from "@/utils/formatString";
import OrdersTable from "@/components/OrdersTable";
import { usePathname } from "next/navigation";
import DashboardTab from "@/components/DashboardTab";

const tabs = [
  {
    name: "All Orders",
    slug: "all-orders",
    href: "/dashboard/orders/all-orders",
    current: false,
  },
  {
    name: "Completed",
    slug: "completed-orders",
    href: "/dashboard/orders/completed-orders",
    current: false,
  },
  {
    name: "Pending",
    slug: "pending-orders",
    href: "/dashboard/orders/pending-orders",
    current: true,
  },
  {
    name: "Processing",
    slug: "processing-orders",
    href: "/dashboard/orders/processing-orders",
    current: true,
  },
];

function CompletedOrders() {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const { user, loading }: any = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setOrderLoading(true);
      await getFilteredData("orders", "rental.userID", "==", user.uid).then(
        (res: any) => {
          // sort deliveries by date in field called delivery_timestamp
          res.sort((a: any, b: any) => {
            return b.createdAt - a.createdAt;
          });
          let result = res.filter((item: any) => item.status === "completed");

          setOrders(result);
        }
      );
    };
    if (loading) return;
    else {
      if (user) {
        fetchData();
      } else {
        router.push("/login");
      }
    }
  }, [user]);

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="My Orders" />
        <div className="w-full h-full flex-col justify-center">
          <DashboardTab router={router} tabs={tabs} />

          {orders.length !== 0 ? (
            <OrdersTable router={router} bookings={[...orders]} />
          ) : (
            <div className="flex h-full mt-10 justify-center">
              <h1 className="text-3xl text-gray-600 font-semibold">
                No Orders Found
              </h1>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CompletedOrders;
