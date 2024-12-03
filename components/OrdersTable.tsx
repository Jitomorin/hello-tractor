import React, { useMemo, useEffect, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import { Button, PageButton } from "../contexts/Button";
import { classNames, customersData } from "../contexts/utils";
import { DOTS, useCustomPagination } from "./useCustomPagination";
import ProfileColumn from "./ProfileColumn";
import ListingColumn from "./ListingColumn";
import { formatNumber } from "@/utils/formatNumber";
import { StatusPill } from "./StatusPill";

export function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  placeholder,
}: any) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="flex justify-between  pt-10 pb-10 ">
      {/* <p>search</p> */}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="p-2 w-1/2  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="Search for booking..."
        type="search"
      />
      {/* <button className="bg-white rounded-xl p-4 border-1 cursor-pointer">
        Export
      </button> */}
    </span>
  );
}

export function StatusContainer({ value }: any) {
  const isApproved = value;

  return <StatusPill status={value} />;
}

export function AvatarCell({ value, column, row }: any) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-20 w-20">
        <img
          className="h-20 w-20"
          src={row.original.listing.images[0]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.numAccessor]}
        </div>
      </div>
    </div>
  );
}
export function ActionCell({ value, column, row, router }: any) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          router.push(`/dashboard/orders/${value.row.original.uid}`);
        }}
        className="text-indigo-600 hover:text-indigo-900 hover:underline "
      >
        Open
      </button>
    </div>
  );
}
const OrdersTable = ({ placeholder, orders, router }: any) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const data = useMemo(() => orders, []);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: (value: any) =>
          `${value.listing.make} ${value.listing.model}`,
        Cell: AvatarCell,
        imgAccessor: (value: any) => `${value.listing.images[0]}`,
        numAccessor: "uid",
      },
      {
        Header: "Payment Details",
        accessor: (value: any) =>
          `Ksh ${formatNumber(Number(value.listing.price))}`,
      },
      {
        Header: "Location",
        accessor: (value: any) =>
          `${value.listing.streetAddress}, ${value.listing.city} ${value.listing.country}`,
      },
      {
        Header: "Created at",
        accessor: (value: any) => {
          const date = new Date(
            value.createdAt.seconds * 1000
          ).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }); // Create a Date object from the timestamp
          return `${date}`;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusContainer,
      },
      {
        Header: "Action",
        Cell: (value: any, row: any) => (
          <ActionCell router={router} value={value} row={row} />
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  }: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );
  const { pageIndex } = state;
  const paginationRange = useCustomPagination({
    totalPageCount: pageCount,
    currentPage: pageIndex,
  });
  // console.log(paginationRange);

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        placeholder={placeholder}
      />
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 ">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-primary">
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-6 py-5 text-left text-20 font-medium text-white uppercase rounded-sm tracking-wider"
                        >
                          {column.render("Header")}
                          {column.id === "selection" &&
                            column.render("Summary")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row: any, i: any) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-10 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 flex items-center text-center justify-center pt-10">
        <div className="flex-1 flex justify-between md:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div
          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          aria-label="Pagination"
        >
          <div
            className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10"
            aria-label="Pagination"
          >
            {paginationRange?.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <PageButton key={index}>...</PageButton>;
              }

              if (pageNumber - 1 === pageIndex) {
                return (
                  <PageButton
                    key={index}
                    className=" active:bg-gray-500 active:border-gray-300"
                    onClick={() => gotoPage(pageNumber - 1)}
                  >
                    {pageNumber}
                  </PageButton>
                );
              }

              return (
                <PageButton
                  key={index}
                  className="active:bg-gray-500 active:border-gray-300"
                  onClick={() => gotoPage(pageNumber - 1)}
                >
                  {pageNumber}
                </PageButton>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
