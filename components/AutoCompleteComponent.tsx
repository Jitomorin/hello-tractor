import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

export default function AutoCompleteComponent({
  data,
  placeholder,
  make,
  setMake,
}: any) {
  const [selectedData, setSelectedData] = useState(data[0]);
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((item: any) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={make}
      onChange={(e) => {
        setMake(e);
      }}
      onClose={() => setQuery("")}
      className="w-full max-w-[708px]"
    >
      <ComboboxInput
        aria-label="Assignee"
        placeholder={placeholder}
        displayValue={(item: any) => item}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base"
      />
      <ComboboxOptions
        anchor="bottom"
        className="shadow-sm ring-1 ring-inset ring-gray-300 empty:invisible ml-0 w-[320px] max-w-[708px] max-h-[200px] z-10"
      >
        {filteredData.map((item: any, index: number) => (
          <ComboboxOption
            key={item.id}
            value={item.label}
            className="data-[focus]:bg-blue-100 hover:cursor-pointer bg-white w-full p-2"
          >
            {item.label}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
