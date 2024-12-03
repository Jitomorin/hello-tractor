import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styled from "styled-components";
import Chart from "@/components/Charts/page";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { GetServerSideProps } from "next";
import {
  getAllData,
  getAllSortedData,
  getData,
  getDocument,
} from "@/utils/firebase/firestore";
import { Car } from "@/components/CarData";
import CarModelCard from "@/components/CarModelCard";
import CarModelCardDashboard from "@/components/CarModelCarDashboard";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import { FunnelIcon } from "@heroicons/react/20/solid";
import UsersTable from "@/components/UsersTable";
import { set } from "sanity";
import RentalsTable from "@/components/RentalsTable";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminListingsTable from "@/components/AdminListingsTable";
import { getUrl } from "@/utils/formatString";
import AdminOrdersTable from "@/components/AdminOrdersTable";
import DashboardTab from "@/components/DashboardTab";
import OrdersTable from "@/components/OrdersTable";

const tabs = [
  {
    name: "Users",
    slug: "users",
    href: "/dashboard/admin/users",
    current: false,
  },
  {
    name: "Listings",
    slug: "listings",
    href: "/dashboard/admin/listings",
    current: false,
  },
  {
    name: "Orders",
    slug: "orders",
    href: "/dashboard/admin/orders",
    current: true,
  },
];

function AdminOrders(props: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllData("orders").then((res) => {
        res.sort((a: any, b: any) => {
          return b.dateAdded - a.dateAdded;
        });
        setOrders(res);
      });
    };
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className=" mx-auto">
        <Breadcrumb pageName="Admin" />
        <div className="w-full space-y-4 flex flex-col justify-center">
          <DashboardTab router={router} tabs={tabs} />
          {/* <UsersTable users={filteredUsers} /> */}
          {orders.length <= 0 ? (
            <></>
          ) : (
            <AdminOrdersTable router={router} orders={orders} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminOrders;
// ha
export const getServerSideProps: GetServerSideProps<any, any> = async (ctx) => {
  const { params = {} } = ctx;

  return {
    props: {},
  };
};

// export const getServerSideProps: GetServerSideProps<RentalProps> = async (
//   ctx
// ) => {
//   const { draftMode = false, params = {} } = ctx;
//   // const client = getClient(draftMode ? { token: readToken } : undefined);
//   const cars = await getData("rentals");
//   // console.log("Server Side Props: ", JSON.parse(JSON.stringify(cars)));

//   if (!cars) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       cars: JSON.parse(JSON.stringify(cars)),
//       draftMode,
//       // token: draftMode ? readToken : "",
//     },
//   };
// };
