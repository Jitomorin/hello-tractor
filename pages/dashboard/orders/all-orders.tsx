import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getMultipleFilteredDataOr } from "@/utils/firebase/firestore";
import { useRouter } from "next/router";
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
function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const { user, loading }: any = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setOrderLoading(true);

      await getMultipleFilteredDataOr("orders", [
        { field: "userID", operator: "==", value: user?.uid },
        { field: "listing.userID", operator: "==", value: user?.uid },
      ]).then((res: any) => {
        // sort deliveries by date in field called delivery_timestamp
        console.log("Wooooaahs", res);
        res.sort((a: any, b: any) => {
          return b.createdAt - a.createdAt;
        });
        setOrders(res);
        console.log(orders[2]);
      });
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
        <Breadcrumb pageName="My Orders" />
        <div className="w-full h-full flex-col justify-center">
          <DashboardTab router={router} tabs={tabs} />

          {orders.length !== 0 ? (
            <OrdersTable router={router} orders={[...orders]} />
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

export default AllOrders;
