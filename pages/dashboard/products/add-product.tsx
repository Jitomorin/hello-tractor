import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  AutocompleteSection,
  Card,
  CardBody,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeftToLine, Ellipsis, SearchIcon, Tractor } from "lucide-react";
import { useRouter } from "next/navigation";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { tractorMakes } from "@/utils/product-data";
import "./style.css";
import AutoCompleteComponent from "@/components/AutoCompleteComponent";
import { useEffect, useState } from "react";
import Image from "next/image";
import { africanCountries } from "@/utils/data";
import { useAuthContext } from "@/contexts/AuthContext";
import { uploadListingImage } from "@/utils/firebase/storage";
import Snackbar from "@/components/Snackbar";
import { BackButton } from "@/components/BackButton";

export default function AddProduct() {
  const { user }: any = useAuthContext();
  const [uploadedImages, setUploadedImages]: any = useState<any[]>([]);
  const [isDragging, setIsDragging]: any = useState(false);
  const [model, setModel]: any = useState("");
  const [make, setMake]: any = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState(""); // Default value can be set as needed
  const [age, setAge]: any = useState(0);
  const [hours, setHours]: any = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [price, setPrice]: any = useState(0);
  const [description, setDescription]: any = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const resetForm = () => {
    setUploadedImages([]);
    setIsDragging(false);
    setModel("");
    setMake("");
    setStreetAddress("");
    setCity("");
    setStateProvince("");
    setPostalCode("");
    setCountry("");
    setAge(0);
    setHours(0);
    setPrice(0);
    setDescription("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).slice(
      0,
      6 - uploadedImages.length
    ); // Limit to 6 images
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages((prev: any) => [...prev, ...newImages]);
    console.log(newImages);
  };
  const validateImages = () => {
    if (uploadedImages.length === 0) {
      return false;
    }
    return true;
  };
  const validateForm = () => {
    // List of required fields
    const requiredFields = [
      make,
      model,
      description,
      streetAddress,
      city,
      stateProvince,
      postalCode,
      country,
    ];

    // Check if any required field is missing
    const hasEmptyFields = requiredFields.some((field) => !field);
    if (hasEmptyFields) return false;

    // Numeric validations
    const invalidNumericFields = [
      { value: age, condition: (value: any) => value <= 0 },
      { value: hours, condition: (value: any) => value < 0 },
      { value: price, condition: (value: any) => value <= 0 },
    ];

    const hasInvalidNumbers = invalidNumericFields.some(
      ({ value, condition }) => condition(value)
    );
    if (hasInvalidNumbers) return false;

    // Image validation
    if (uploadedImages.length === 0) return false;

    return true;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(
      0,
      6 - uploadedImages.length
    ); // Limit to 6 images
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages((prev: any) => [...prev, ...newImages]);
    console.log(newImages);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const removeImage = (index: number) => {
    setUploadedImages((prev: any) =>
      prev.filter((_: any, i: any) => i !== index)
    );
  };

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return (
    <DefaultLayout>
      <main className="flex justify-center flex-col p-10">
        <BackButton
          onClickEvent={() => {
            router.push("/dashboard/products");
          }}
        />
        <div>
          <h2 className="text-4xl font-semibold text-gray-900">
            Add new product
          </h2>
          <p className="mt-3 text-base text-gray-600 mb-6">
            Every product will need to be approved before it gets publicly
            diplayed
          </p>
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
              <Tab
                key="tractor"
                title={
                  <div className="flex items-center space-x-2 font-semibold font-poppins text-xl">
                    <Tractor />
                    <span>Tractor</span>
                  </div>
                }
              >
                <div className="space-y-12 mt-8">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-3xl font-semibold text-gray-900">
                      Tractor Listing
                    </h2>

                    <div>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="make"
                            className="block text-base font-medium text-gray-900"
                          >
                            Make
                          </label>
                          <div className="autocomplete mt-2">
                            <AutoCompleteComponent
                              setMake={setMake}
                              make={make}
                              placeholder="Search the make of your tractor"
                              data={tractorMakes}
                            />
                            {!make && (
                              <p className="mt-1 text-sm text-red-500">
                                Make is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="model"
                            className="block text-base font-medium text-gray-900"
                          >
                            Model
                          </label>
                          <div className="mt-2">
                            <input
                              id="model"
                              name="model"
                              type="text"
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                              className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                                !model ? "ring-gray-300 " : "ring-gray-300"
                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base`}
                            />
                            {!model && (
                              <p className="mt-1 text-sm text-red-500">
                                Model is required.
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="description"
                            className="block text-base font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <p className="mt-3 text-base text-gray-600">
                            Write a creative description for your tractor.
                          </p>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                                !description
                                  ? " ring-gray-300"
                                  : "ring-gray-300"
                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base`}
                              defaultValue={""}
                            />
                            {!description && (
                              <p className="mt-1 text-sm text-red-500">
                                Description is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="photo"
                            className="block text-base font-medium text-gray-900"
                          >
                            Upload pictures of your tractor.
                          </label>
                          <div className="mt-2 flex items-center gap-x-3">
                            {uploadedImages.map((image: any, index: any) => (
                              <div key={index}>
                                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-300">
                                  <Image
                                    src={image.url}
                                    alt={`Uploaded image ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 h-6 w-6 transition-all ease-in-out hover:scale-[1.03] rounded-full bg-gray-800 text-white text-sm flex items-center justify-center"
                                  >
                                    &times;
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <div
                            className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 transition ${
                              isDragging
                                ? "border-blue-500 bg-blue-50 shadow-lg"
                                : "border-gray-900/25"
                            }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                          >
                            <div className="text-center">
                              <PhotoIcon
                                aria-hidden="true"
                                className={`mx-auto size-12 ${
                                  isDragging ? "text-blue-500" : "text-gray-300"
                                }`}
                              />
                              <div className="mt-4 flex text-base text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs/5 text-gray-600">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                          {uploadedImages.length <= 0 && (
                            <p className="mt-2 text-sm text-red-600">
                              {`Upload at least one Image`}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="block text-base font-medium text-gray-900"
                          >
                            Price (Ksh)
                          </label>
                          <div className="mt-2">
                            <input
                              id="price"
                              name="price"
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                                !price ? " ring-gray-300" : "ring-gray-300"
                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base`}
                            />
                            {!price && (
                              <p className="mt-1 text-sm text-red-500">
                                Price is required.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pb-12 mt-10">
                      <h2 className="text-base/7 font-semibold text-gray-900">
                        Additional Information
                      </h2>
                      <p className="mt-1 text-base text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="age"
                            className="block text-base font-medium text-gray-900"
                          >
                            Year of release
                          </label>
                          <div className="mt-2">
                            <input
                              id="age"
                              name="age"
                              type="number"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                                !age ? " ring-gray-300" : "ring-gray-300"
                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base`}
                            />
                            {!age && (
                              <p className="mt-1 text-sm text-red-500">
                                Age is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-base font-medium text-gray-900"
                          >
                            Hours Used
                          </label>
                          <div className="mt-2">
                            <input
                              id="hours-used"
                              name="hours-used"
                              type="number"
                              value={hours}
                              autoComplete="hours"
                              onChange={(e) => {
                                setHours(e.target.value);
                              }}
                              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
                            />
                            {!hours && (
                              <p className="mt-1 text-sm text-red-500">
                                Hours is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              onChange={(e) => setCountry(e.target.value)} // Handle change here
                              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
                            >
                              <option value="">Select a country</option>
                              {africanCountries.map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                            {!country && (
                              <p className="mt-1 text-sm text-red-500">
                                Country is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <label
                            htmlFor="street-address"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="street-address"
                              type="text"
                              value={streetAddress}
                              onChange={(e) => {
                                setStreetAddress(e.target.value);
                              }}
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
                            />
                            {!streetAddress && (
                              <p className="mt-1 text-sm text-red-500">
                                Street Address is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="city"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              value={city}
                              name="city"
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                              type="text"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
                            />
                            {!city && (
                              <p className="mt-1 text-sm text-red-500">
                                City is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              id="region"
                              value={stateProvince}
                              onChange={(e) => {
                                setStateProvince(e.target.value);
                              }}
                              name="region"
                              type="text"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
                            />
                            {!stateProvince && (
                              <p className="mt-1 text-sm text-red-500">
                                State / Province is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              value={postalCode}
                              id="postal-code"
                              name="postal-code"
                              type="text"
                              onChange={(e) => {
                                setPostalCode(e.target.value);
                              }}
                              autoComplete="postal-code"
                              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
                            />
                            {!postalCode && (
                              <p className="mt-1 text-sm text-red-500">
                                Zip / Postal code is required.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-2">
                    <button
                      type="button"
                      className="text-xl hover:text-rose-800 hover:bg-rose-300 transition-all ease-in-out p-2 rounded-md font-semibold text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      onClick={() => {
                        const data = {
                          make,
                          model,
                          description,
                          price,
                          age,
                          city,
                          postalCode,
                          streetAddress,
                          uploadedImages,
                          country,
                          hours,
                        };
                        console.log(data);
                        console.log(validateForm());
                        if (!loading) {
                          setLoading(true);
                          if (!validateForm()) {
                            setSnackbarMessage(
                              "Please confirm if all fields are properly entered."
                            );
                            setSnackbarOpen(true);
                            setLoading(false);
                            return;
                          }
                          const uid = uuidv4();
                          const data = {
                            make,
                            model,
                            description,
                            price,
                            age,
                            city,
                            postalCode,
                            streetAddress,
                            country,
                            hours,
                          };
                          uploadListingImage(
                            user?.uid,
                            uploadedImages,
                            uid,
                            data,
                            "listings"
                          )
                            .then(() => {
                              resetForm();
                              setSnackbarMessage(
                                "The Listing has been added, wait for approval before it is made public."
                              );
                              setSnackbarOpen(true);
                              setLoading(false);
                            })
                            .catch((e) => {
                              setSnackbarMessage(e.message);
                              setSnackbarOpen(true);
                              setLoading(false);
                            });
                        }
                      }}
                      className="rounded-md bg-[#1C4D9C] px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-[#173e7e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all ease-in-out"
                    >
                      {loading ? <Spinner color="white" /> : `Save`}
                    </button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <Snackbar
          message={snackbarMessage}
          isVisible={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        />
      </main>
    </DefaultLayout>
  );
}
