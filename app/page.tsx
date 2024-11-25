import { PlusCircleIcon } from '@heroicons/react/24/solid'

import { Entry } from "@/components/Entry";

export default function Home() {
  const entries = (
      <>
        <Entry
            date="19/01/2024"
            heartbeat={156}
            distance={5.76}
            hustle="Moderado"
        />
        <Entry
            date="22/01/2024"
            heartbeat={134}
            distance={4.88}
            hustle="Leve"
        />
        <Entry
            date="03/02/2024"
            heartbeat={177}
            distance={11.25}
            hustle="Forte"
        />
      </>
  );

  return (
      <div className='relative h-screen'>
        <div className="min-w-[650px] max-w-[800px] flex flex-col items-center mx-auto relative h-screen">
            <header className="w-full p-4 mt-8 flex items-center">
                <h1 className="text-slate-200 text-2xl font-bold italic">
                    open-training
                </h1>
            </header>
            <hr className="w-full" />
            <main className="w-full">
                <section className="w-full flex flex-col gap-2 items-center p-4">
                    {entries}
                </section>
            </main>
        </div>
        <PlusCircleIcon className="text-slate-500 hover:text-slate-400 absolute bottom-12 right-16 size-16" />
      </div>
  );
}
