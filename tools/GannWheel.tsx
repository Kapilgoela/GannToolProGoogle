import React, { useRef, useEffect, useState, useCallback } from 'react';

const GannWheel = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [startPrice, setStartPrice] = useState(100);

    const drawWheel = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        const center = { x: width / 2, y: height / 2 };
        const radius = Math.min(width, height) / 2 * 0.95;
        
        ctx.clearRect(0, 0, width, height);

        const rings = 6;
        const ringWidth = radius / rings;

        let currentValue = startPrice;

        // Draw center
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(center.x, center.y, ringWidth / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = `${ringWidth/3}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(startPrice), center.x, center.y);


        for (let i = 0; i < rings; i++) {
            const r1 = i * ringWidth + (ringWidth / 2);
            const r2 = (i + 1) * ringWidth + (ringWidth / 2);
            const segments = 8 + (i * 8);

            for (let j = 0; j < segments; j++) {
                currentValue++;
                const angle = (j / segments) * 2 * Math.PI - (Math.PI / 2);
                
                const x = center.x + Math.cos(angle) * ((r1 + r2) / 2);
                const y = center.y + Math.sin(angle) * ((r1 + r2) / 2);
                
                // Highlight cardinal and ordinal crosses
                const normalizedAngle = (angle + Math.PI/2) % (2*Math.PI);
                const isCardinal = Math.abs(normalizedAngle % (Math.PI / 2)) < 0.01;
                const isOrdinal = Math.abs((normalizedAngle - Math.PI / 4) % (Math.PI / 2)) < 0.01;

                if(isCardinal) {
                    ctx.fillStyle = '#64B5F6'; // Light blue for cardinal
                } else if(isOrdinal) {
                    ctx.fillStyle = '#81C784'; // Green for ordinal
                } else {
                    ctx.fillStyle = '#fff';
                }

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle + Math.PI / 2);
                ctx.fillText(String(currentValue), 0, 0);
                ctx.restore();
            }
        }
        
    }, [startPrice]);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                // Make it square
                const { width } = entries[0].contentRect;
                canvas.width = width;
                canvas.height = width;
                drawWheel();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawWheel]);

    useEffect(drawWheel, [drawWheel]);
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 space-y-4">
                 <div>
                    <label htmlFor="startPriceWheel" className="block text-sm font-medium text-gray-700">Start Price / Center</label>
                    <input
                        type="number"
                        id="startPriceWheel"
                        value={startPrice}
                        onChange={(e) => setStartPrice(Number(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        placeholder="e.g., 100"
                    />
                </div>
                 <div className="text-xs text-gray-500 pt-4">
                    <p>The Gann Wheel shows the relationship between price and time. Numbers on the same angle often act as support or resistance.</p>
                    <p><span className="font-bold text-blue-500">Cardinal Cross (Blue):</span> Major vibration levels.</p>
                    <p><span className="font-bold text-green-500">Ordinal Cross (Green):</span> Secondary vibration levels.</p>
                </div>
            </div>
            <div className="w-full md:w-2/3 aspect-square">
                 <canvas ref={canvasRef} />
            </div>
        </div>
    )
}

export default GannWheel;