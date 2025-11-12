import React, { useRef, useEffect, useState, useCallback } from 'react';

// Default price data for demonstration
const defaultPrices = "100,102,101,105,103,108,106,110,109,112,110,115,113,118,116,122,120,125";

const GannFanTool = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [prices, setPrices] = useState<number[]>(defaultPrices.split(',').map(Number));
    const [priceInput, setPriceInput] = useState(defaultPrices);
    const [pivot, setPivot] = useState<{ x: number; y: number; price: number; index: number } | null>(null);

    const drawChart = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        const xStep = width / (prices.length - 1);
        const yRatio = height / priceRange;

        // Draw price line
        ctx.beginPath();
        ctx.strokeStyle = '#0D47A1';
        ctx.lineWidth = 2;
        prices.forEach((price, index) => {
            const x = index * xStep;
            const y = height - (price - minPrice) * yRatio;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        if (pivot) {
            // Draw pivot point
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(pivot.x, pivot.y, 5, 0, 2 * Math.PI);
            ctx.fill();

            // Draw Gann Fans
            const angles = [
                { ratio: 1/8, color: '#E57373' }, // 8x1
                { ratio: 1/4, color: '#FFB74D' }, // 4x1
                { ratio: 1/2, color: '#FFF176' }, // 2x1
                { ratio: 1, color: '#81C784' },   // 1x1
                { ratio: 2, color: '#64B5F6' },   // 1x2
                { ratio: 4, color: '#9575CD' },   // 1x4
                { ratio: 8, color: '#F06292' },   // 1x8
            ];
            
            const isUpTrend = pivot.index < prices.length / 2; // Simple trend assumption
            
            angles.forEach(angle => {
                ctx.beginPath();
                ctx.strokeStyle = angle.color;
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 5]);
                ctx.moveTo(pivot.x, pivot.y);
                
                const timeUnits = prices.length - 1 - pivot.index;
                const priceUnits = angle.ratio * timeUnits;
                
                const endPrice = isUpTrend ? pivot.price + priceUnits : pivot.price - priceUnits;
                const endX = width;
                const endY = height - (endPrice - minPrice) * yRatio;
                
                ctx.lineTo(endX, endY);
                ctx.stroke();
            });
            ctx.setLineDash([]);
        }
    }, [prices, pivot]);

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
                drawChart();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawChart]);

    useEffect(drawChart, [drawChart]);

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;
        const yRatio = canvas.height / priceRange;

        const index = Math.round(x / (canvas.width / (prices.length - 1)));
        const clickedPrice = prices[index];
        const actualY = canvas.height - (clickedPrice - minPrice) * yRatio;
        
        setPivot({ x: index * (canvas.width / (prices.length - 1)), y: actualY, price: clickedPrice, index });
    };

    const handleDataChange = () => {
        const newPrices = priceInput.split(',').map(Number).filter(n => !isNaN(n));
        if (newPrices.length > 1) {
            setPrices(newPrices);
            setPivot(null);
        } else {
            alert("Please enter at least two comma-separated numbers.");
        }
    };

    return (
        <div className="flex flex-col gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Price Data (comma-separated)</label>
                <div className="flex gap-2">
                    <textarea
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        rows={2}
                        className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        placeholder="e.g., 100,102,101,105..."
                    />
                    <button onClick={handleDataChange} className="px-4 py-2 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-800 self-center">Update</button>
                </div>
            </div>
            <div className="text-center text-sm text-gray-600">
                {pivot ? `Pivot set at price ${pivot.price.toFixed(2)}.` : "Click on the chart to set a pivot point."}
            </div>
            <div className="w-full h-64 md:h-96 bg-slate-100 rounded-lg overflow-hidden relative">
                <canvas ref={canvasRef} onClick={handleCanvasClick} className="cursor-crosshair" />
            </div>
            <div className="text-xs text-gray-500">
                <strong>How to use:</strong> Enter your price data and click "Update". Then, click on a high or low point on the chart to draw the Gann Fan angles. The 1x1 line (green) represents a balanced trend. Lines below it indicate a slower uptrend (or faster downtrend), and lines above it indicate a faster uptrend.
            </div>
        </div>
    );
};

export default GannFanTool;