import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Range } from "react-range";
import { tractorMakes } from "@/utils/product-data";
import { FilterIcon } from "lucide-react";

export default function FilterModal({ applyFilters, filters }: any) {
  const filtersOptions: any = {
    makes: {
      id: "make",
      name: "Make",
      options: [{ value: "", label: "All" }, ...tractorMakes],
    },
    priceRange: [
      0,
      5000000, // Adjust max price as per your requirement
    ],
  };
  const { theme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedMake, setSelectedMake] = useState(
    filtersOptions.makes.options[0]
  );
  const [priceRange, setPriceRange] = useState<number[]>(filters.priceRange);

  const handleApplyFilters = () => {
    const appliedFilters = {
      make: selectedMake,
      priceRange,
    };
    applyFilters(appliedFilters);
    onClose();
  };

  const handleResetFilters = () => {
    setSelectedMake(filtersOptions.makes.options[0]);
    setPriceRange([filtersOptions.priceRange[0], filtersOptions.priceRange[1]]);
  };

  return (
    <>
      <button
        className="hover:scale-[1.03] rounded-none text-primary text-lg"
        onClick={onOpen}
      >
        <FilterIcon className="size-8" />
      </button>
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent
          className={`rounded-lg shadow-lg p-4 ${
            theme === "light" ? "" : "text-white"
          }`}
        >
          <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
          <ModalBody>
            <div className="flex flex-col space-y-4">
              {/* Make Filter */}
              <div className="flex flex-col space-y-2">
                <label className="text-left font-semibold text-xl">Make</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="rounded-none text-lg text-primary-800"
                      variant="light"
                    >
                      {selectedMake.label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions text-lg">
                    {filtersOptions.makes.options.map(
                      (make: any, index: number) => (
                        <DropdownItem
                          key={index}
                          className="rounded-none text-lg"
                          onClick={() => setSelectedMake(make)}
                        >
                          {make.label}
                        </DropdownItem>
                      )
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col space-y-2">
                <label className="text-left font-semibold text-xl">
                  Price Range
                </label>
                <Range
                  step={500}
                  min={filtersOptions.priceRange[0]}
                  max={filtersOptions.priceRange[1]}
                  values={priceRange}
                  onChange={(values) => {
                    console.log(values);
                    setPriceRange(values);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        height: "10px",
                        width: "100%",
                        background: "#ccc",
                      }}
                      className="rounded bg-gray-300"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="w-4 h-4 rounded-full bg-primary border border-gray-300"
                    />
                  )}
                />
                <div className="flex justify-between text-lg mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={handleResetFilters}
              className="rounded-lg"
              color="danger"
              variant="light"
            >
              Reset
            </Button>
            <Button
              className="rounded-lg"
              color="primary"
              onPress={handleApplyFilters}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
