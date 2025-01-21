import { CustomButton } from "@/_components/base/CustomButton";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="min-w-[650px] max-w-[800px] flex flex-col items-center mx-auto relative h-screen">
            <header className="w-full p-4 mt-8 flex items-center justify-between relative">
                <h1 className="text-slate-200 text-2xl font-bold italic">
                    simple-data
                </h1>

                <Link href="/entry">
                    <CustomButton type="button" text="Add new entry" spanOver="right" />
                </Link>
            </header>
            <hr className="w-full" />
            <main className="w-full">
                <section className="w-full flex flex-col gap-2 items-center p-4">
                </section>
            </main>
        </div>
    );
}
