/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Snackbar from "@/components/Snackbar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import {
  getDocument,
  updateSettings,
  updateUserProfile,
  updateUserProfileNoEmail,
} from "@/utils/firebase/firestore";
import { uploadProfileImage } from "@/utils/firebase/storage";
import { getUrl } from "@/utils/formatString";
import { GetServerSideProps } from "next";

interface Query {
  [key: string]: string;
}

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Jobs", href: "#", current: false },
  { name: "Applicants", href: "#", current: false },
  { name: "Company", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminSettings(props: any) {
  const { user, loading }: any = useAuthContext();
  const { settings }: any = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [email, setEmail] = useState(!user?.email ? "" : user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [cut, setCut] = useState(settings?.companyCut);
  const [bio, setBio] = useState(user?.bio);
  const [t, setT] = useState(true);
  const router = useRouter();
  let subNavigation = [];
  if (user?.role === "admin") {
    subNavigation = [
      {
        name: "Profile",
        href: "/dashboard/settings/profile",
        icon: UserCircleIcon,
        current: true,
      },
      {
        name: "Admin",
        href: "/dashboard/settings/admin",
        icon: UserIcon,
        current: true,
      },
      {
        name: "Become a host",
        href: "/dashboard/settings/become-a-host",
        icon: UserPlusIcon,
        current: true,
      },
    ];
  } else {
    subNavigation = [
      {
        name: "Profile",
        href: "/dashboard/settings/profile",
        icon: UserCircleIcon,
        current: true,
      },
      {
        name: "Become a host",
        href: "/dashboard/settings/become-a-host",
        icon: UserPlusIcon,
        current: true,
      },
    ];
  }

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    } else {
      // useEffect function called here
      if (user.role !== "admin") router.push("/dashboard/settings/profile");
    }
  }, [user]);

  const changeProfilePicture = async () => {
    console.log("w");
    if (profileImage === null) {
      setSnackbarMessage("Please select an image to upload");
      setSnackbarOpen(true);
      return;
    }
    const result = await uploadProfileImage(profileImage, user.uid);
    if (result.status === "success") {
      setSnackbarMessage("Profile picture updated successfully");
      setSnackbarOpen(true);
      router.reload();
    } else {
      setSnackbarMessage(result.message);
      setSnackbarOpen(true);
    }
    router.reload();
  };

  const changeSettings = async () => {
    if (settings?.companyCut === cut) {
      setSnackbarMessage("No changes made");
      setSnackbarOpen(true);
      return;
    }
    const result = await updateSettings({
      companyCut: cut,
    });
    setSnackbarMessage(result.message);
    setSnackbarOpen(true);
    router.reload();
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb index="Settings" pageName="Admin" />
        <main className="">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16 rounded-lg">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {subNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          getUrl(router) === item.name.toLowerCase()
                            ? "border-primary-500 bg-primary-50 text-primary-700 hover:bg-primary-50 hover:primary-primary-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          getUrl(router) === item.name.toLowerCase()
                            ? "page"
                            : undefined
                        }
                      >
                        <item.icon
                          className={classNames(
                            getUrl(router) === item.name.toLowerCase()
                              ? "text-primary-500 group-hover:text-primary-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </nav>
                </aside>

                <div className="divide-y divide-gray-200 lg:col-span-9">
                  {/* Profile section */}
                  <div className="px-4 py-6 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Admin
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        admin settings
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Pata ride cut in percentage
                          </label>
                          <div className="mt-2 flex rounded-md shadow-sm">
                            <input
                              type="number"
                              name="cut"
                              id="cut"
                              autoComplete="fullname"
                              className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                              value={cut}
                              onChange={(e) => {
                                const inputValue: any = e.target.value;
                                if (!isNaN(inputValue)) {
                                  // If it's a number, update the state
                                  setCut(inputValue);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      {/* <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          autoComplete="organization"
                          className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        changeSettings();
                      }}
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:scale-[1.03] transition-all ease-in-out"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Snackbar
          message={snackbarMessage}
          isVisible={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        />
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  const settings = await getDocument("settings", "admin");
  console.log("setiiiiii", settings);

  if (!settings) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
    },
  };
};
