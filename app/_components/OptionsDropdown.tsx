"use client";

import {
    PlusCircleIcon,
    SquaresPlusIcon,
    DocumentTextIcon,
    PencilSquareIcon
} from "@heroicons/react/24/outline";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";

export function OptionsDropdown() {
    return (
        <Menu as ="div" className="flex items-center relative">
            <MenuButton className="rounded-lg bg-slate-800 data-[open]:bg-slate-700 hover:bg-slate-700 p-1">
                <PlusCircleIcon className="size-4 text-slate-300" aria-hidden="true" /> 
            </MenuButton>
            <MenuItems
                transition
                anchor="bottom"
                className="w-52 rounded-lg border border-white/5 text-xs/6 mt-2 transition duration-100 ease-out"
            >
                <MenuItem as="div">
                    <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 p-1 pl-2 w-full">
                        <SquaresPlusIcon className="size-4 fill-slate-300/60" /> 
                        New template
                    </button>
                </MenuItem>
                <MenuItem as="div">
                    <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 p-1 pl-2 w-full">
                        <DocumentTextIcon className="size-4 fill-slate-300/60" /> 
                        New entry
                    </button>
                </MenuItem>
                <MenuItem as="div">
                    <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 p-1 pl-2 w-full">
                        <PencilSquareIcon className="size-4 fill-slate-300/60" />
                        Edit current template
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

