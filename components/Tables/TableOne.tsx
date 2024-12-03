import styled from "styled-components";
import { BRAND } from "../../utils/data";
import Image from "next/image";

const DetailsButton = styled.div`
  background-color: #f8d521;
  padding: 1rem 1rem;
  border-radius: 0.3rem;
  transition: all 0.3s;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  &:hover {
    scale: 1.07;
  }
`;

const transactionData: any[] = [
  {
    number: "1",
    car_number: "KAV 123",
    user: "Alex Norman",
    status: "Completed",
    amount: 8000,
  },
  {
    number: "2",
    car_number: "KAV 124",
    user: "Alex Norman",
    status: "Completed",
    amount: 8000,
  },
  {
    number: "3",
    car_number: "KAV 125",
    user: "John Doe",
    status: "Pending",
    amount: 7500,
  },
  {
    number: "4",
    car_number: "KAV 126",
    user: "Jane Smith",
    status: "Pending",
    amount: 6500,
  },
  {
    number: "5",
    car_number: "KAV 127",
    user: "Emma Brown",
    status: "Completed",
    amount: 8500,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-md shadow-md bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Transactions
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No.</h5>
          </div>
          <div className="p-2 text-left xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Car no.
            </h5>
          </div>
          <div className="p-2 text-left xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User
            </h5>
          </div>
          <div className="hidden p-2 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className=" p-2 text-center sm:block xl:p-5"></div>
        </div>

        {transactionData.map((transaction, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-6 ${
              key === transactionData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-start  p-2 xl:p-5">
              <p className=" text-black dark:text-white sm:block">
                {transaction.number}
              </p>
            </div>

            <div className="flex items-start justify-start p-2 xl:p-5">
              <p className="text-black dark:text-white">
                {transaction.car_number}K
              </p>
            </div>

            <div className="flex items-start justify-start p-2 xl:p-5">
              <p className="text-meta-3">{transaction.user}</p>
            </div>

            <div className="hidden items-start justify-start p-2 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{transaction.status}</p>
            </div>

            <div className="hidden items-start justify-start p-2 sm:flex xl:p-5">
              <p className="text-meta-5">{`Ksh ${transaction.amount}`}</p>
            </div>
            <div className=" items-center text-center justify-center p-2 sm:flex xl:p-5">
              <DetailsButton>Details</DetailsButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
