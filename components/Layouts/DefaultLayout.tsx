"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header/index";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Loading from "../Loading";
import { auth } from "@/utils/firebase/config";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading }: any = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      if (user === null) router.push("/login");
      // console.log(auth.currentUser);
      if (auth.currentUser?.emailVerified === false) router.push("/");
    } else {
      setIsLoading(true);
    }
  }, [user, loading]);
  if (router.isFallback) {
    return <Loading />;
  }

  if (isLoading) return <Loading />;
  else
    return (
      <>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto h-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 font-['Inter',sans-serif]">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </>
    );
}
