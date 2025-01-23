import { EntryForm } from "@/_components/EntryForm";
import { getAllFieldsByEntry, getEntryById } from "@/_lib/entry";
import { v4 as uuidV4 } from "uuid";

export default async function Entry({ searchParams }: { searchParams: { id?: string; } }) {
    const { id } = await searchParams;
    const fieldData = id ? (await getAllFieldsByEntry(id)) : [];
    const entryTitle = id ? (await getEntryById(id))?.name as string : "New Entry";

    const loadedFields =
        fieldData.length > 0
            ? fieldData.map(f => ({ id: f.id!, name: f.name, value: f.value }))
            : [];

    return (
        <div className="mt-20 mx-auto flex justify-center">
            <EntryForm
                entryId={id ?? uuidV4()}
                entryTitle={entryTitle}
                loadedFields={loadedFields}
            />
        </div>
    );
}

