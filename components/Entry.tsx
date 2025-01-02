import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { PlusIcon } from "@heroicons/react/24/solid"


interface EntryProps {
    id?: string;
    name?: string;
    created_at?: Date;
    template_id?: string;
}

export function Entry({
    id,
    name,
    created_at,
    template_id
}: EntryProps) { 
    const fields = (
        <div className="w-full flex items-center text-xs bg-gray-800 justify-between p-2 rounded-lg">
            <h4 className="text-slate-300 italic p-1">
                Adicionar um item
            </h4>
            <div className="p-1">
                <PlusIcon className="text-slate-300 size-6"/>
            </div>
        </div>
    );

    return (
        <>
            <header className="mx-auto flex p-2">
                <h1 className="text-xl p-1 text-slate-300 font-bold">
                    Nova entrada
                </h1>
            </header>
            <form className="w-full p-2">
                <fieldset className="w-full flex flex-col items-center justify-center">
                    <Field label="Selecione um template:" type="selectbox" />
                    <div className="bg-gray-600 w-full p-4 rounded-md">
                        {fields}
                    </div>
                </fieldset>
                <fieldset className="w-full flex justify-center gap-2 items-center py-2">
                    <Button text="Cancelar" />
                    <Button text="Criar" />
                </fieldset>
            </form>
        </>
  );
}

