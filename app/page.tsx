import { getAllTemplatesBy } from "@/_lib/data/template";
import { AppOptionsGroup } from "@/_components/AppOptionsGroup";

export default async function Home() {
    const userTemplates = await getAllTemplatesBy("de0678c2-ddcf-4f99-a5cf-b4285135fdba");

    return (
        <div className="min-w-[650px] max-w-[800px] flex flex-col items-center mx-auto relative h-screen">
            <header className="w-full p-4 mt-8 flex items-center justify-between">
                <h1 className="text-slate-200 text-2xl font-bold italic">
                    simple-data
                </h1>
                <AppOptionsGroup />
            </header>
            <hr className="w-full" />
            <main className="w-full">
                <section className="w-full flex flex-col gap-2 items-center p-4">
                </section>
            </main>
        </div>
    );
}
