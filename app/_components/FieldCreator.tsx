import { PlusIcon } from "@heroicons/react/24/solid";

function AddFieldButton() {
    <div className="w-full flex items-center text-xs bg-gray-800 justify-between p-2 rounded-lg">
        <h4 className="text-slate-300 italic p-1">
            Adicionar um item
        </h4>
        <div className="p-1">
            <PlusIcon className="text-slate-300 size-6"/>
        </div>
    </div>
}

export function FieldCreator() {
    return (
        <div className="bg-gray-600 w-full p-4 rounded-md">
            <AddFieldButton />
        </div>
    );
}

