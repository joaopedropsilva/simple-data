import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getAllEntriesByUser } from "@/_lib/entry";
import { Entry } from "@/_components/Entry";
import { verifySession } from "@/_lib/auth";

export default async function Home() {
    const userId = await verifySession();

    const entries = await getAllEntriesByUser(userId);

    return (
        <div className="min-w-[650px] max-w-[800px] flex flex-col items-center mx-auto relative h-screen">
            <header className="w-full p-4 mt-8 flex items-center justify-between relative">
                <h1 className="text-slate-200 text-2xl font-bold italic">
                    simple-data
                </h1>

                <div className="flex items-center justify-center gap-2">
                    <Link href={`/entry?user=${userId}`} className="rounded-lg bg-slate-800 data-[open]:bg-slate-700 hover:bg-slate-700 p-1">
                        <PlusCircleIcon className="size-6 text-slate-300" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/logout"
                        className="flex justify-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                        Sair
                    </Link>
                </div>
            </header>
            <hr className="w-full" />
            <main className="w-full">
                <section className="w-full flex flex-col gap-2 items-center p-4">
                   { 
                       entries.map(entry => (
                            <div className="w-full" key={entry.id}>
                                <Entry entryId={entry.id} userId={userId} />
                            </div>
                       ))
                   }
                </section>
            </main>
        </div>
    );
}
