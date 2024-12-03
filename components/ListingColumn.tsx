import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  deleteDocument,
  updateRentalInformation,
  updateTractorInformation,
  updateUserEmailAndPhone,
  updateUserRole,
  verifyTractor as verifyListing,
  verifyUser,
} from "@/utils/firebase/firestore";
import ImageSliderComponent from "./ImageSliderComponent";
import { formatNumber } from "@/utils/formatNumber";
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/react";
import AdminListings from "../pages/dashboard/admin/listings";
import AutoCompleteComponent from "./AutoCompleteComponent";
import { tractorMakes } from "@/utils/product-data";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ListingColumn({
  listing,
  open,
  setOpen,
  callSnackBar,
}: {
  listing: any;
  open: boolean;
  setOpen: any;
  callSnackBar: any;
}) {
  // console.log("road", listing);
  //   const [open, setOpen] = useState(true);
  const [model, setModel]: any = useState("");
  const [make, setMake]: any = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState(""); // Default value can be set as needed
  const [age, setAge]: any = useState(0);
  const [hours, setHours]: any = useState(0);
  const [price, setPrice]: any = useState(0);
  const [description, setDescription]: any = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
                          className="text-2xl font-semibold leading-6 text-gray-900"
                        >
                          View Listing
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
                              src={listing!.images[0] ? listing!.images[0] : ""}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex space-x-2 items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {`${listing!.make} ${listing!.model}`}
                                  </h3>
                                </div>
                                <div className="mt-1 flex items-center">
                                  <p className="text-lg font-medium text-gray-900">
                                    {`${formatNumber(listing!.price)}Ksh`}
                                  </p>
                                  {/* <p className="text-lg text-gray-500">/day</p> */}
                                </div>
                                <p className="text-lg text-gray-500">
                                  {listing!.uid}
                                </p>
                                <p className="text-lg text-gray-500">
                                  {`${listing!.age} years`}
                                </p>
                              </div>
                              <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                {!listing!.isApproved ? (
                                  <button
                                    onClick={async () => {
                                      await verifyListing(
                                        listing!.uid,
                                        true
                                      ).then((res: any) => {
                                        callSnackBar("Listing approved");
                                        router.reload();
                                      });
                                    }}
                                    type="button"
                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-green-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:scale-105 transition-all ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                  >
                                    Approve Listing
                                  </button>
                                ) : (
                                  <button
                                    onClick={async () => {
                                      await verifyListing(
                                        listing!.uid,
                                        false
                                      ).then((res: any) => {
                                        callSnackBar(
                                          "Listing approval removed"
                                        );
                                      });
                                    }}
                                    type="button"
                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                  >
                                    Remove Listing Approval
                                  </button>
                                )}

                                {listing!.availability ? (
                                  <></>
                                ) : (
                                  <button
                                    onClick={async () => {}}
                                    type="button"
                                    className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    Change Role
                                  </button>
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
                                                href={`/shop/${listing!.uid}`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-lg"
                                                )}
                                              >
                                                View Listings
                                              </a>
                                            )}
                                          </Menu.Item>

                                          <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                onClick={async () => {
                                                  await deleteDocument(
                                                    "listings",
                                                    listing!.uid
                                                  ).then((res) => {
                                                    callSnackBar(
                                                      "Listing deleted"
                                                    );
                                                  });
                                                }}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-red-900"
                                                    : "text-red-700",
                                                  "block px-4 py-2 text-lg w-full font-semibold text-left"
                                                )}
                                              >
                                                Delete listing
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
                          <div className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                            <dt className="text-xl font-bold text-black sm:w-40 sm:flex-shrink-0">
                              Description:
                            </dt>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <textarea
                                placeholder={listing.description}
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                }}
                              ></textarea>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xl font-bold text-black sm:w-40 sm:flex-shrink-0">
                              Details:
                            </dt>

                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                Make:
                              </p>
                              <AutoCompleteComponent
                                setMake={setMake}
                                make={make}
                                placeholder={listing.make}
                                data={tractorMakes}
                              />
                            </dd>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                Model:{" "}
                              </p>
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.phoneNumber}
                                placeholder={listing.model}
                                onChange={(e) => {
                                  //   user?.phone = e.target.value;
                                  setModel(e.target.value);
                                }}
                              />
                            </dd>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                Year:
                              </p>
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.phoneNumber}
                                placeholder={listing.age}
                                onChange={(e: any) => {
                                  //   user?.phone = e.target.value;
                                  if (!isNaN(e.target.value)) {
                                    setAge(e.target.value);
                                  }
                                }}
                              />
                            </dd>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                Hours Used:{" "}
                              </p>
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.phoneNumber}
                                placeholder={listing.hours}
                                onChange={(e: any) => {
                                  //   user?.phone = e.target.value;
                                  if (!isNaN(e.target.value)) {
                                    setHours(e.target.value);
                                  }
                                }}
                              />{" "}
                            </dd>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                City:{" "}
                              </p>
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.email}
                                placeholder={listing.city}
                                onChange={(e) => {
                                  //   user?.phone = e.target.value;
                                  setCity(e.target.value);
                                }}
                              />{" "}
                            </dd>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                Street Address:{" "}
                              </p>
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.email}
                                placeholder={listing.streetAddress}
                                onChange={(e) => {
                                  //   user?.phone = e.target.value;
                                  setStreetAddress(e.target.value);
                                }}
                              />
                            </dd>
                            <dd className="flex flex-col mt-1 text-lg text-gray-900 sm:col-span-2">
                              <p className="text-gray-500 font-semibold">
                                Zip / Postal Code:{" "}
                              </p>
                              <input
                                type="text"
                                className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300"
                                // placeholder={user?.email}
                                placeholder={listing.postalCode}
                                onChange={(e) => {
                                  //   user?.phone = e.target.value;
                                  setPostalCode(e.target.value);
                                }}
                              />
                            </dd>
                          </div>
                          <div>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2">
                              <button
                                onClick={async () => {
                                  setLoading(true);
                                  await updateTractorInformation(listing.uid, {
                                    description:
                                      description != ""
                                        ? description
                                        : listing.description,
                                    make: make != "" ? make : listing.make,
                                    postalCode:
                                      postalCode != ""
                                        ? postalCode
                                        : listing.postalCode,
                                    model: model != "" ? model : listing.model,
                                    numberPlate:
                                      hours != "" ? hours : listing.hours,
                                    city: city != "" ? city : listing.city,
                                    country:
                                      country != "" ? country : listing.country,
                                    seats: hours != "" ? hours : listing.hours,
                                    age: age != "" ? age : listing.age,
                                    streetAddress:
                                      streetAddress != ""
                                        ? streetAddress
                                        : listing.streetAddress,
                                  }).then((res: any) => {
                                    setLoading(false);
                                    callSnackBar(res.message);
                                    router.reload();
                                  });
                                }}
                                type="button"
                                className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                              >
                                {loading ? (
                                  <Spinner color="white" />
                                ) : (
                                  <>Save</>
                                )}
                              </button>
                              {/* <button
                                onClick={() => {
                                  console.log("test:", model);
                                }}
                              >
                                Test
                              </button> */}
                            </dd>
                          </div>

                          {/* <div>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2">
                              {rental!.isApprove ? (
                                <button
                                  onClick={async () => {}}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  Unverify
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {}}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-green-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
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
