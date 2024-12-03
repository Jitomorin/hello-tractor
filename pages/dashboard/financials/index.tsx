import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DeliveriesTable from "@/components/BookingsTable";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  getFilteredData,
  getMultipleFilteredData,
} from "@/utils/firebase/firestore";
import BookingsTable from "@/components/BookingsTable";
import Link from "next/link";
import { classNames } from "@/contexts/utils";
import { useRouter } from "next/router";
import { getMonthFromTimestamp, getUrl } from "@/utils/formatString";
import EarningsChart from "@/components/DoughnutChart";
import DoughnutChart from "@/components/DoughnutChart";
import LineChart from "@/components/LineChart";
import { Button, Spinner } from "@nextui-org/react";
import { calculatePrice, formatNumber } from "@/utils/formatNumber";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BarChart from "@/components/BarChart";
import RequestPaymentModal from "@/components/RequestPaymentModal";
import Snackbar from "@/components/Snackbar";

function Financials() {
  const [orders, setOrders] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(true);
  const { user, loading }: any = useAuthContext();
  const [lineChartData, setLineChartData]: any = useState([]);
  const router = useRouter();
  const [labels, setLabels]: any = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]);
  const [data, setData]: any = useState([]);
  const [checkedoutData, setCheckedoutData]: any = useState([]);
  const [admins, setAdmins] = useState([]);
  const doughnutDataAll = {
    labels: data.map((res: any) => {
      return res.name;
    }),
    datasets: [
      {
        label: "Earnings",
        data: data.map((res: any) => {
          return res.amount;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const doughnutDataPaid = {
    labels: checkedoutData.map((res: any) => {
      return res.name;
    }),
    datasets: [
      {
        label: "Earnings",
        data: checkedoutData.map((res: any) => {
          return res.amount;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    async function getListOfAdmins() {
      await getFilteredData("users", "role", "==", "admin").then((res: any) => {
        setAdmins(res);
      });
    }
    function processData(transactions: any[]) {
      const monthsSet = new Set<string>();
      transactions.forEach((transaction) => {
        const amount = calculatePrice(
          transaction.rental.price,
          transaction.selectedDates.startDate,
          transaction.selectedDates.endDate
        );
        const timestamp = transaction.timestamp.seconds * 1000;
        const month = getMonthFromTimestamp(timestamp);
        monthsSet.add({
          month: month,
          amount: amount,
          name: transaction.rental.name,
        });
      });

      const uniqueMonths = Array.from(monthsSet);
      return uniqueMonths;
    }

    const fetchData = async () => {
      setOrderLoading(true);
      await getMultipleFilteredData("orders", [
        { field: "rental.userID", operator: "==", value: user?.uid },
      ]).then((res: any) => {
        // sort deliveries by date in field called delivery_timestamp
        res.sort((a: any, b: any) => {
          return b.createdAt - a.createdAt;
        });
        setOrders(res);
        const timestampSort = res.sort((a: any, b: any) => {
          return a.timestamp - b.timestamp;
        });
        // console.log("timestamp sort:", timestampSort);
        setData(processData(timestampSort));
        setCheckedoutData(
          processData(timestampSort.filter((item: any) => item.checkedOut))
        );
        // console.log("heeeaaad", checkedoutData);
        setOrderLoading(false);
        // console.log("res: ", res);
      });
    };
    if (loading) return;
    else {
      if (!user) {
        router.push("/login");
      }
      fetchData();
      getListOfAdmins();
    }
  }, [user]);

  const addUpTotal = (data: any) => {
    let total = 0;
    data.map((order: any) => {
      total += calculatePrice(
        order.rental.price,
        order.selectedDates.startDate,
        order.selectedDates.endDate
      );
    });
    return total;
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Financials" />
        <div className="min-h-screen bg-white shadow-lg rounded=lg flex flex-col items-center p-4">
          <h1 className="text-3xl font-bold mb-6 mt-4">Earnings Overview</h1>
          {orderLoading ? (
            <div className="flex w-full h-full justify-center align-middle items-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full h-full flex-col">
              {/* <div className="w-full max-w-4xl mb-6">
                <LineChart data={lineData} />
              </div> */}
              <div className="w-full mx-auto flex-col ">
                <Tabs
                  classNames={{
                    tabList: "mx-auto mt-10 ",
                    tab: "text-xl font-medium ",
                    tabContent: "",
                  }}
                  aria-label="Options"
                >
                  <Tab key="all-earnings" title="All Earnings">
                    <>
                      <div className="flex flex-col w-full h-full">
                        <h1 className="text-2xl font-semibold my-4">
                          {`Total: Ksh ${formatNumber(addUpTotal(orders))}`}
                        </h1>
                        <BarChart text="All earnings" data={doughnutDataAll} />
                      </div>
                    </>
                  </Tab>
                  <Tab key="checkedout-earnings" title="Checked-out Earnings">
                    <>
                      <div className="flex flex-col w-full h-full">
                        <h1 className="text-2xl font-semibold my-4">
                          {`Total: Ksh ${formatNumber(
                            addUpTotal(
                              orders.filter((order: any) => order.checkedOut)
                            )
                          )}`}
                        </h1>
                        <BarChart
                          text="Withdrawn earnings"
                          data={doughnutDataPaid}
                        />
                      </div>
                    </>
                  </Tab>
                </Tabs>
              </div>
              <div className="my-8">
                <RequestPaymentModal
                  user={user}
                  availableAmount={addUpTotal(
                    orders.filter((order: any) => !order.checkedOut)
                  )}
                  callSnackbar={(message: string) => {
                    setSnackbarMessage(message);
                    setSnackbarOpen(true);
                  }}
                  admins={admins}
                />
              </div>
            </div>
          )}
        </div>
        <Snackbar
          message={snackbarMessage}
          isVisible={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        />
      </div>
    </DefaultLayout>
  );
}

export default Financials;
