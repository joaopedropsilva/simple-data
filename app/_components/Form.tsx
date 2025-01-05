import { Button } from "@headlessui/react";

interface FormButtonProps {
    text: string;
}

function FormButton({ text }: FormButtonProps) {
    return (
        <Button
            className="text-xs text-slate-300 font-bold rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-center p-2 hover:bg-gray-500"
        >
            {text}
        </Button>
    );
}

export function Form() { 
    return (
        <form className="mt-16 max-w-[340px]">
            <div className="w-full p-2">
                <h1 className="text-xl p-1 text-slate-300 font-bold">
                    Novo template
                </h1>
                <div className="w-full flex flex-col items-center justify-center">
                </div>
                <div className="w-full flex justify-center gap-2 items-center py-2">
                    <FormButton text="Cancelar" />
                    <FormButton text="Criar" />
                </div>
            </div>
        </form>
  );
}

