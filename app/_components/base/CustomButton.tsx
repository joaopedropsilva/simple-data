import { Button } from "@headlessui/react";
import { ReactNode } from "react";
import clsx from "clsx";

interface CustomButtonProps {
    text?: string;
    icon?: ReactNode;
    spanOver?: "right" | "left" | "container";
}

export function CustomButton(
{
    text,
    icon,
    spanOver = "container" 
}: CustomButtonProps) {
        return (
            <Button
                className={clsx(
                    "inline-flex gap-1 items-center justify-center p-1 bg-slate-700 group",
                    "text-xs text-slate-300 font-semibold rounded-md",
                    "focus:outline-none data-[hover]:bg-slate-600 data-[focus]:outline-1 data-[focus]:outline-white/25",
                    spanOver === "right" && "absolute inset-y-0 right-0",
                    spanOver === "left" && "absolute inset-y-0 left-0",
                    spanOver === "container" && "w-full")}
            >
                {text}
                {icon}
            </Button>
        );
}

