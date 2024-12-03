"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import TractorGrid from "@/components/TractorGrid";
import { tractorMakes } from "@/utils/product-data";
import { getApprovedListings, getData } from "@/utils/firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import FilterModal from "@/components/FilterModal";
import { Button } from "@nextui-org/react";
import SearchBar from "@/components/ListingSearchBar";
import { useAuthContext } from "@/contexts/AuthContext";

const subCategories = [
  { name: "Compact Tractors", href: "#" },
  { name: "Mid-Size Tractors", href: "#" },
  { name: "Large Tractors", href: "#" },
  { name: "Used Tractors", href: "#" },
  { name: "Heavy-Duty Tractors", href: "#" },
];

const filters = [
  {
    id: "make",
    name: "Make",
    options: tractorMakes,
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "compact", label: "Compact Tractors", checked: false },
      { value: "mid-size", label: "Mid-Size Tractors", checked: false },
      { value: "large", label: "Large Tractors", checked: false },
      { value: "used", label: "Used Tractors", checked: false },
      { value: "heavy-duty", label: "Heavy-Duty Tractors", checked: false },
    ],
  },
  {
    id: "horsepower",
    name: "Horsepower",
    options: [
      { value: "50-100", label: "50-100 HP", checked: false },
      { value: "100-150", label: "100-150 HP", checked: false },
      { value: "150-200", label: "150-200 HP", checked: false },
      { value: "200-250", label: "200-250 HP", checked: false },
      { value: "250-300", label: "250-300 HP", checked: false },
    ],
  },
];
const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price-low-to-high" },
  { name: "Price: High to Low", value: "price-high-to-low" },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export interface ShopProps {
  listings: any[];
}

export default function Shop(props: ShopProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { listings }: any = props;
  const { user, loading }: any = useAuthContext();

  const [listingsData, setListingsData] = useState(
    getApprovedListings(listings)
  );
  const router = useRouter();
  const [filteredData, setFilteredData]: any = useState(
    getApprovedListings(listings)
  );
  const [searchValue, setSearchValue]: any = useState("");
  const itemsPerPage = 4;
  const [selectedSort, setSelectedSort] = useState<any>({
    name: "Newest",
    value: "newest",
  });
  const indexOfLastItem = 1 * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [filter, setFilter] = useState({
    priceRange: [
      0,
      5000000, // Adjust max price as per your requirement
    ],
    make: { value: "", label: "All", checked: true },
  });

  useEffect(() => {
    // setSelectedSort({ name: "Newest", value: "newest" });
    if (loading) return;
    // if (!user) router.push("/login");
    const sortData = (data: any, selectedSort: any, selectedCategory: any) => {
      let sortedRes = [];
      let filterValue = "";
      if (selectedCategory.value === "all") {
        filterValue = "";
      } else {
        filterValue = selectedCategory.value;
      }

      if (selectedSort.value === "newest") {
        sortedRes = data
          // .filter((item: any) =>
          //   item.category.toLowerCase().includes(filterValue)
          // )
          .sort((a: any, b: any) => {
            const dateA = new Date(a.dateAdded.seconds * 1000);
            const dateB = new Date(b.dateAdded.seconds * 1000);
            return dateB.getTime() - dateA.getTime();
          });
        return sortedRes;
      } else if (selectedSort.value === "oldest") {
        sortedRes = data
          // .filter((item: any) =>
          //   item.category.toLowerCase().includes(filterValue)
          // )
          .sort((a: any, b: any) => {
            const dateA = new Date(a.dateAdded.seconds * 1000);
            const dateB = new Date(b.dateAdded.seconds * 1000);
            return dateA.getTime() - dateB.getTime();
          });
        return sortedRes;
      } else if (selectedSort.value === "price-low-to-high") {
        sortedRes = data
          // .filter((item: any) =>
          //   item.category.toLowerCase().includes(filterValue)
          // )
          .sort((a: any, b: any) => a.price - b.price);
        return sortedRes;
      } else if (selectedSort.value === "price-high-to-low") {
        sortedRes = data
          // .filter((item: any) =>
          //   item.category.toLowerCase().includes(filterValue)
          // )
          .sort((a: any, b: any) => b.price - a.price);
        return sortedRes;
      }
    };
    const fetchData = async () => {
      // await getAllSortedData("rentals", selectedSort.value).then((res) => {
      //   setFilteredCars(res);
      // });
      setFilteredData(
        sortData(listings, selectedSort, {
          name: "All",
          value: "all",
        }).filter((listing: any) => {
          if (
            parseFloat(listing.price) >= filter.priceRange[0] &&
            parseFloat(listing.price) <= filter.priceRange[1] &&
            filter.make.label === "All"
              ? listing.make.toLowerCase().includes("")
              : listing.make
                  .toLowerCase()
                  .includes(filter.make.label.toLowerCase())
          ) {
            return listing;
          }
        })
      );
      //
    };
    fetchData();
    // checkRentalAvailability(cars).then((res: any) => {});
    // console.log("selected category", selectedCategory);
  }, [selectedSort, filter]);

  return (
    <div className=" min-h-screen w-screen pt-20 transition-all ease-in-out">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div
                            key={option.value ? option.value : option.label}
                            className="flex items-center"
                          >
                            <input
                              defaultValue={
                                option.value ? option.value : option.label
                              }
                              // defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto xl:max-w-[90%] 2xl:max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-3 w-full justify-center align-middle items-start">
            <div className="flex space-x-2 w-full">
              {user?.role === "seller" ||
                (user?.role === "admin" && (
                  <Button
                    variant="light"
                    type="button"
                    className="m-2 ml-4 rounded-lg text-xl text-right text-primary font-bold transition-all ease-in-out sm:ml-6 rouded-md"
                    onClick={() =>
                      router.push("/dashboard/products/add-product")
                    }
                  >
                    + Upload new Listing
                  </Button>
                ))}
              <FilterModal
                filters={filter}
                applyFilters={(filters: any) => {
                  setFilter(filters);
                  // console.log("filters", filters);
                }}
              />
              <SearchBar
                value={searchValue}
                onEnter={() => {
                  console.log("2");
                  const res = filteredData.filter(
                    (listing: any) =>
                      listing.make.toLowerCase().includes(searchValue) ||
                      listing.streetAddress
                        .toLowerCase()
                        .includes(searchValue) ||
                      listing.city.toLowerCase().includes(searchValue)
                  );
                  console.log("Filtered Cars: ", res);

                  setFilteredData(res.slice(indexOfFirstItem, indexOfLastItem));
                }}
                setSearchValue={setSearchValue}
              />
            </div>
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1> */}

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-2xl font-bold font-poppins text-gray-700 hover:text-gray-900">
                    {selectedSort.name}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-8 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <div
                          className={classNames(
                            "block hover:cursor-pointer text-gray-500 px-4 py-2 text-xl data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                          onClick={() => {
                            setSelectedSort(option);
                          }}
                        >
                          {option.name}
                        </div>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Product grid */}
              <div className="lg:col-span-3">
                <TractorGrid router={router} tractors={filteredData} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx;
  // const client = getClient(draftMode ? { token: readToken } : undefined);
  const listingsData = await getData("listings");
  // const settings: any = await getDocument("settings", "admin");
  // console.log("Server Side Props: ", JSON.parse(JSON.stringify(cars)));

  if (!listingsData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listings: JSON.parse(JSON.stringify(listingsData)),
      // settings: JSON.parse(JSON.stringify(settings)),
      draftMode,
      // token: draftMode ? readToken : "",
    },
  };
};
