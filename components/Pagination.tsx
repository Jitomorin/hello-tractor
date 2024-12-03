import React, { useEffect, useState } from "react";

interface PaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  onPageChange: (pageNumber: number, currentPageData: T[]) => void;
}

const Pagination = <T extends unknown>({
  data,
  itemsPerPage,
  onPageChange,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPageData = data.slice(indexOfFirstItem, indexOfLastItem);
    onPageChange(pageNumber, currentPageData);
  };

  // useEffect(() => {
  //   handlePageChange(1);
  // }, []);

  return (
    <>
      <nav className="flex justify-center mt-4 ">
        <ul className="flex space-x-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                className={`hover:scale-105 transition-all ease-in-out ${
                  page === currentPage && "text-[#F8D521]"
                } hover:text-[#F8D521]  p-2`}
                onClick={() => handlePageChange(page)}
              >
                <span className="text-xl font-semibold">{page}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
