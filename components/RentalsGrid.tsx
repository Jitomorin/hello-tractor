import React, { useState } from "react";
import Pagination from "./Pagination";
import CarModelCardDashboard from "./CarModelCarDashboard";
import { getDocument } from "@/utils/firebase/firestore";

const RentalsGrid = (props: any) => {
  const { carData, settings }: any = props;
  const [currentPage, setCurrentPage] = useState(1);
  const patarideCut = parseFloat(settings.companyCut);
  const [data, setData] = useState(carData.carData);
  console.log("car data:", settings);
  return (
    <>
      <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-10 text-center py-12 px-auto mx-auto">
        {data !== null ? (
          <>
            {data.map((car: any) => {
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
      <Pagination
        itemsPerPage={2}
        data={data}
        onPageChange={(pageNumber: any, currentPageData: any) => {}}
      />
    </>
  );
};

export default RentalsGrid;

export const getServerSideProps: any = async (ctx: any) => {
  const { params = {} } = ctx;
  //   console.log("params", params);
  const settings: any = await getDocument("settings", "admin");

  if (!settings) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
      //   rentalSlug: rentalSlug,
    },
  };
};
