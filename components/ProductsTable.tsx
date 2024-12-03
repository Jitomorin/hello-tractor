import { useEffect, useState } from "react";
import ProfileColumn from "./ProfileColumn";
import Snackbar from "./Snackbar";
import RegisterUserModal from "./RegisterUserModal";
import ListingColumn from "./ListingColumn";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lindsay.walton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function ProductsTable({ products, user }: any) {
  const [openProduct, setOpenProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(products[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  console.log("rentals: ", products);
  console.log("filterd rentals", filteredProducts);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="w-full">
      {filteredProducts.length > 0 ? (
        <ListingColumn
          listing={selectedProduct}
          open={openProduct}
          setOpen={setOpenProduct}
          callSnackBar={(message: string) => {
            setSnackbarMessage(message);
            setSnackbarOpen(true);
          }}
        />
      ) : (
        <></>
      )}

      <RegisterUserModal open={openModal} setOpen={setOpenModal} />
      <div className="lg:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            My Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">{`A list of all products posted by ${user.fullName}.`}</p>
          <input
            type="text"
            className="p-2 w-1/2  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Search for name, make, or number plate..."
            onChange={(e: any) => {
              const res = products.filter(
                (product: any) =>
                  product.make
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  product.model
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  product.uid
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
              );
              // console.log("Filtered Cars: ", res);
              setFilteredProducts(res);
            }}
          />
        </div>

        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  ></th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Make
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Number Plate
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Approved
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    {/* <span className="sr-only">Edit</span> */}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredProducts.length > 0 ? (
                  <>
                    {filteredProducts.map((person: any) => (
                      <tr key={person.uid}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                className="h-11 w-11 "
                                src={person!.image[0]}
                                alt=""
                              />
                            </div>
                            {/* <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {person.fullName}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person.email}
                          </div>
                        </div> */}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md  px-2 py-1 text-lg font-medium text-black ">
                            {person!.name}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md  px-2 py-1 text-lg font-medium text-black ">
                            {person!.uid}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{person.make}</div>
                          {/* <div className="mt-1 text-gray-500">
                        {person.department}
                      </div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{person.model}</div>
                          {/* <div className="mt-1 text-gray-500">
                        {person.department}
                      </div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {person.numberPlate}
                          </div>
                          {/* <div className="mt-1 text-gray-500">
                        {person.department}
                      </div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {person!.isApproved ? (
                            <div className="mt-8 inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                              Approved
                            </div>
                          ) : (
                            <div className="mt-8 inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-700 ring-1 ring-inset ring-green-600/20">
                              Not Approved
                            </div>
                          )}
                        </td>

                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                          <button
                            onClick={() => {
                              setSelectedProduct(person);
                              setOpenProduct(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 hover:underline "
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>No Products Found</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Snackbar
        message={snackbarMessage}
        isVisible={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      />
    </div>
  );
}
