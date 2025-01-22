import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getAllFieldsByEntry, getEntryById } from "@/_lib/entry";

export async function Entry({ entryId }: { entryId: string; }) {
    const entry = await getEntryById(entryId);
    const fields = await getAllFieldsByEntry(entryId);

    const fieldsRowSize = 
        fields.length > 0
            ? Math.ceil(fields.length / 3)
            : 1;

    return (
        <Disclosure as="div" className="p-6 w-full bg-slate-800 rounded-lg" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-lg text-white group-data-[hover]:text-white/80">
                    {entry?.name}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2">
                <div className={`mt-4 grid grid-cols-3 gap-4 grid-rows-${fieldsRowSize} w-full`}>
                    {
                        fields.map(field => (
                            <div key={field.id} className="bg-slate-700 text-lg w-48 rounded-lg p-4 flex justify-between items-center">
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
    );
}
