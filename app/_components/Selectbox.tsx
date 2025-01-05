"use client";

import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption
} from "@headlessui/react";

interface Option {
    id: string;
    value: string;
}

interface SelectboxProps {
    options: Option[];
}

export function Selectbox({ options }: SelectboxProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] =
        useState<Option>(
            options.length === 0
                ? { id: "", value: "" } as Option
                : options[0]
        );

    const filteredOptions =
        query === ""
            ? options
            : options.filter(option => {
                    return option
                            .value
                            .toLowerCase()
                            .includes(query.toLowerCase())
                });

    return (
        <Combobox
            value={selected}
            onChange={(option: Option) => setSelected(option)}
            onClose={() => setQuery("")}
        >
            <div className="relative">
                <ComboboxInput
                    displayValue={(option: Option) => option?.value}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                </ComboboxButton>
                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                >
                    {
                        filteredOptions.map(option => (
                            <ComboboxOption
                                key={option.id}
                                value={option}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                            >
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6 text-white">
                                    {option.value}
                                </div>
                            </ComboboxOption>
                        ))
                    }
                </ComboboxOptions>
            </div>
        </Combobox>
    );
}
