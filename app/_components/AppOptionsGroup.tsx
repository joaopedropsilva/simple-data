import { OptionsDropdown } from "@/_components/OptionsDropdown";

export function AppOptionsGroup() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-24 h-4 bg-slate-100" />
            <OptionsDropdown />
        </div>
    );
}

