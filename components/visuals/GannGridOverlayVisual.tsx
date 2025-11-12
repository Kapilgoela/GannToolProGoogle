import React, { useRef, useEffect, useCallback } from 'react';

interface GannGridOverlayVisualProps {
  high: number;
  low: number;
}

const GannGridOverlayVisual: React.FC<GannGridOverlayVisualProps> = ({ high, low }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const range = high - low;
    if (range <= 0) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const divisions = [
        { level: 0, style: '#0D47A1', width: 2.5 },   // 0%
        { level: 0.25, style: '#4FC3F7', width: 1.5 },// 25%
        { level: 0.5, style: '#FFD700', width: 3 },   // 50%
        { level: 0.75, style: '#4FC3F7', width: 1.5 },// 75%
        { level: 1, style: '#0D47A1', width: 2.5 }    // 100%
    ];

    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    
    divisions.forEach(div => {
        const price = high - (range * div.level);
        const y = (1 - (price - low) / range) * height;

        ctx.beginPath();
        ctx.strokeStyle = div.style;
        ctx.lineWidth = div.width;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = div.style === '#FFD700' ? '#424242' : div.style;
        ctx.fillText(`${price.toFixed(2)} (${(div.level * 100).toFixed(0)}%)`, width - 10, y - 4);
    });

  }, [high, low]);

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
            drawGrid();
        }
    });
    resizeObserver.observe(parent);
    return () => resizeObserver.unobserve(parent);
  }, [drawGrid]);

  return <canvas ref={canvasRef} />;
};

export default GannGridOverlayVisual;