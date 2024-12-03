import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getAllData } from "@/utils/firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminUsersTable from "@/components/AdminUsersTable";
import { useAuthContext } from "@/contexts/AuthContext";
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

function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [rentals, setRentals] = useState<any[]>([]);
  const router = useRouter();
  const { user }: any = useAuthContext();
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (!user) {
      return;
    } else {
      if (user.role !== "admin") {
        router.push("/dashboard/home");
      }
    }
    const fetchData = async () => {
      await getAllData("users").then((res) => {
        // setUsers(res);
        setFilteredUsers(res);
        getAllData("rentals").then((res) => {
          setRentals(res);
        });
      });
    };
    fetchData();
  }, [user]);

  return (
    <DefaultLayout>
      <div className=" mx-auto">
        <Breadcrumb pageName="Admin" />
        <div className="w-full space-y-4 flex flex-col justify-center">
          <DashboardTab router={router} tabs={tabs} />
          {filteredUsers.length <= 0 ? (
            <></>
          ) : (
            <AdminUsersTable users={[...filteredUsers]} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminUsers;

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
