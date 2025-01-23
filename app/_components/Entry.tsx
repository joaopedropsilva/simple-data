import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { getAllFieldsByEntry, getEntryById } from "@/_lib/entry";
import Link from "next/link";

export async function Entry({ entryId, userId }: { entryId: string; userId: string; }) {
    const entry = await getEntryById(entryId);
    const fields = await getAllFieldsByEntry(entryId);

    const GRID_COLS = 2;
    const gridRows =
        fields.length > 0
            ? Math.ceil(fields.length / 2)
            : 1;

    return (
        <div className="flex gap-2">
            <Disclosure as="div" className="p-6 w-full bg-slate-800 rounded-lg" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center justify-between">
                    <div className="text-lg text-white group-data-[hover]:text-white/80 flex justify-between w-full mr-4">
                        <div>
                            {entry?.name}
                        </div>
                        <div>
                            {entry?.created_at}
                        </div>
                    </div>
                    <ChevronDownIcon className="size-5 fill-white/100 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 max-h-96 overflow-auto">
                    <div className={`mt-4 grid grid-flow-col grid-cols-${GRID_COLS} gap-4 grid-rows-${gridRows} w-full`}>
                        {
                            fields.map(field => (
                                <div key={field.id} className="bg-slate-700 text-lg w-full rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <div className="mb-1 p-1 text-xs text-white/50">
                                            field name
                                        </div>
                                        <div className="p-1 text-md text-white/70">
                                            {field.name}
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 min-w-[56px] h-full text-center rounded-lg p-2 flex items-center justify-center">
                                        {field.value}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </DisclosurePanel>
            </Disclosure>
                <Link href={`/entry?id=${entryId}&user=${userId}`} className="group p-2 bg-slate-800 hover:bg-slate-700 flex items-center rounded-lg">
                <PencilSquareIcon className="size-4 fill-white group-hover:fill-white/80" />
            </Link>
        </div>
    );
}
