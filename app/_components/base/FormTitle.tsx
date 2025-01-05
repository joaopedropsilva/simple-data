"use client";

import { useState } from "react";
import { Input } from "@headlessui/react";

export function FormTitle({ text }: { text: string; }) {
    const [title, setTitle] = useState<string>(text);

    return (
        // Make input width grow with text size
        <div className="w-full flex justify-center mb-1">
            <Input
                type="text"
                name="form-title"
                className="bg-transparent w-max border-none text-xl p-1 text-slate-300 font-bold focus:outline-none data-[focus]:outline-1 data-[focus]:outline-offset-2 data-[focus]:outline-white/25 rounded-md"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
            />
        </div>
    );
}

