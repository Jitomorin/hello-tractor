"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styled from "styled-components";
import { useAuthContext } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import {
  deleteProfileDirectory,
  uploadID,
  uploadProfileImage,
} from "@/utils/firebase/storage";
import Snackbar from "@/components/Snackbar";
import {
  updateSellerInformation,
  updateUserProfile,
} from "@/utils/firebase/firestore";
import { useRouter } from "next/router";
import {
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { getUrl } from "@/utils/formatString";
import { classNames } from "@/contexts/utils";
import { wait } from "@/utils/usefulFunctions";

function BevomeSeller() {
  const { user, loading }: any = useAuthContext();
  const [IDFront, setIDFront] = useState<any>(null);
  const [IDBack, setIDBack] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState(!user?.email ? "" : user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [previewFront, setPreviewFront]: any = useState();
  const [previewBack, setPreviewBack]: any = useState();
  const [bio, setBio] = useState(user?.bio);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [isFilled, setIsFilled] = useState(false);
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
        name: "Become a seller",
        href: "/dashboard/settings/become-a-seller",
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
        name: "Become a seller",
        href: "/dashboard/settings/become-a-seller",
        icon: UserPlusIcon,
        current: true,
      },
    ];
  }
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const fieldCheck = () => {
    if (IDFront && IDBack && phoneNumber) {
      return true;
    } else return false;
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Become a seller" index="Settings" />
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
                        Become a seller
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.role === "client"
                          ? "Provide the following details and await approval."
                          : "You are already a seller."}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                        <p
                          className="text-sm font-medium leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          Photo of National ID (front)
                        </p>
                        <div className="mt-2 lg:hidden">
                          <div className="flex items-center">
                            {previewFront ? (
                              <div
                                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                                aria-hidden="true"
                              >
                                <img
                                  className="h-full w-full  rounded-full"
                                  src={previewFront}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div
                                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-400"
                                aria-hidden="true"
                              >
                                <h4 className="p-1 text-xs text-white">
                                  No image selected
                                </h4>
                              </div>
                            )}

                            <div className="relative ml-5">
                              <input
                                id="mobile-user-photo"
                                name="user-photo"
                                type="file"
                                className="peer absolute h-full w-full rounded-md opacity-0"
                                onChange={async (e: any) => {
                                  const file = e.target.files[0];
                                  setIDFront(file);

                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setPreviewFront(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  } else {
                                    setPreviewFront(null);
                                  }
                                }}
                              />
                              <label
                                htmlFor="mobile-user-photo"
                                className="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                              >
                                <span
                                  onClick={async () => {
                                    // await changeProfilePicture();
                                  }}
                                >
                                  Set
                                </span>
                                <span className="sr-only"> user photo</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="relative hidden overflow-hidden rounded-lg lg:block">
                          {previewFront ? (
                            <img
                              className="relative h-40 w-full object-cover"
                              src={previewFront}
                              alt=""
                            />
                          ) : (
                            <div className="relative h-40 w-full rounded-none object-cover bg-gray-400">
                              <h1 className="p-1 text-white">
                                No image selected
                              </h1>
                            </div>
                          )}
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100 transition-all ease-in-out"
                          >
                            <span>Set</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              type="file"
                              id="desktop-user-photo"
                              name="user-photo"
                              accept="image/*"
                              className="absolute inset-0 h-full w-full cursor-pointer rounded-none border-gray-300 opacity-0"
                              onChange={async (e: any) => {
                                const file = e.target.files[0];
                                setIDFront(file);

                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setPreviewFront(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                } else {
                                  setPreviewFront(null);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                        <p
                          className="text-sm font-medium leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          Photo of National ID (back)
                        </p>
                        <div className="mt-2 lg:hidden">
                          <div className="flex items-center">
                            {previewBack ? (
                              <div
                                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                                aria-hidden="true"
                              >
                                <img
                                  className="h-full w-full  rounded-full"
                                  src={previewBack}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div
                                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-400"
                                aria-hidden="true"
                              >
                                <h4 className="p-1 text-xs text-white">
                                  No image selected
                                </h4>
                              </div>
                            )}

                            <div className="relative ml-5">
                              <input
                                id="mobile-user-photo"
                                name="user-photo"
                                type="file"
                                className="peer absolute h-full w-full rounded-md opacity-0"
                                onChange={async (e: any) => {
                                  const file = e.target.files[0];
                                  setIDBack(file);

                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setPreviewBack(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  } else {
                                    setPreviewBack(null);
                                  }
                                }}
                              />
                              <label
                                htmlFor="mobile-user-photo"
                                className="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                              >
                                <span
                                  onClick={async () => {
                                    // await changeProfilePicture();
                                  }}
                                >
                                  Set
                                </span>
                                <span className="sr-only"> user photo</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="relative hidden overflow-hidden rounded-lg lg:block">
                          {previewBack ? (
                            <img
                              className="relative h-40 w-full object-cover"
                              src={previewBack}
                              alt=""
                            />
                          ) : (
                            <div className="relative h-40 w-full rounded-none object-cover bg-gray-400">
                              <h1 className="p-1 text-white">
                                No image selected
                              </h1>
                            </div>
                          )}
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100 transition-all ease-in-out"
                          >
                            <span>Set</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              type="file"
                              id="desktop-user-photo"
                              name="user-photo"
                              accept="image/*"
                              className="absolute inset-0 h-full w-full cursor-pointer rounded-none border-gray-300 opacity-0"
                              onChange={async (e: any) => {
                                const file = e.target.files[0];
                                setIDBack(file);

                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setPreviewBack(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                } else {
                                  setPreviewBack(null);
                                }
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
                          Mpesa Number
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
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                    {/* <button
                      onClick={() => {
                        console.log(user.sellerInformation);
                      }}
                      type="button"
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button> */}
                    {phoneNumber !== "" && IDFront && IDBack ? (
                      <button
                        onClick={async () => {
                          if (fieldCheck()) {
                            if (
                              user?.role === "client" &&
                              user?.sellerInformation === undefined
                            ) {
                              setSnackbarMessage("loading...");
                              setSnackbarOpen(true);
                              await uploadID([IDFront, IDBack], user?.uid).then(
                                (URLs: any) => {
                                  updateSellerInformation(
                                    user?.uid,
                                    URLs.front,
                                    URLs.back
                                  ).then(() => {
                                    setSnackbarMessage(
                                      "Request sent, reloading..."
                                    );
                                    setSnackbarOpen(true);
                                    wait(3).then(() => {
                                      router.reload();
                                    });
                                  });
                                }
                              );
                            } else {
                              setSnackbarMessage(
                                "You have already sent a request"
                              );
                              setSnackbarOpen(true);
                            }
                          }
                        }}
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:scale-[1.03] transition-all ease-in-out"
                      >
                        Send request
                      </button>
                    ) : (
                      <button
                        disabled
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white hover:scale-[1.03] transition-all ease-in-out"
                      >
                        Send request
                      </button>
                    )}
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

export default BevomeSeller;
