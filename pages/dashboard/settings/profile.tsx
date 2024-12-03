import { useEffect, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Snackbar from "@/components/Snackbar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import {
  updateUserProfile,
  updateUserProfileNoEmail,
  updateUserProfilePicture,
} from "@/utils/firebase/firestore";
import {
  deleteProfileDirectory,
  uploadProfileImage,
} from "@/utils/firebase/storage";
import { getUrl } from "@/utils/formatString";
import { Button } from "@nextui-org/react";
import { URLify } from "@/utils/usefulFunctions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileSettings() {
  const { user, loading }: any = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [email, setEmail] = useState(!user?.email ? "" : user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [fullName, setFullName] = useState(user?.fullName);
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
    }
  }, [user]);

  const changeProfilePicture = async () => {
    if (profileImage === null) {
      setSnackbarMessage("Please select an image to upload");
      setSnackbarOpen(true);
      return;
    }
    await deleteProfileDirectory(user?.uid);
    await uploadProfileImage(profileImage, user.uid)
      .then((res: any) => {
        updateUserProfilePicture(user.uid, res).then(() => {
          setSnackbarMessage("Profile picture updated successfully");
          setSnackbarOpen(true);
          router.reload();
        });
      })
      .catch((error) => {
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
        console.log(error);
      });
  };

  const changeProfileDetails = async () => {
    if (
      user?.phoneNumber === phoneNumber &&
      user?.fullName === fullName &&
      user?.bio === bio
    ) {
      setSnackbarMessage("No changes made");
      setSnackbarOpen(true);
      return;
    }
    const result = await updateUserProfileNoEmail(
      user.uid,
      fullName,
      phoneNumber,
      bio
    );
    setSnackbarMessage(result.message);
    setSnackbarOpen(true);
    router.reload();
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb index="Settings" pageName="Profile" />
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
                          getUrl(router) ===
                            item.name.toLowerCase().replace(/ /g, "-")
                            ? "border-primary-500 bg-primary-50 text-primary-700 hover:bg-primary-50 hover:primary-primary-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          getUrl(router) ===
                          item.name.toLowerCase().replace(/ /g, "-")
                            ? "page"
                            : undefined
                        }
                      >
                        <item.icon
                          className={classNames(
                            getUrl(router) ===
                              item.name.toLowerCase().replace(/ /g, "-")
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
                        Profile
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be wary
                        of what you share.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full Name
                          </label>
                          <div className="mt-2 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="fullname"
                              id="fullname"
                              autoComplete="fullname"
                              className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Bio
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="bio"
                              name="bio"
                              rows={3}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                              value={bio}
                              onChange={(e) => {
                                setBio(e.target.value);
                              }}
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Brief description for your profile.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                        <div className="mt-2 lg:hidden">
                          <div className="flex items-center">
                            <div
                              className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden "
                              aria-hidden="true"
                            >
                              <img
                                className="h-full w-full  rounded-full"
                                src={
                                  user?.profileUrl === ""
                                    ? "/images/profile.png"
                                    : user?.profileUrl
                                }
                                alt=""
                              />
                              {user?.profileUrl !== "" && (
                                // red
                                <Button
                                  onClick={async () => {
                                    await deleteProfileDirectory(
                                      user?.profileUrl
                                    );
                                  }}
                                  variant="light"
                                  className="text-red-700"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>

                            <div className="relative ml-5">
                              <input
                                id="mobile-user-photo"
                                name="user-photo"
                                type="file"
                                className="peer absolute h-full w-full rounded-md opacity-0"
                                onChange={async (e: any) => {
                                  setProfileImage(e.target.files[0]);
                                  console.log(e.target.files[0]);
                                }}
                              />
                              <label
                                htmlFor="mobile-user-photo"
                                className="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                              >
                                <span
                                  onClick={async () => {
                                    await changeProfilePicture();
                                  }}
                                >
                                  Change
                                </span>
                                <span className="sr-only"> user photo</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {user?.profileUrl !== "" && (
                          // red
                          <Button
                            onClick={async () => {
                              await deleteProfileDirectory(user?.profileUrl);
                            }}
                            variant="light"
                            color="danger"
                            className="text-red-700 mx-auto mb-4 rounded-md"
                          >
                            Remove
                          </Button>
                        )}
                        <div className="relative hidden overflow-hidden rounded-full lg:block">
                          <img
                            className="relative h-40 w-40 rounded-full object-cover"
                            src={
                              user?.profileUrl === ""
                                ? "/images/profile.png"
                                : user?.profileUrl
                            }
                            alt=""
                          />
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                          >
                            <span>Change</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              type="file"
                              id="desktop-user-photo"
                              name="user-photo"
                              accept="image/*"
                              className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                              onChange={async (e: any) => {
                                setProfileImage(e.target.files[0]);
                                console.log(e.target.files[0]);
                                // await changeProfilePicture();
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12">
                        <label
                          htmlFor="url"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="url"
                          id="url"
                          value={phoneNumber}
                          onChange={(e) => {
                            const inputValue: any = e.target.value;
                            if (!isNaN(inputValue)) {
                              // If it's a number, update the state
                              setPhoneNumber(inputValue);
                            }
                          }}
                          className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                        />
                      </div>

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
                    {profileImage === null ? (
                      <></>
                    ) : (
                      <button
                        onClick={async () => {
                          await changeProfilePicture();
                        }}
                        className="ml-5 inline-flex justify-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:scale-[1.03] transition-all ease-in-out"
                      >
                        Save Image
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        changeProfileDetails();
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
