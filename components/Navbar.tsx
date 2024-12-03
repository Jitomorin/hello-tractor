import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import DropdownUser from "./Header/DropdownUser";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import "@/css/style.css";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { ShoppingBag } from "lucide-react";
import { classNames } from "@/contexts/utils";
import CartColumn from "./CartColumn";
import { getDocument } from "@/utils/firebase/firestore";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Shop", href: "/shop", current: false },
];

function Navbar() {
  const [nav, setNav] = useState(false);
  const { user }: any = useAuthContext();
  const { theme }: any = useTheme();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const scrollPosition = useScrollPosition();
  const pathName = usePathname();
  const router = useRouter();

  // Dynamically set the current page in the navigation
  const updatedNavigation = navigation.map((item: any) => ({
    ...item,
    current: item.href === pathName,
  }));

  useEffect(() => {
    // Fetch wishlist items
    const fetchWishlistItems = async () => {
      try {
        const listItems: any = await getDocument("carts", user.uid);
        setWishlistItems(listItems);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };
    if (user) fetchWishlistItems();
  }, [user]);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-2 py-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div
              className="flex hover:cursor-pointer w-[140px] shrink-0 items-start"
              onClick={() => {
                router.push("/");
              }}
            >
              <img
                alt="Your Company"
                src="/images/logo/PlowMart.png"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:my-auto sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {updatedNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "scale-[1.03] text-primary font-bold"
                        : "text-gray-500 hover:text-primary hover:scale-[1.03]",
                      "rounded-md px-3 py-2 text-2xl font-poppins font-medium transition-all ease-in-out"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user && (
              <button
                onClick={() => setWishlistOpen(true)}
                type="button"
                className="relative rounded-full p-1 group-hover:text-primary text-gray-700 transition-all ease-in-out hover:text-primary focus:outline-none focus:ring-2 hover:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View wishlist</span>
                <ShoppingBag
                  aria-hidden="true"
                  className="size-7 group-hover:text-primary hover:text-primary"
                />
              </button>
            )}

            {/* Profile dropdown */}
            <DropdownUser />
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {updatedNavigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "scale-[1.03] text-primary font-bold"
                  : "text-gray-500 hover:text-primary hover:scale-[1.03]",
                "block rounded-md px-3 py-2 text-2xl font-poppins font-medium transition-all ease-in-out"
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
      <CartColumn
        open={wishlistOpen}
        setOpen={setWishlistOpen}
        callSnackBar={() => {}}
        user={user}
        cart={wishlistItems}
      />
    </Disclosure>
  );
}

export default Navbar;
