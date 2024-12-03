import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  deleteDocument,
  getDocument,
  updateBookingInformation,
  updateOrderInformation,
  updateRentalInformation,
  updateUserEmailAndPhone,
  updateUserRole,
  verifyTractor,
  verifyUser,
} from "@/utils/firebase/firestore";
import ImageSliderComponent from "./ImageSliderComponent";
import { formatNumber } from "@/utils/formatNumber";
import { useRouter } from "next/router";
import { PaidPill } from "./PaidPill";
import { StatusContainer } from "./AdminOrdersTable";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderColumn({
  order,
  open,
  setOpen,
  callSnackBar,
}: {
  order: any;
  open: boolean;
  setOpen: any;
  callSnackBar: any;
}) {
  // const [addressLine2, setAddressLine2] = useState(order.address_2);

  const description = order.listing.description;
  const router = useRouter();
  const [host, setHost]: any = useState({});
  const [client, setClient]: any = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      await getDocument("users", order.userID).then((clientRes: any) => {
        setClient(clientRes);
        getDocument("users", order.listing.userID).then((hostRes: any) => {
          setHost(hostRes);
        });
      });
    };
    fetchUserData();
  }, [order]);

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
                          View Order
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
                              src={
                                order!.listing.images[0]
                                  ? order!.listing.images[0]
                                  : ""
                              }
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex space-x-2 items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {order!.listing.make}
                                  </h3>
                                </div>
                                <div className="mt-1 flex items-center">
                                  <p className="text-sm font-medium text-gray-900">
                                    {`${formatNumber(order!.listing.price)}Ksh`}
                                  </p>
                                </div>

                                <p className="text-sm text-gray-500">
                                  {order!.listing.age}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {order!.listing.hours}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {`Booking uid: ${order!.uid}`}
                                </p>
                              </div>
                              <div className="mt-5 flex  flex-wrap justify-end space-y-3 sm:space-x-3 sm:space-y-0">
                                <div className="items-end  flex justify-end sm:ml-0">
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
                                              <button
                                                onClick={async () => {
                                                  await deleteDocument(
                                                    "orders",
                                                    order.uid
                                                  ).then((res) => {
                                                    callSnackBar(res.message);
                                                  });
                                                }}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-red-900"
                                                    : "text-red-700",
                                                  "block px-4 py-2 w-full text-left text-lg font-semibold"
                                                )}
                                              >
                                                Delete order
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
                          <div className="flex flex-col mt-1 text-sm text-gray-900 sm:col-span-2">
                            <dt className="text-xl font-bold text-black sm:w-40 sm:flex-shrink-0">
                              Description:
                            </dt>
                            <dd className="flex flex-col mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p>{description}</p>
                            </dd>
                          </div>
                          <div className="flex flex-col mt-1 text-sm text-gray-900 sm:col-span-2">
                            {/* <dt className="text-lg font-semibold text-gray-700 sm:w-40 sm:flex-shrink-0">
                              Additional Notes:
                            </dt> */}
                            <dd className="flex flex-col mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p>{order.additionalNotes}</p>
                            </dd>
                          </div>
                          <div>
                            <dd className="mt-3 flex">
                              <StatusContainer value={order.status} />
                            </dd>
                          </div>
                          <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                            <div>
                              <dt className="font-medium text-gray-900">
                                Host
                              </dt>
                              <dd className="mt-3 space-y-3 text-gray-500">
                                <div
                                  className="flex space-x-2 cursor-pointer w-auto p-2 hover:scale-[1.03] transition-all ease-in-out rounded-lg"
                                  onClick={() => {
                                    router.push(`/profile/${host?.uid}`);
                                  }}
                                >
                                  <div className="flex justify-center flex-col">
                                    <p className="font-semibold">
                                      {host.fullName}
                                    </p>
                                    <p>{host.email}</p>
                                  </div>
                                </div>

                                {/* <div className="flex space-x-4">
                                  <button
                                    onClick={createChat}
                                    type="button"
                                    className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
                                  >
                                    Message Host
                                  </button>
                                </div> */}
                              </dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-900">
                                Client
                              </dt>
                              <dd className="mt-3 space-y-3 text-gray-500">
                                <div
                                  className="flex space-x-2 cursor-pointer w-auto p-2 hover:scale-[1.03] transition-all ease-in-out rounded-lg"
                                  onClick={() => {
                                    router.push(`/profile/${client?.uid}`);
                                  }}
                                >
                                  {/* <div className="w-14 h-14 rounded-full  overflow-hidden">
                                    <img
                                      className=" object-cover"
                                      src={
                                        client?.profileUrl === ""
                                          ? "/images/profile.png"
                                          : client?.profileUrl
                                      }
                                      alt="avatar"
                                    />
                                  </div> */}
                                  <div className="flex justify-center flex-col">
                                    <p className="font-semibold">
                                      {client.fullName}
                                    </p>
                                    <p>{client.email}</p>
                                  </div>
                                </div>

                                {/* <div className="flex space-x-4">
                                 
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Edit Order
                                  </button>
                                </div> */}
                              </dd>
                            </div>
                          </dl>
                          <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                            <div className="flex items-center justify-between pt-4">
                              <dt className="font-medium text-gray-900">
                                Order total
                              </dt>
                              <dd className="font-semibold text-lg text-indigo-600">
                                {`Ksh ${formatNumber(order.listing.price)}`}
                              </dd>
                            </div>
                          </dl>
                          <div>
                            {/* <dt className="text-xl font-bold text-black sm:w-40 sm:flex-shrink-0">
                              Details:
                            </dt> */}

                            <dd className="flex flex-col mt-1 text-sm text-gray-900 sm:col-span-2">
                              <dt className="font-medium text-gray-900">
                                Street Address:{" "}
                              </dt>
                              <dd className="font-semibold text-lg text-indigo-600">
                                {`${order.listing.streetAddress}`}
                              </dd>
                            </dd>
                          </div>

                          {/* <div>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {rental!.isApprove ? (
                                <button
                                  onClick={async () => {}}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  Unverify
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {}}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  Verify
                                </button>
                              )}
                            </dd>
                          </div> */}
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
