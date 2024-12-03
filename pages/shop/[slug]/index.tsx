import { BackButton } from "@/components/BackButton";
import ProductOverview from "@/components/ProductOverview";
import Snackbar from "@/components/Snackbar";
import { useAuthContext } from "@/contexts/AuthContext";
import { getDocument } from "@/utils/firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Query {
  [key: string]: string;
}

function Listing(props: any) {
  const { user, loading }: any = useAuthContext();
  const { listing }: any = props;
  const router = useRouter();
  // const patarideCut = parseFloat(settings.companyCut);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(true);
  const [cart, setCart] = useState<any>({});
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

    fetchCartData();
  }, [user]);

  if (loading) {
    return <div className="m-auto w-full h-full text-4xl">Loading...</div>;
  }
  return (
    <div className="mt-10 mx-auto max-w-[90%]">
      <BackButton
        onClickEvent={() => {
          router.push("/shop");
        }}
      />
      <ProductOverview
        cart={cart}
        callSnackBar={(message: any) => {
          setSnackbarMessage(message);
          setSnackbarOpen(true);
        }}
        listing={listing}
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

export default Listing;

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  console.log("params", params);
  const listing = await getDocument("listings", params.slug);
  // const settings: any = await getDocument("settings", "admin");
  // const bookings = await getMultipleFilteredData("bookings", [
  //   { field: "transaction.paid", operator: "==", value: true },
  // ]);

  if (!listing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
      // bookings: JSON.parse(JSON.stringify(bookings)),
      // settings: JSON.parse(JSON.stringify(settings)),

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
