import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  deleteDocument,
  updateUserEmailAndPhone,
  updateUserEmailBioAndPhone,
  updateUserRole,
  verifyUser,
} from "@/utils/firebase/firestore";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Spinner } from "@nextui-org/react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileColumn({
  user,
  open,
  setOpen,
  callSnackBar,
}: {
  user: any;
  open: boolean;
  setOpen: any;
  callSnackBar: any;
}) {
  //   const [open, setOpen] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newBio, setNewBio] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const roles = ["client", "host"];

  useEffect(() => {
    setNewEmail(user?.email);
    setNewPhone(user?.phoneNumber);
    setNewBio(user?.bio);
  }, [user]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[600]" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Profile
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="relative h-40 sm:h-56">
                            <img
                              className="absolute h-full w-full object-cover"
                              src={
                                user?.profileURL === ""
                                  ? "/images/profile.png"
                                  : user?.profileUrl
                              }
                              alt=""
                            />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex space-x-2 items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {user?.fullName}
                                  </h3>
                                  {user?.isVerified ? (
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                      Verified
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </div>

                                <p className="text-sm text-gray-500">
                                  {user?.uid}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user?.role}
                                </p>
                              </div>
                              <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                {user?.role === "admin" ? (
                                  <button
                                    onClick={async () => {
                                      await updateUserRole(
                                        user?.uid,
                                        "client"
                                      ).then((res) => {
                                        callSnackBar(res.message);
                                        router.reload();
                                      });
                                    }}
                                    type="button"
                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                  >
                                    Remove Admin
                                  </button>
                                ) : (
                                  <button
                                    onClick={async () => {
                                      await updateUserRole(
                                        user?.uid,
                                        "admin"
                                      ).then((res) => {
                                        callSnackBar(res.message);
                                        router.reload();
                                      });
                                    }}
                                    type="button"
                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                  >
                                    Make Admin
                                  </button>
                                )}

                                {user?.role === "admin" ? (
                                  <></>
                                ) : (
                                  <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <div>
                                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        Roles
                                        <ChevronDownIcon
                                          className="-mr-1 h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </Menu.Button>
                                    </div>

                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          {roles.map((role, index) => (
                                            <Menu.Item>
                                              {({ active }) => (
                                                <button
                                                  onClick={async () => {
                                                    if (role !== user.role) {
                                                      await updateUserRole(
                                                        user?.uid,
                                                        role
                                                      ).then((res) => {
                                                        callSnackBar(
                                                          res.message
                                                        );
                                                        router.reload();
                                                      });
                                                    }
                                                  }}
                                                  className={classNames(
                                                    active
                                                      ? `${
                                                          role === user.role
                                                            ? `text-blue-500 bg-gray-100`
                                                            : `bg-gray-100 text-gray-900`
                                                        }`
                                                      : `${
                                                          role === user.role
                                                            ? `text-blue-500 bg-gray-100`
                                                            : `text-gray-700`
                                                        }`,
                                                    `block px-4 py-2 text-sm w-full text-left`
                                                  )}
                                                >
                                                  {role}
                                                </button>
                                              )}
                                            </Menu.Item>
                                          ))}
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                  // <button
                                  //   onClick={async () => {
                                  //     if (user?.role === "client") {
                                  //       await updateUserRole(
                                  //         user?.uid,
                                  //         "host"
                                  //       ).then((res) => {
                                  //         callSnackBar(res.message);
                                  //       });
                                  //     } else {
                                  //       await updateUserRole(
                                  //         user?.uid,
                                  //         "client"
                                  //       ).then((res) => {
                                  //         callSnackBar(res.message);
                                  //       });
                                  //     }
                                  //   }}
                                  //   type="button"
                                  //   className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  // >
                                  //   Change Role
                                  // </button>
                                )}
                                <div className="ml-3 inline-flex sm:ml-0">
                                  <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <Menu.Button className="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                      <span className="absolute -inset-1" />
                                      <span className="sr-only">
                                        Open options menu
                                      </span>
                                      <EllipsisVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </Menu.Button>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href={`/profile/${user.uid}`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                View profile
                                              </a>
                                            )}
                                          </Menu.Item>
                                          {/* <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm w-full text-left"
                                                )}
                                              >
                                                Copy profile link
                                              </button>
                                            )}
                                          </Menu.Item> */}
                                          <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                onClick={async () => {
                                                  await deleteDocument(
                                                    "users",
                                                    user?.uid
                                                  ).then((res) => {
                                                    callSnackBar(res.message);
                                                  });
                                                }}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-red-900"
                                                    : "text-red-700",
                                                  "block px-4 py-2 text-sm w-full text-left"
                                                )}
                                              >
                                                Delete user
                                              </button>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div className="">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Bio
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <textarea
                                value={newBio}
                                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                onChange={(e) => {
                                  setNewBio(e.target.value);
                                }}
                              ></textarea>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Phone
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.phoneNumber}
                                value={newPhone === "" ? null : newPhone}
                                onChange={(e: any) => {
                                  //   user?.phone = e.target.value;
                                  if (!isNaN(e.target.value)) {
                                    setNewPhone(e.target.value);
                                  }
                                }}
                              />
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <input
                                type="email"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.email}
                                value={newEmail}
                                onChange={(e) => {
                                  //   user?.phone = e.target.value;
                                  setNewEmail(e.target.value);
                                }}
                              />
                            </dd>
                          </div>

                          <div>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <button
                                onClick={async () => {
                                  setLoading(true);
                                  await updateUserEmailBioAndPhone(
                                    user?.uid,
                                    newEmail,
                                    newPhone,
                                    newBio
                                  ).then((res) => {
                                    setLoading(true);
                                    callSnackBar(res.message);
                                    router.reload();
                                  });
                                }}
                                type="button"
                                className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                              >
                                {loading ? (
                                  <Spinner color="white" />
                                ) : (
                                  <>Save</>
                                )}
                              </button>
                            </dd>
                          </div>
                          <div>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {user?.isVerified ? (
                                <button
                                  onClick={async () => {
                                    await verifyUser(user?.uid, false).then(
                                      (res) => {
                                        callSnackBar(res.message);
                                      }
                                    );
                                  }}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  Unverify
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {
                                    await verifyUser(user?.uid, true).then(
                                      (res) => {
                                        callSnackBar(res.message);
                                      }
                                    );
                                  }}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  Verify
                                </button>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
