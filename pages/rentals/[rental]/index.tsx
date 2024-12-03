import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CartColumn from "@/components/CartColumn";
import Divider from "@/components/Divider";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductOverview from "@/components/ProductOverview";
import Snackbar from "@/components/Snackbar";
import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  getAllRentalSlugs,
  getDocument,
  getFilteredData,
  getMultipleFilteredData,
} from "@/utils/firebase/firestore";
import { uploadCoverImage } from "@/utils/firebase/storage";
import { dateToObject, timestampToISOString } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import {
  DateFormatter,
  parseAbsolute,
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from "@internationalized/date";
import { Button } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Query {
  [key: string]: string;
}

function Rental(props: any) {
  const { user, loading }: any = useAuthContext();
  const { rental, bookings, settings }: any = props;
  const router = useRouter();
  const patarideCut = parseFloat(settings.companyCut);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(true);
  const [cart, setCart] = useState<any>({});

  const disabledDates = bookings.map((booking: any) => {
    return [
      parseAbsoluteToLocal(
        timestampToISOString(booking.selectedDates.startDate.seconds * 1000)
      ),
      parseAbsoluteToLocal(
        timestampToISOString(booking.selectedDates.endDate.seconds * 1000)
      ),
    ];
  });
  // console.log("okok", disabledDates);

  useEffect(() => {
    if (loading) return;
    // if (!user) {
    //   router.push("/login");
    // }
    // const temp=DateFormatter
    const fetchCartData = async () => {
      await getDocument("carts", user?.uid).then((res) => {
        if (res) {
          setCart(res);
          // console.log("Cart: ", res);
        }
      });
    };

    // fetchCartData();
  }, [user]);

  if (loading) {
    return <div className="m-auto w-full h-full text-4xl">Loading...</div>;
  }
  return (
    <div className="mt-40 mx-auto max-w-[90%]">
      <Button
        className="w-14 h-14"
        variant="light"
        onPress={() => {
          router.push("/rentals");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-14 h-14 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </Button>
      <ProductOverview
        disabledDates={disabledDates}
        patarideCut={patarideCut}
        callSnackBar={(message: any) => {
          setSnackbarMessage(message);
          setSnackbarOpen(true);
        }}
        rental={rental}
        user={user}
      />
      <Snackbar
        message={snackbarMessage}
        isVisible={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      />
    </div>
  );
}

export default Rental;

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  console.log("params", params);
  const rental = await getDocument("rentals", params.rental);
  const settings: any = await getDocument("settings", "admin");
  const bookings = await getMultipleFilteredData("bookings", [
    { field: "transaction.paid", operator: "==", value: true },
  ]);
  // console.log("bookings", bookings);
  const rentalSlug = params.user as string;

  if (!rental) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rental: JSON.parse(JSON.stringify(rental)),
      bookings: JSON.parse(JSON.stringify(bookings)),
      settings: JSON.parse(JSON.stringify(settings)),

      //   rentalSlug: rentalSlug,
    },
  };
};

// export const getStaticPaths = async () => {
//   const slugs = await getAllRentalSlugs();
//   console.log("Slugs: ", slugs);

//   return {
//     paths: slugs?.map(({ slug }) => `dashboard/rentals/${slug}`) || [],
//     fallback: true,
//   };
// };
