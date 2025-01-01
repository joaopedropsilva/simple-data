interface ButtonProps {
    text: string;
}

export function Button({ text }: ButtonProps) {
    return (
        <button
            className="text-xs text-slate-300 font-bold rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-center p-2 hover:bg-gray-500"
        >
            {text}
        </button>
    );
}

