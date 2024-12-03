import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styled from "styled-components";
import Chart from "@/components/Charts/page";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { GetServerSideProps } from "next";
import { getClient } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";
import {
  addData,
  addDataWithDocName,
  getAllData,
  getAllSortedData,
  getData,
  getDocument,
  removeAllProductsFromCart,
  removeProductFromCart,
} from "@/utils/firebase/firestore";
import { Car } from "@/components/CarData";
import CarModelCard from "@/components/CarModelCard";
import CarModelCardDashboard from "@/components/CarModelCarDashboard";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import { CheckIcon, ClockIcon, FunnelIcon } from "@heroicons/react/20/solid";
import UsersTable from "@/components/UsersTable";
import { set } from "sanity";
import RentalsTable from "@/components/RentalsTable";
import { useAuthContext } from "@/contexts/AuthContext";
import Axios from "axios";
import { useRouter } from "next/router";
import { calculatePrice, formatNumber } from "@/utils/formatNumber";
import CartColumn from "@/components/CartColumn";
import Snackbar from "@/components/Snackbar";
import { Transaction } from "next-sanity";
import { getNumberOfDays } from "@/utils/formatDate";

const products = [
  {
    id: 1,
    name: "Artwork Tee",
    href: "#",
    price: "$32.00",
    color: "Mint",
    size: "Medium",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Charcoal",
    inStock: false,
    leadTime: "7-8 years",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of charcoal cotton t-shirt.",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of sienna cotton t-shirt.",
  },
];

const policies = [
  {
    name: "Free returns",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Same day delivery",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: "For the planet",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

function CartPage() {
  const { user, loading }: any = useAuthContext();
  const [cartLoading, setCartLoading] = useState(true);
  const [cart, setCart] = useState<any>();
  const router = useRouter();
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      setCartLoading(true);
      if (user) {
        await getDocument("carts", user?.uid).then((res) => {
          if (res) {
            setCart(res);
            console.log("Cart: ", res);
            setCartLoading(false);
          }
        });
      }
    };

    // fetchCartData();
  }, []);

  const calculateSubtotal = (cart: any) => {
    let subtotal = 0;
    cart.forEach((product: any) => {
      subtotal += calculatePrice(
        product.item.price,
        product.selectedDates[0].startDate,
        product.selectedDates[0].endDate
      );
    });
    return subtotal;
  };

  const payHandler = async (event: any) => {
    event.preventDefault();
    // setButtonText("Processing");
    setSnackbarMessage("Processing order");
    setSnackbarOpen(true);
    await Axios.post("https://sandbox.intasend.com/api/v1/checkout/", {
      public_key: "ISPubKey_test_cd5109e1-16d5-4961-a2ab-9f459db4f908",
      first_name: user?.fullName.split(" ")[0],
      last_name: user?.fullName.split(" ")[1],
      email: user?.email,
      phone_number: user?.phoneNumber,
      host: "http://localhost:3000/dashboard/home",
      redirect_url: "http://localhost:3000/dashboard/orders",
      amount: calculateSubtotal(cart.products),
      currency: "KES",
    })
      .then((res: any) => {
        // setData(res.data);
        // router.push(res.data.url);
        // open link in new tab
        const orderUID = uuidv4();
        addDataWithDocName("orders", orderUID, {
          uid: orderUID,
          user: user.uid,
          products: cart.products,
          status: "pending",
          total: calculateSubtotal(cart.products),
          booking_timestamp: new Date(),
          updated_timestamp: new Date(),
          transaction_id: res.data.id,
          transaction: res.data,
          signature: res.data.signature,
          pickup_location: "",
          dropoff_location: "",
        }).then((url) => {
          setSnackbarMessage("Processing order");
          setSnackbarOpen(true);
          removeAllProductsFromCart(user.uid).then((res) => {
            router.push(`/dashboard/orders/${orderUID}`);
            // console.log("teeeest", url);
          });
        });
      })
      .catch((error: any) => {
        console.log(error);
        // setButtonText("Error");
      });
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Shopping Cart" />
        <div className="w-full flex flex-col justify-center">
          {cartLoading ? (
            <div className="flex justify-center items-center h-96 ">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : cart ? (
            <main>
              <div className="mx-auto px-4 pb-16 sm:px-6 sm:pb-24 lg:px-0">
                {/* <h1 className="text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Shopping Cart
                </h1> */}

                <form className="mt-12">
                  <section aria-labelledby="cart-heading">
                    <h2 id="cart-heading" className="sr-only">
                      Items in your shopping cart
                    </h2>

                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart.products.length > 0 ? (
                        cart.products.map((product: any, index: any) => (
                          <li key={index} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.item.image[0]}
                                alt={product.item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-xl font-medium text-gray-900">
                                  <h3>
                                    <a
                                      className="hover:underline transition-all ease-in-out"
                                      href={`/rentals/${product.item.uid}`}
                                    >
                                      {product.item.name}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    {`${formatNumber(
                                      calculatePrice(
                                        product.item.price,
                                        product.selectedDates[0].startDate,
                                        product.selectedDates[0].endDate
                                      )
                                    )}Ksh`}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                              </div>
                              <div className="flex flex-col justify-start flex-1 items-end  text-lg">
                                <p className="text-gray-500">
                                  {`from: ${new Date(
                                    product.selectedDates[0].startDate.seconds *
                                      1000
                                  ).toLocaleDateString()} to: ${new Date(
                                    product.selectedDates[0].endDate.seconds *
                                      1000
                                  ).toLocaleDateString()}`}
                                </p>
                                <p className="text-gray-500">
                                  {`${product.item.category}`}
                                </p>
                                <div className="flex">
                                  <button
                                    onClick={async () => {
                                      console.log(product.item);
                                      await removeProductFromCart(
                                        product.item,
                                        user.uid
                                      ).then((res) => {
                                        console.log(res);
                                        // callSnackBar(res.message);
                                        setSnackbarMessage(res.message);
                                        setSnackbarOpen(true);
                                        router.push("/rentals");
                                      });
                                    }}
                                    type="button"
                                    className="font-medium text-indigo-600 hover:scale-105"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="flex flex-col justify-center items-start py-10">
                          <p className="text-xl font-semibold text-gray-400">
                            Your cart is empty
                          </p>
                        </div>
                      )}
                    </ul>
                  </section>

                  {/* Order summary */}
                  <section aria-labelledby="summary-heading" className="mt-10">
                    <h2 id="summary-heading" className="sr-only">
                      Order summary
                    </h2>

                    <div>
                      <dl className="space-y-4">
                        <div className="flex items-center justify-between">
                          <dt className="text-xl font-medium text-gray-900">
                            Subtotal
                          </dt>
                          <dd className="ml-4 text-3xl font-bold text-gray-900">
                            {`${formatNumber(
                              calculateSubtotal(cart.products)
                            )}Ksh`}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-1 text-sm text-gray-500">
                        Shipping and taxes will be calculated at checkout.
                      </p>
                    </div>

                    <div className="mt-10">
                      <button
                        onClick={async (event: any) => await payHandler(event)}
                        className="flex max-w-36 font-bold items-center justify-center rounded-md border border-transparent bg-[#F8D521] px-6 py-3 text-xl text-white shadow-sm hover:scale-105 transition-all ease-in-out"
                      >
                        Checkout
                      </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          onClick={() => router.push("/rentals")}
                          className="ml-1 hover:scale-105 transition-all ease-in-out font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </section>
                </form>
              </div>

              {/* Policy grid */}
              <section
                aria-labelledby="policies-heading"
                className="border-t border-gray-200 bg-gray-50"
              >
                <h2 id="policies-heading" className="sr-only">
                  Our policies
                </h2>

                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                  <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                    {policies.map((policy) => (
                      <div
                        key={policy.name}
                        className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                      >
                        <div className="md:flex-shrink-0">
                          <div className="flow-root">
                            <img
                              className="-my-1 mx-auto h-24 w-auto"
                              src={policy.imageUrl}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                          <h3 className="text-base font-medium text-gray-900">
                            {policy.name}
                          </h3>
                          <p className="mt-3 text-sm text-gray-500">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
              <p className="text-xl font-semibold text-gray-900">
                Your cart is empty
              </p>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
    </DefaultLayout>
  );
}

export default CartPage;
