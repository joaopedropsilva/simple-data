import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getAllEntriesByUser } from "@/_lib/entry";
import { Entry } from "@/_components/Entry";

export default async function Home() {
    const entries = await getAllEntriesByUser("49449927-ffa3-4eaa-8c5c-7de126a4f786");

    return (
        <div className="min-w-[650px] max-w-[800px] flex flex-col items-center mx-auto relative h-screen">
            <header className="w-full p-4 mt-8 flex items-center justify-between relative">
                <h1 className="text-slate-200 text-2xl font-bold italic">
                    simple-data
                </h1>

                <Link href="/entry" className="rounded-lg bg-slate-800 data-[open]:bg-slate-700 hover:bg-slate-700 p-1">
                    <PlusCircleIcon className="size-6 text-slate-300" aria-hidden="true" /> 
                </Link>
            </header>
            <hr className="w-full" />
            <main className="w-full">
                <section className="w-full flex flex-col gap-2 items-center p-4">
                   { 
                       entries.map(entry => (
                            <div className="w-full" key={entry.id}>
                                <Entry entryId={entry.id} />
                            </div>
                       ))
                   }
                </section>
            </main>
        </div>
    );
}
