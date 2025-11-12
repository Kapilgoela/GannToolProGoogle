import React, { useState, useMemo } from 'react';

const GannDateTimePredictor = () => {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

    const addDays = (dateStr: string, days: number): string => {
        const date = new Date(dateStr + 'T00:00:00'); // Use specific time to avoid timezone issues
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    };

    const timeCycles = useMemo(() => {
        if (!startDate) return [];
        
        const cycles = [
            { name: "Minor Cycle (Square of 7)", days: 49 },
            { name: "Seasonal Cycle", days: 90 },
            { name: "Death Zone Cycle (Square of 12)", days: 144 },
            { name: "Cycle of the Inner Year", days: 180 },
            { name: "Primary Cycle", days: 360 },
            { name: "Great Cycle (Square of 24)", days: 576 },
            { name: "Master Time Cycle", days: 1000 },
        ];
        
        return cycles.map(cycle => ({
            ...cycle,
            date: addDays(startDate, cycle.days)
        })).sort((a,b) => a.days - b.days);

    }, [startDate]);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 space-y-4">
                 <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Select Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                    />
                </div>
                 <div className="text-xs text-gray-500 pt-4">
                    Gann believed that market trends often change on specific time intervals from significant highs or lows. Select a major pivot date to project future potential turning points.
                </div>
            </div>

            <div className="w-full md:w-2/3">
                <h3 className="text-lg font-semibold mb-2">Projected Turning Point Dates</h3>
                 <div className="bg-white p-4 rounded-lg shadow">
                    <ul className="divide-y divide-gray-200">
                        {timeCycles.map(cycle => (
                             <li key={cycle.name} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{cycle.name}</p>
                                    <p className="text-sm text-gray-500">{cycle.days} days from start</p>
                                </div>
                                <span className="font-mono text-lg text-brand-blue">{cycle.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GannDateTimePredictor;
