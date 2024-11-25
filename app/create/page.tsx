import { PlusIcon } from '@heroicons/react/24/solid'

import { Button } from "@/components/Button";

export default function Create() {
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
        <main className="w-screen h-screen flex justify-center items-center">
            <section className="bg-gray-700 rounded-lg min-w-[340px] flex flex-col h-max p-4 align-center">
                <header className="flex px-4 pt-4">
                    <h1 className="text-xl p-1 text-slate-300 font-bold">
                        Criar nova entrada
                    </h1>
                </header>
                <div className="w-full flex flex-col items-center justify-center p-4">
                    <div className="w-full flex flex-col py-2">
                        <h3 className="text-md mb-2 text-slate-300">
                            Selecione um template:
                        </h3>
                        <input type="text" className="bg-gray-600 text-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full" />
                    </div>
                    <div className="bg-gray-600 w-full p-4 rounded-md">
                        {fields}
                    </div>
                    <footer className="w-full flex justify-center gap-2 items-center py-2">
                        <Button text="Cancelar" />
                        <Button text="Criar" />
                    </footer>
                </div>
            </section>
        </main>
    );
}

