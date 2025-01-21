import { Button } from "@headlessui/react";
import { ReactNode } from "react";
import clsx from "clsx";

interface CustomButtonProps {
    type: "button" | "submit" | "reset";
    text?: string;
    icon?: ReactNode;
    spanOver?: "right" | "left" | "container";
    colorAccent?: number;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CustomButton(
{
    type,
    text,
    icon,
    onClick,
    colorAccent =  700,
    spanOver = "container",
}: CustomButtonProps) {
        return (
            <Button
                type={type}
                onClick={onClick}
                className={clsx(
                    `inline-flex gap-1 items-center justify-center p-1 bg-slate-${colorAccent} group`,
                    "text-xs text-slate-300 font-semibold rounded-md",
                    `focus:outline-none data-[hover]:bg-slate-${colorAccent - 100} data-[focus]:outline-1 data-[focus]:outline-white/25`,
                    spanOver === "right" && "absolute inset-y-0 right-0",
                    spanOver === "left" && "absolute inset-y-0 left-0",
                    spanOver === "container" && "w-full h-full")}
            >
                {text}
                {icon}
            </Button>
        );
}

