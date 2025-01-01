import { ReactNode } from "react"


interface WidgetProps {
    children: ReactNode;
}

export function Widget({ children }: WidgetProps) {
    return (
        <section className="absolute bg-gray-700 rounded-lg flex flex-col p-4 align-center w-[300px] max-h-[480px]">
            {children}
        </section>
    );
}

