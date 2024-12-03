import "tailwindcss/tailwind.css";
import "regenerator-runtime";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// import "./style.css";

import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { ColorModeScript } from "nextjs-color-mode";
import React, { PropsWithChildren, useEffect, useState } from "react";

import Footer from "components/Footer";
import { GlobalStyle } from "components/GlobalStyles";
import Navbar from "components/Navbar";
import NavigationDrawer from "components/NavigationDrawer";
import NewsletterModal from "components/NewsletterModal";
import {
  NewsletterModalContextProvider,
  useNewsletterModalContext,
} from "contexts/newsletter-modal.context";
import { NavItems } from "types";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import ThemeContainer from "./style";
import Loading from "@/components/Loading";
import { AuthContextProvider, useAuthContext } from "@/contexts/AuthContext";
import {
  ProfileModalContextProvider,
  useProfileModalContext,
} from "@/contexts/profile-modal.context";
import ProfileModal from "@/components/ProfileModal";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import { CartProvider } from "@/contexts/CartContext";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}
const navItems: NavItems = [];

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const routerPathname = router.pathname;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = JSON.parse(localStorage.getItem("user"));
      // console.log("Stored User Data:", storedData);
      // console.log("User:", storedData);
      setUser(storedData);
    }
    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <NextUIProvider>
      <ThemeProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/png"
            href="/images/logo/PlowMartLogo.png"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-6WCSKJXF5T"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-6WCSKJXF5T');
            `,
            }}
          />
        </Head>
        <AuthContextProvider>
          <>
            <ColorModeScript />
            <GlobalStyle />
            {loading ? (
              // <Spinner />
              <Loading />
            ) : (
              <CartProvider userId={user?.uid}>
                <Providers user={user && user}>
                  <Modals />
                  {routerPathname === "/login" ||
                  routerPathname.includes("dashboard") ||
                  routerPathname === "/signup" ? null : (
                    <Navbar />
                    // <Header />
                  )}
                  {/* <Navbar /> */}
                  <Component {...pageProps} />
                  {/* <CompanyFooter /> */}
                  {routerPathname === "/login" ||
                  routerPathname.includes("dashboard") ||
                  routerPathname === "/signup" ? null : (
                    <Footer />
                  )}
                  {/* <Footer /> */}
                </Providers>
              </CartProvider>
            )}
          </>
        </AuthContextProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <ProfileModalContextProvider>
      <NewsletterModalContextProvider>
        <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
      </NewsletterModalContextProvider>
    </ProfileModalContextProvider>
  );
}

function Modals() {
  const { isModalOpened, setIsModalOpened } = useNewsletterModalContext();
  if (!isModalOpened) {
    return null;
  }
  return <NewsletterModal onClose={() => setIsModalOpened(false)} />;
}

export default MyApp;
