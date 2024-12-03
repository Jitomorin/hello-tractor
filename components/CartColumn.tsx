import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { calculatePrice, formatNumber } from "@/utils/formatNumber";
import { addNewCart, removeProductFromCart } from "@/utils/firebase/firestore";
import { useRouter } from "next/router";

import Axios from "axios";
import Rating from "./Rating";
import { calculateAverageRating } from "@/utils/usefulFunctions";
import { Button, Spinner } from "@nextui-org/react";
import { X } from "lucide-react";
import { CartContext } from "@/contexts/CartContext";

const PUBLIC_KEY = "ISPubKey_test_02dfb039-6730-49de-99ce-9ce630ac0198";

export default function CartColumn({
  user,
  open,
  setOpen,
  callSnackBar,
}: {
  user: any;
  open?: boolean;
  setOpen?: any;
  callSnackBar: any;
}) {
  const router = useRouter();
  const { cart, loading, error }: any = useContext(CartContext);
  const [stateCart, setStateCart] = useState([]);
  //   const [open, setOpen] = useState(true);
  // const { user, loading } = useAuthContext();
  const [buttonText, setButtonText] = useState("Checkout");
  // console.log(cart);

  useEffect(() => {
    if (cart) {
      setStateCart(cart);
    }
  }, [cart]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                    <div className="px-4 py-10 sm:px-6"></div>
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-2xl font-medium text-gray-900">
                          Wishlist
                        </Dialog.Title>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {loading ? (
                              <div className="flex items-center justify-center mt-auto">
                                <Spinner color="primary" className="size-16" />
                              </div>
                            ) : (
                              <>
                                {stateCart ? (
                                  <>
                                    {stateCart?.products?.map(
                                      (product: any, index: any) => (
                                        <li key={index} className="flex py-6">
                                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                              src={product.images[0]}
                                              alt={product.model}
                                              className="h-full w-full object-cover object-center"
                                            />
                                          </div>

                                          <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                              <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                  <a
                                                    href={`/shop/${product.uid}`}
                                                  >
                                                    {`${product.make} ${product.model}`}
                                                  </a>
                                                </h3>
                                                <Button
                                                  color="danger"
                                                  variant="light"
                                                  onClick={async () => {
                                                    removeProductFromCart(
                                                      product,
                                                      user.uid
                                                    )
                                                      .then((res) => {
                                                        // console.log(res);
                                                        console.log(
                                                          res.message,
                                                          user
                                                        );
                                                      })
                                                      .catch((err) => {
                                                        console.log(
                                                          err.message,
                                                          user
                                                        );
                                                      });
                                                  }}
                                                  type="button"
                                                  className="font-medium hover:scale-105 rounded-md"
                                                >
                                                  <X className="text-red-600" />
                                                </Button>
                                              </div>
                                            </div>
                                            <div className="flex flex-1 text-base">
                                              <div className="flex flex-col">
                                                <p className="">
                                                  {`Year:${product.age}`}
                                                </p>
                                                <p className="">
                                                  {`${formatNumber(
                                                    product.price
                                                  )}Ksh`}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <div className="flex items-center justify-center mt-auto">
                                    <p className="text-2xl mr-auto mt-4 text-left text-gray-600 font-poppins font-semibold">
                                      Your cart is empty
                                    </p>
                                  </div>
                                )}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="mt-6"></div>
                      <div className="mt-6 flex justify-center text-center text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-xl text-indigo-600 hover:scale-105 transition-all ease-in-out"
                            onClick={async () => {
                              setOpen(false);
                            }}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
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
