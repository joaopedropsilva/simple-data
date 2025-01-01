import { PlusCircleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function Home() {
  return (
      <div className='relative h-screen'>
        <div className="min-w-[650px] max-w-[800px] flex flex-col items-center mx-auto relative h-screen">
            <header className="w-full p-4 mt-8 flex items-center">
                <h1 className="text-slate-200 text-2xl font-bold italic">
                    simple-data
                </h1>
            </header>
            <hr className="w-full" />
            <main className="w-full">
                <section className="w-full flex flex-col gap-2 items-center p-4">
                </section>
            </main>
        </div>
        <Link href="/create">
            <PlusCircleIcon className="text-slate-500 hover:text-slate-400 absolute bottom-12 right-16 size-16" />
        </Link>
      </div>
  );
}
