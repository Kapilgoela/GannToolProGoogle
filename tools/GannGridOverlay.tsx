import React, { useRef, useEffect, useState, useCallback } from 'react';

const GannGridOverlay = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [highPrice, setHighPrice] = useState(120);
    const [lowPrice, setLowPrice] = useState(100);

    const drawGrid = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const range = highPrice - lowPrice;
        if (range <= 0) return;

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        const divisions = [
            { level: 0, style: '#0D47A1', width: 2 },      // 0%
            { level: 0.125, style: '#B3E5FC', width: 1 },  // 12.5%
            { level: 0.25, style: '#4FC3F7', width: 1.5 }, // 25%
            { level: 0.333, style: '#FFB74D', width: 1 },  // 33.3%
            { level: 0.375, style: '#81D4FA', width: 1 },  // 37.5%
            { level: 0.5, style: '#FFD700', width: 2 },      // 50%
            { level: 0.625, style: '#81D4FA', width: 1 },  // 62.5%
            { level: 0.666, style: '#FFB74D', width: 1 },  // 66.6%
            { level: 0.75, style: '#4FC3F7', width: 1.5 }, // 75%
            { level: 0.875, style: '#B3E5FC', width: 1 },  // 87.5%
            { level: 1, style: '#0D47A1', width: 2 }       // 100%
        ];

        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        divisions.forEach(div => {
            const price = highPrice - (range * div.level);
            const y = (1 - (price - lowPrice) / range) * height;

            ctx.beginPath();
            ctx.strokeStyle = div.style;
            ctx.lineWidth = div.width;
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();

            ctx.fillStyle = div.style;
            ctx.fillText(`${price.toFixed(2)} (${(div.level * 100).toFixed(1)}%)`, width - 10, y - 8);
        });

    }, [highPrice, lowPrice]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                canvas.width = width;
                canvas.height = height;
                drawGrid();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawGrid]);
    
    useEffect(drawGrid, [drawGrid]);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 space-y-4">
                 <div>
                    <label htmlFor="highPrice" className="block text-sm font-medium text-gray-700">High Price</label>
                    <input
                        type="number"
                        id="highPrice"
                        value={highPrice}
                        onChange={(e) => setHighPrice(Number(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="lowPrice" className="block text-sm font-medium text-gray-700">Low Price</label>
                    <input
                        type="number"
                        id="lowPrice"
                        value={lowPrice}
                        onChange={(e) => setLowPrice(Number(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                    />
                </div>
                 <div className="text-xs text-gray-500 pt-4">
                    The Gann Grid divides a major price range into key percentages (eighths and thirds). These horizontal lines often act as significant support and resistance levels. The 50% level (gold) is the most important.
                </div>
            </div>
            <div className="w-full md:w-2/3 h-96 bg-slate-100 rounded-lg overflow-hidden relative">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

export default GannGridOverlay;