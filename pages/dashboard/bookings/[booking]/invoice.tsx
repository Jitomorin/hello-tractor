import InvoiceCard from "@/components/InvoiceCard";
import { StatusPill } from "@/components/StatusPill";
import { useAuthContext } from "@/contexts/AuthContext";
import { getDocument } from "@/utils/firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface Query {
  [key: string]: string;
}

const InvoicePage: FC = (props: any) => {
  const { booking, settings }: any = props;
  const [host, setHost]: any = useState({});
  const { user, loading }: any = useAuthContext();
  const [orderLoading, setOrderLoading] = useState(true);
  const [client, setClient]: any = useState({});
  const router = useRouter();
  const patarideCut = parseFloat(settings.companyCut);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    }
    // check if the other belongs to the user
    const checkOrderUser = async () => {
      if (user.uid !== booking.userID) {
        router.push("/dashboard/bookings/all-bookings");
      }
      setOrderLoading(false);
    };
    const fetchUserData = async () => {
      await getDocument("users", booking.userID).then((clientRes: any) => {
        setClient(clientRes);
        console.log("client", clientRes);
        getDocument("users", booking.rental.userID).then((hostRes: any) => {
          setHost(hostRes);
          console.log("host", hostRes);
        });
      });
    };

    checkOrderUser().then(() => {
      fetchUserData();
    });
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <InvoiceCard booking={booking} patarideCut={patarideCut} />
    </div>
  );
};

export default InvoicePage;

export const getServerSideProps: GetServerSideProps<any, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;
  //   console.log("params", params);
  const booking = await getDocument("bookings", params.booking);
  const settings = await getDocument("settings", "admin");
  const rentalSlug = params.user as string;

  if (!booking) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      booking: JSON.parse(JSON.stringify(booking)),
      settings: JSON.parse(JSON.stringify(settings)),
      //   rentalSlug: rentalSlug,
    },
  };
};
