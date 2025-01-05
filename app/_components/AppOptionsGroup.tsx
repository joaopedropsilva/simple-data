import { OptionsDropdown } from "@/_components/OptionsDropdown";
import { Selectbox } from "@/_components/base/Selectbox";

export function AppOptionsGroup() {
    return (
        <div className="flex items-center gap-2">
            <Selectbox options={[]} />
            <OptionsDropdown />
        </div>
    );
}

