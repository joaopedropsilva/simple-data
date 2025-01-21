import { EntryForm } from "@/_components/EntryForm";
import { v4 as uuidV4 } from "uuid";

export default function Page() {
    return (
        <div className="mt-20 mx-auto flex justify-center">
            <EntryForm entryId={uuidV4()}/>
        </div>
    );
}
