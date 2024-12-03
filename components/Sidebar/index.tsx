"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import {
  HouseIcon,
  LogOutIcon,
  MessageCircleMoreIcon,
  PackageIcon,
  PieChartIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { user, loading }: any = useAuthContext();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const router = useRouter();

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    if (loading === false) {
      if (!user) {
        router.push("/login");
      }
    }
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-white dark:bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/PlowMart.png"}
            alt="logo-img"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-black"
        >
          <svg
            className="fill-current text-black"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5  py-4 lg:mt-9">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={pathname!.includes("dashboard")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard/home"
                        className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C] dark:hover:bg-meta-4 ${
                          pathname!.includes("home") &&
                          "font-extrabold text-[#1C4D9C]"
                        }`}
                      >
                        <div
                          className={`border duration-300 ease-in-out border-gray-400 group-hover:shadow-md ${
                            pathname!.includes("home") ? "shadow-md" : ""
                          } p-2 rounded-2xl`}
                        >
                          <HouseIcon
                            className={`size-10 duration-300 ease-in-out ${
                              pathname!.includes("home")
                                ? "text-[#1C4D9C]"
                                : "text-gray-500"
                            }   group-hover:text-[#1C4D9C]`}
                          />
                        </div>
                        Home
                      </Link>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <li>
                <Link
                  href="/dashboard/orders"
                  className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C] dark:hover:bg-meta-4 ${
                    pathname!.includes("orders") && "  text-[#1C4D9C]"
                  }`}
                >
                  <div
                    className={`border duration-300 ease-in-out border-gray-400 group-hover:shadow-md ${
                      pathname!.includes("orders") ? "shadow-md" : ""
                    } p-2 rounded-2xl`}
                  >
                    <MessageCircleMoreIcon
                      className={`size-10 duration-300 ease-in-out group-hover:text-[#1C4D9C] ${
                        pathname!.includes("orders")
                          ? "text-[#1C4D9C]"
                          : "text-gray-500"
                      }  `}
                    />
                  </div>
                  Orders
                </Link>
              </li>
              {user?.role !== "client" && (
                <li>
                  <Link
                    href="/dashboard/products"
                    className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C]  ${
                      pathname!.includes("products") &&
                      "font-extrabold text-[#1C4D9C]"
                    }`}
                  >
                    <div
                      className={`border border-gray-400 group-hover:shadow-md ${
                        pathname!.includes("products") ? "shadow-md" : ""
                      } p-2 rounded-2xl`}
                    >
                      <PackageIcon
                        className={`size-10 duration-300 ease-in-out ${
                          pathname!.includes("products")
                            ? "text-[#1C4D9C]"
                            : "text-gray-500 group-hover:text-[#1C4D9C]"
                        }  `}
                      />
                    </div>
                    Products
                  </Link>
                </li>
              )}
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <Link
                  href="/dashboard/chats"
                  className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C] dark:hover:bg-meta-4 ${
                    pathname!.includes("chats") && "  text-[#1C4D9C]"
                  }`}
                >
                  <div
                    className={`border duration-300 ease-in-out border-gray-400 group-hover:shadow-md ${
                      pathname!.includes("chat") ? "shadow-md" : ""
                    } p-2 rounded-2xl`}
                  >
                    <MessageCircleMoreIcon
                      className={`size-10 duration-300 ease-in-out group-hover:text-[#1C4D9C] ${
                        pathname!.includes("chat")
                          ? "text-[#1C4D9C]"
                          : "text-gray-500"
                      }  `}
                    />
                  </div>
                  Messages
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/settings"
                  className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C] dark:hover:bg-meta-4 ${
                    pathname!.includes("settings") &&
                    "  dark:bg-meta-4 text-[#1C4D9C]"
                  }`}
                >
                  <div
                    className={`border border-gray-400 group-hover:shadow-md ${
                      pathname!.includes("settings") ? "shadow-md" : ""
                    } p-2 rounded-2xl`}
                  >
                    <SettingsIcon
                      className={`size-10 duration-300 ease-in-out ${
                        pathname!.includes("settings")
                          ? "text-[#1C4D9C]"
                          : "text-gray-500 group-hover:text-[#1C4D9C]"
                      }`}
                    />
                  </div>
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics"
                  className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C] dark:hover:bg-meta-4 ${
                    pathname!.includes("analytics") &&
                    "  dark:bg-meta-4 text-[#1C4D9C]"
                  }`}
                >
                  <div
                    className={`border border-gray-400 group-hover:shadow-md ${
                      pathname!.includes("analytics") ? "shadow-md" : ""
                    } p-2 rounded-2xl`}
                  >
                    <PieChartIcon
                      className={`size-10 duration-300 ease-in-out ${
                        pathname!.includes("analytics")
                          ? "text-[#1C4D9C]"
                          : "text-gray-500 group-hover:text-[#1C4D9C]"
                      }`}
                    />
                  </div>
                  Analytics
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#FF0000] hover:text-[#FF0000] dark:hover:bg-meta-4"
                >
                  <div className="border border-gray-400 group-hover:shadow-md p-2 rounded-2xl">
                    <LogOutIcon className="size-10 duration-300 ease-in-out text-gray-500 group-hover:text-[#FF0000]" />
                  </div>
                  Logout
                </button>
              </li>

              {user?.role === "admin" && (
                <li>
                  <Link
                    href="/dashboard/admin"
                    className={`group font-poppins text-xl relative flex items-center gap-2.5 px-4 py-3 font-semibold text-gray-500 duration-300 ease-in-out group-hover:text-[#1C4D9C] hover:text-[#1C4D9C] dark:hover:bg-meta-4 ${
                      pathname!.includes("admin") &&
                      "  dark:bg-meta-4 text-[#1C4D9C]"
                    }`}
                  >
                    <div
                      className={`border border-gray-400 group-hover:shadow-md ${
                        pathname!.includes("admin") ? "shadow-md" : ""
                      } p-2 rounded-2xl`}
                    >
                      <UserIcon
                        className={`size-10 duration-300 ease-in-out ${
                          pathname!.includes("admin")
                            ? "text-[#1C4D9C]"
                            : "text-gray-500 group-hover:text-[#1C4D9C]"
                        }`}
                      />
                    </div>
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
