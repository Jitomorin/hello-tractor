"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export default function ComboBox({ users }: any) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(users[1]);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="mx-auto h-screen w-52 pt-20">
      <Combobox value={selected} onChange={(value: any) => setSelected(value)}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(person: any) => person?.name}
            onChange={(event: any) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
          >
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{person.name}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
}
