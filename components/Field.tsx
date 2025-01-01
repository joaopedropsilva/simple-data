interface FieldProps {
    label: string;
    type: string;
}

export function Field({ label, type }: FieldProps) {
    return (
        <div className="w-full flex flex-col m-2">
            <label className="text-md mb-1 text-slate-300">
                {label}
            </label>
            <input type="text" className="bg-gray-600 text-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full" />
        </div>
    );
}

