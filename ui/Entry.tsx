import { CalendarIcon } from '@heroicons/react/24/solid'

interface EntryProps {
    date: string;
    heartbeat: number;
    distance: number;
    hustle: string;
}

export function Entry({
    date,
    heartbeat,
    distance,
    hustle
}: EntryProps) { 
    return (
      <div className="w-full flex items-center justify-between hover:cursor-pointer hover:scale-105 transition-transform duration-300 bg-gray-700 min-h-8 rounded-lg p-4">
        <div className="w-full flex gap-2 items-center">
            <CalendarIcon className="text-slate-300 size-6" />
            <div className="text-yellow-400 hover:text-yellow-300">
                {date}
            </div>
            <div className="text-red-400 hover:text-red-300">
                {heartbeat} bpm
            </div>
            <div className="text-emerald-400 hover:text-emerald-300">
                {distance} km
            </div>
        </div>
        <h3 className="text-yellow-400 hover:text-yellow-300">
            {hustle}
        </h3>
      </div>
  );
}

