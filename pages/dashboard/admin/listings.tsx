import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getAllData } from "@/utils/firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminListingsTable from "@/components/AdminListingsTable";
import DashboardTab from "@/components/DashboardTab";

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

function AdminListings() {
  const [listings, setListings] = useState<any[]>([]);
  const router = useRouter();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllData("listings").then((res) => {
        res.sort((a: any, b: any) => {
          return b.dateAdded - a.dateAdded;
        });
        setListings(res);
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
          {listings.length <= 0 ? (
            <></>
          ) : (
            <AdminListingsTable listings={listings} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminListings;

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
