import React, { useRef, useEffect, useState, useCallback } from 'react';

const GannEmblem = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState(200);

    const drawEmblem = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        const center = { x: width / 2, y: height / 2 };
        const radius = size / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;

        // Draw Circle
        ctx.strokeStyle = '#0D47A1'; // Blue
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw Square
        ctx.strokeStyle = '#FFD700'; // Gold
        ctx.beginPath();
        const halfSide = radius / Math.sqrt(2);
        ctx.moveTo(center.x - halfSide, center.y - halfSide);
        ctx.lineTo(center.x + halfSide, center.y - halfSide);
        ctx.lineTo(center.x + halfSide, center.y + halfSide);
        ctx.lineTo(center.x - halfSide, center.y + halfSide);
        ctx.closePath();
        ctx.stroke();
        
        // Draw Triangle
        ctx.strokeStyle = '#D32F2F'; // Red
        ctx.beginPath();
        const p1 = { x: center.x, y: center.y - radius };
        const p2 = { x: center.x - radius * Math.sqrt(3) / 2, y: center.y + radius / 2 };
        const p3 = { x: center.x + radius * Math.sqrt(3) / 2, y: center.y + radius / 2 };
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.stroke();
        
    }, [size]);

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
                drawEmblem();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawEmblem]);

    useEffect(drawEmblem, [drawEmblem]);
    
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-xs">
                <label htmlFor="emblemSize" className="block text-sm font-medium text-gray-700">Size</label>
                <input
                    type="range"
                    id="emblemSize"
                    min="50"
                    max="400"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <div className="w-full h-64 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} />
            </div>
            <div className="text-xs text-gray-500 text-center max-w-md">
                The Gann Emblem visualizes the geometric relationship between the circle (time cycles), the square (price ranges), and the triangle (patterns). It represents the natural harmony Gann believed existed in the markets.
            </div>
        </div>
    )
}

export default GannEmblem;