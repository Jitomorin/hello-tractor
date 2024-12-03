import DefaultLayout from "@/components/Layouts/DefaultLayout";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const tabs = [
  {
    name: "Users",
    href: "http://localhost:3000/dashboard/admin/users",
    current: false,
  },
  {
    name: "Rentals",
    href: "http://localhost:3000/dashboard/admin/rentals",
    current: false,
  },
  {
    name: "Bookings",
    href: "http://localhost:3000/dashboard/admin/bookings",
    current: true,
  },
];

function Admin() {
  const router = useRouter();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  // const getUrl = () => {
  //   const url = new URL(router.asPath);
  //   const pathSegments = url.pathname.split("/");
  //   const res = pathSegments[pathSegments.length - 1];
  //   return res;
  // };

  useEffect(() => {
    router.push("/dashboard/admin/users");
  }, []);

  return (
    <DefaultLayout>
      <div className=" mx-auto">
        <Breadcrumb pageName="Admin" />
        <div className="w-full flex flex-col justify-center">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Tabs"
              >
                {tabs.map((tab) => (
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
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? "bg-indigo-100 text-indigo-700"
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
          {/* <UsersTable users={filteredUsers} />
          <div className="mt-16"></div>
          {rentals.length > 0 && <RentalsTable rentals={rentals} />} */}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Admin;

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
