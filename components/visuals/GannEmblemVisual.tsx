import React, { useRef, useEffect, useCallback } from 'react';

const GannEmblemVisual: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawEmblem = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        const center = { x: width / 2, y: height / 2 };
        const radius = Math.min(width, height) / 2 * 0.8;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;

        // Draw Circle (Time)
        ctx.strokeStyle = '#0D47A1'; // Blue
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw Square (Price) - inscribed in the circle
        ctx.strokeStyle = '#FFD700'; // Gold
        const halfSide = radius / Math.sqrt(2);
        ctx.strokeRect(center.x - halfSide, center.y - halfSide, halfSide * 2, halfSide * 2);
        
        // Draw Triangle (Pattern/Balance)
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
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if(!parent) return;

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

    return <canvas ref={canvasRef} />;
}

export default GannEmblemVisual;