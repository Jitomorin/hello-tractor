import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styled from "styled-components";
import Chart from "@/components/Charts/page";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { GetServerSideProps } from "next";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import {
  checkRentalAvailability,
  getAllData,
  getAllSortedData,
  getApprovedListings,
  getData,
  getDocument,
} from "@/utils/firebase/firestore";
import { Car } from "@/components/CarData";
import CarModelCard from "@/components/CarModelCard";
import CarModelCardDashboard from "@/components/CarModelCarDashboard";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import RegisterCarModal from "@/components/RegisterCarModal";
import { Router, useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loading";
import RentalsGrid from "@/components/RentalsGrid";
import { isDateInRange } from "@/utils/formatString";
import { useAuthContext } from "@/contexts/AuthContext";
import FilterModal from "@/components/FilterModal";
import { useTheme } from "next-themes";

export interface RentalProps {
  cars: any[];
  settings: any;
}

function RentalsPage(props: RentalProps) {
  let { cars, settings }: any = props;
  const { theme } = useTheme();
  const patarideCut = parseFloat(settings.companyCut);
  const router = useRouter();
  const { user, loading }: any = useAuthContext();
  const itemsPerPage = 4;
  const indexOfLastItem = 1 * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);
  const [carData, setCarData] = useState(getApprovedListings(cars));
  const [filteredCars, setFilteredCars] = useState(cars);
  // const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({
    name: "All",
    value: "all",
  });

  const [filter, setFilter] = useState({
    category: { value: "", label: "All", checked: true },
    make: { value: "", label: "All", checked: true },
    fuelType: { value: "", label: "All", checked: true },
  });

  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState<any>({
    name: "Newest",
    value: "newest",
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
          .filter((item: any) =>
            item.category.toLowerCase().includes(filterValue)
          )
          .sort((a: any, b: any) => {
            const dateA = new Date(a.dateAdded.seconds * 1000);
            const dateB = new Date(b.dateAdded.seconds * 1000);
            return dateB.getTime() - dateA.getTime();
          });
        return sortedRes;
      } else if (selectedSort.value === "oldest") {
        sortedRes = data
          .filter((item: any) =>
            item.category.toLowerCase().includes(filterValue)
          )
          .sort((a: any, b: any) => {
            const dateA = new Date(a.dateAdded.seconds * 1000);
            const dateB = new Date(b.dateAdded.seconds * 1000);
            return dateA.getTime() - dateB.getTime();
          });
        return sortedRes;
      } else if (selectedSort.value === "price-low-to-high") {
        sortedRes = data
          .filter((item: any) =>
            item.category.toLowerCase().includes(filterValue)
          )
          .sort((a: any, b: any) => a.price - b.price);
        return sortedRes;
      } else if (selectedSort.value === "price-high-to-low") {
        sortedRes = data
          .filter((item: any) =>
            item.category.toLowerCase().includes(filterValue)
          )
          .sort((a: any, b: any) => b.price - a.price);
        return sortedRes;
      }
    };
    const fetchData = async () => {
      // await getAllSortedData("rentals", selectedSort.value).then((res) => {
      //   setFilteredCars(res);
      // });
      setFilteredCars(sortData(cars, selectedSort, selectedCategory));
      //
    };
    fetchData();
    // checkRentalAvailability(cars).then((res: any) => {});
    // console.log("selected category", selectedCategory);
  }, [selectedSort, selectedCategory]);

  return (
    <main
      className={`pt-36 w-full flex flex-col items-center align-middle justify-center mx-auto  ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="w-[90%] py-10">
        <div
          className={`mx-auto p-10  w-auto flex flex-col md:flex-row justify-between ${
            theme === "light" ? "bg-white" : "bg-[#0B0B0B]"
          } rounded-xl`}
        >
          <div className="flex flex-col space-y-3 w-full justify-center align-middle items-start">
            <div className="flex space-x-2 w-full">
              <input
                type="text"
                className={`p-2 w-full lg:w-1/2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:border-transparent ${
                  theme === "light"
                    ? "bg-[#F8F8F8]"
                    : "bg-[#272a2c] border-none"
                } `}
                placeholder="Search for name or number plate..."
                onChange={(e: any) => {
                  setSearchValue(e.target.value.toLowerCase());
                  console.log("rental example: ", cars[0]);
                }}
              />
              <Button
                variant="light"
                className="flex space-x-2  ml-4 text-primary font-bold transition-all text-lg ease-in-out sm:ml-6 rouded-md"
                onClick={() => {
                  console.log("caaaaaars", cars);
                  const res = cars.filter(
                    (car: any) =>
                      car.name.toLowerCase().includes(searchValue) ||
                      car.numberPlate.toLowerCase().includes(searchValue)
                  );
                  // console.log("Filtered Cars: ", res);

                  setCarData(res.slice(indexOfFirstItem, indexOfLastItem));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className={`w-10 h-10 ${
                    theme === "light" ? "text-black" : "text-primary"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </Button>
              <FilterModal
                applyFilters={(filters: any) => {
                  setFilter(filters);
                  console.log("filters", filters);
                }}
              />
            </div>
          </div>

          {user?.role === "host" ||
            (user?.role === "admin" && (
              <Button
                variant="light"
                type="button"
                className="m-2 ml-4 rounded-lg text-xl text-right text-primary font-bold transition-all ease-in-out sm:ml-6 rouded-md"
                onClick={() => router.push("/register-rentals")}
              >
                + Upload rental
              </Button>
            ))}
        </div>

        <div className="flex flex-col mx-auto">
          <Tabs
            aria-label="Grid Order"
            color="primary"
            variant="bordered"
            classNames={{
              tabList: "mx-auto mt-10 text-[#fff] bg-[#888888]",
              tab: "text-xl font-medium hover:opacity-1 text-[#fff]",
              tabContent: "text-[#fff]",
            }}
            // className="mx-auto mt-10"
          >
            <Tab key="newest" title="Newest">
              <div
                className={`grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto`}
              >
                {carData.length > 0 ? (
                  <>
                    {carData
                      .filter(
                        (car: any) =>
                          car.make.includes(filter.make.value) &&
                          car.fuel.includes(filter.fuelType.value) &&
                          car.category.includes(filter.category.value)
                      )
                      .sort((a: any, b: any) => {
                        const dateA = new Date(a.dateAdded.seconds * 1000);
                        const dateB = new Date(b.dateAdded.seconds * 1000);
                        return dateB.getTime() - dateA.getTime();
                      })
                      .map((car: any) => {
                        return (
                          <CarModelCardDashboard
                            car={car}
                            patarideCut={settings.companyCut}
                          />
                        );
                      })}
                  </>
                ) : (
                  <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto">
                    <div className="h-full w-full">
                      <h1 className="text-2xl font-bold text-black dark:text-white">
                        No cars available
                      </h1>
                    </div>
                  </div>
                )}
              </div>
              {/* <Pagination
                itemsPerPage={itemsPerPage}
                data={filteredCars}
                onPageChange={(pageNumber: any, currentPageData: any) => {
                  setCarData(currentPageData);
                }}
              /> */}
            </Tab>
            <Tab key="low-to-high" title="Price: Low to High">
              <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto">
                {carData.length > 0 ? (
                  <>
                    {carData
                      .filter(
                        (car: any) =>
                          car.make.includes(filter.make.value) &&
                          car.fuel.includes(filter.fuelType.value) &&
                          car.category.includes(filter.category.value)
                      )
                      .sort((a: any, b: any) => a.price - b.price)
                      .map((car: any) => {
                        return (
                          <CarModelCardDashboard
                            car={car}
                            patarideCut={settings.companyCut}
                          />
                        );
                      })}
                  </>
                ) : (
                  <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto">
                    <div className="h-full w-full">
                      <h1 className="text-2xl font-bold text-black dark:text-white">
                        No cars available
                      </h1>
                    </div>
                  </div>
                )}
              </div>
              {/* <Pagination
                itemsPerPage={itemsPerPage}
                data={filteredCars}
                onPageChange={(pageNumber: any, currentPageData: any) => {
                  setCarData(currentPageData);
                }}
              /> */}
            </Tab>
            <Tab key="high-to-low" title="Price: High to Low">
              <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto">
                {carData.length > 0 ? (
                  <>
                    {carData
                      .filter(
                        (car: any) =>
                          car.make.includes(filter.make.value) &&
                          car.fuel.includes(filter.fuelType.value) &&
                          car.category.includes(filter.category.value)
                      )
                      .sort((a: any, b: any) => b.price - a.price)
                      .map((car: any) => {
                        return (
                          <CarModelCardDashboard
                            car={car}
                            patarideCut={settings.companyCut}
                          />
                        );
                      })}
                  </>
                ) : (
                  <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto">
                    <div className="h-full w-full">
                      <h1 className="text-2xl font-bold text-black dark:text-white">
                        No cars available
                      </h1>
                    </div>
                  </div>
                )}
              </div>
              {/* <Pagination
                itemsPerPage={itemsPerPage}
                data={filteredCars}
                onPageChange={(pageNumber: any, currentPageData: any) => {
                  setCarData(currentPageData);
                }}
              /> */}
            </Tab>
          </Tabs>
        </div>
        {/* <RentalsGrid carData={filteredCars} /> */}
      </div>
    </main>
  );
}

export default RentalsPage;

export const getServerSideProps: GetServerSideProps<RentalProps> = async (
  ctx
) => {
  const { draftMode = false, params = {} } = ctx;
  // const client = getClient(draftMode ? { token: readToken } : undefined);
  const cars = await getData("rentals");
  const settings: any = await getDocument("settings", "admin");
  // console.log("Server Side Props: ", JSON.parse(JSON.stringify(cars)));

  if (!cars) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cars: JSON.parse(JSON.stringify(cars)),
      settings: JSON.parse(JSON.stringify(settings)),
      draftMode,
      // token: draftMode ? readToken : "",
    },
  };
};
