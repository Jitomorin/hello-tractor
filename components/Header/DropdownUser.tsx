import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/contexts/utils";
import { logout } from "@/utils/firebase/authentication";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading }: any = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const options = [
    {
      value: "My profile",
      href: `/profile/${user?.uid}`,
    },
    {
      value: "Messages",
      href: `/dashboard/chats`,
    },
    {
      value: "Dashboard",
      href: `/dashboard/home`,
    },
  ];

  // close on click outside
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
    if (!loading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  if (isLoading) return <></>;
  else
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 ">
          <span className="hidden text-right lg:block">
            <span className="block text-xl font-medium text-black dark:text-white">
              {!user?.fullName ? "John Doe" : user?.fullName}
            </span>
          </span>

          <div className="w-14 h-14 rounded-full cursor-pointer overflow-hidden">
            <img
              className=" object-cover"
              src={
                user?.profileUrl === ""
                  ? "/images/profile.png"
                  : user?.profileUrl
              }
              alt="avatar"
            />
          </div>
          {/* 
          <ChevronDownIcon
            className="-mr-1 h-10 w-10 transition-all ease-in-out text-gray-400"
            aria-hidden="true"
          /> */}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
            {options.map((option: any, index: any) => (
              <Menu.Item>
                {({ active }: any) => (
                  <button
                    onClick={async () => {
                      router.push(option.href);
                    }}
                    className={`block px-4 py-2 text-lg w-full text-left text-gray-700 hover:bg-gray-50`}
                  >
                    {option.value}
                  </button>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              <button
                onClick={async () => {
                  logout().then(() => {
                    router.reload();
                  });
                }}
                className={`block px-4 py-2 text-lg w-full text-left text-red-700 font-semibold hover:bg-gray-50`}
              >
                Log out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
};

export default DropdownUser;
