import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price-low-to-high" },
  { name: "Price: High to Low", value: "price-high-to-low" },
];
const categoryOptions = [
  { name: "All", value: "all" },
  { name: "Executives", value: "executives" },
  { name: "Tours", value: "tours" },
  { name: "Movers", value: "movers" },
];

const filters = [
  {
    id: "make",
    name: "Make",
    options: [
      { value: "all", label: "All", checked: true },
      { value: "toyota", label: "Toyota", checked: false },
      { value: "nissan", label: "Nissan", checked: false },
      { value: "honda", label: "Honda", checked: false },
      { value: "mitsubishi", label: "Mitsubishi", checked: false },
      { value: "mercedes-benz", label: "Mercedes-Benz", checked: false },
      { value: "bmw", label: "BMW", checked: false },
      { value: "audi", label: "Audi", checked: false },
      { value: "volkswagen", label: "Volkswagen", checked: false },
      { value: "land-rover", label: "Land Rover", checked: false },
      { value: "subaru", label: "Subaru", checked: false },
      { value: "suzuki", label: "Suzuki", checked: false },
      { value: "isuzu", label: "Isuzu", checked: false },
      { value: "ford", label: "Ford", checked: false },
      { value: "chevrolet", label: "Chevrolet", checked: false },
      { value: "hyundai", label: "Hyundai", checked: false },
      { value: "kia", label: "Kia", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "all", label: "All", checked: true },
      { value: "executives", label: "Executives", checked: false },
      { value: "tours", label: "Tours", checked: false },
      { value: "movers", label: "Movers", checked: false },
    ],
  },
  {
    id: "seats",
    name: "Seats",
    options: [
      { value: "all", label: "All", checked: true },
      { value: 2, label: "2 seats", checked: false },
      { value: 4, label: "4 seats", checked: false },
      { value: 5, label: "5 seats", checked: false },
      { value: 7, label: "7 seats", checked: false },
      { value: 8, label: "8 seats", checked: false },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ setSelectedOrder, setSelectedType }: any) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

  return (
    <div className="">
      <div>
        <main className=" max-w-7xl px-4 sm:px-6 lg:px-8  shadow-md bg-white">
          <h1 className="text-2xl pt-4 font-bold tracking-tight text-gray-900">
            Filters
          </h1>
          <div className="flex items-start justify-between border-b border-gray-200 pb-6 pt-4">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex text-left justify-center text-lg font-medium text-gray-700 hover:text-gray-900">
                    {selectedSort.name}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setSelectedSort(option);
                                setSelectedOrder(option);
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-lg w-full text-left"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
            </div>
          </div>

          <div className="flex items-start justify-between border-b border-gray-200 pb-6 pt-4">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex text-left justify-center text-lg font-medium text-gray-700 hover:text-gray-900">
                    {selectedCategory.name}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {categoryOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setSelectedCategory(option);
                                setSelectedType(option);
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-lg w-full text-left"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
