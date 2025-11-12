import React, { useState, useMemo } from 'react';
import GannAngle1x1Visual from '../components/visuals/GannAngle1x1Visual';

const GannAngleCalculator = () => {
    const [priceRange, setPriceRange] = useState('20');
    const [timeRange, setTimeRange] = useState('20');

    const oneByOneAngle = useMemo(() => {
        const p = parseFloat(priceRange);
        const t = parseFloat(timeRange);
        if (isNaN(p) || isNaN(t) || t === 0) return 0;
        return p / t;
    }, [priceRange, timeRange]);

    const angles = [
        { name: "8x1", ratio: 8, angle: "82.5°" },
        { name: "4x1", ratio: 4, angle: "75°" },
        { name: "2x1", ratio: 2, angle: "63.75°" },
        { name: "1x1", ratio: 1, angle: "45°" },
        { name: "1x2", ratio: 0.5, angle: "26.25°" },
        { name: "1x4", ratio: 0.25, angle: "15°" },
        { name: "1x8", ratio: 0.125, angle: "7.5°" },
    ];
    
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Controls */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range (e.g., High - Low)</label>
                        <input
                            type="number"
                            id="priceRange"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="e.g., 20"
                        />
                    </div>
                    <div>
                        <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700">Time Range (e.g., Bars or Days)</label>
                        <input
                            type="number"
                            id="timeRange"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="e.g., 20"
                        />
                    </div>
                    <div className="text-xs text-gray-500 pt-4">
                        The 1x1 angle represents one unit of price change per one unit of time. This is considered the most important angle, representing a balanced trend. Angles above 1x1 indicate a strong trend, while angles below indicate a weaker trend. The visual on the right illustrates this fundamental 1x1 angle, representing a perfect balance between price and time.
                    </div>
                </div>

                {/* Visual Representation */}
                <div className="w-full h-64 md:h-full bg-slate-100 rounded-lg shadow-inner overflow-hidden">
                    <GannAngle1x1Visual />
                </div>
            </div>

            {/* Results Table */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Calculated Angle Rates</h3>
                <div className="bg-white p-4 rounded-lg shadow">
                    <ul className="divide-y divide-gray-200">
                        {angles.map(angle => (
                            <li key={angle.name} className="py-3 flex justify-between items-center">
                                <span className={`font-semibold ${angle.name === '1x1' ? 'text-brand-blue' : 'text-gray-800'}`}>
                                    {angle.name} ({angle.angle})
                                </span>
                                <span className={`font-mono text-lg ${angle.name === '1x1' ? 'text-brand-blue font-bold' : 'text-gray-600'}`}>
                                    {(oneByOneAngle * angle.ratio).toFixed(4)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GannAngleCalculator;