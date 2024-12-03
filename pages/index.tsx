import Head from "next/head";
// import Link from "components/Link";
import { EnvVars } from "env";
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
