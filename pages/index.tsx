import Head from "next/head";
// import Link from "components/Link";
import { EnvVars } from "env";
import Hero from "@/components/Hero";
import PlanTrip from "@/components/PlanTrip";
import PickCar from "@/components/PickCar";
import Banner from "@/components/Banner";
import ChooseUs from "@/components/ChooseUs";
import Testimonials from "@/components/Testimonials";
import RestAPI from "@/components/RestAPI";
import { useEffect } from "react";
import { auth } from "@/utils/firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { LogoSlider } from "@/components/LogoSlider";
import Category from "@/components/Category";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta name="description" content="A car rental website" />
      </Head>
      <Category />
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
