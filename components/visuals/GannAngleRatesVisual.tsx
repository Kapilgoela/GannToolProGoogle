import React, { useRef, useEffect, useCallback } from 'react';

const GannAngleRatesVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#F7FAFC';
    ctx.fillRect(0, 0, width, height);

    const padding = 30;
    const origin = { x: padding, y: height - padding };
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Draw Axes
    ctx.beginPath();
    ctx.strokeStyle = '#A0AEC0'; // gray-500
    ctx.lineWidth = 1;
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(origin.x, padding);
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(width - padding, origin.y);
    ctx.stroke();

    // Draw Labels
    ctx.fillStyle = '#4A5568'; // gray-700
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Time →', origin.x + chartWidth / 2, origin.y + 15);
    ctx.save();
    ctx.translate(origin.x - 15, origin.y - chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Price →', 0, 0);
    ctx.restore();

    const angles = [
        { name: "8x1", ratio: 8, color: "#D32F2F" },
        { name: "4x1", ratio: 4, color: "#F57C00" },
        { name: "2x1", ratio: 2, color: "#FFA000" },
        { name: "1x1", ratio: 1, color: "#0D47A1" }, // brand-blue
        { name: "1x2", ratio: 0.5, color: "#4CAF50" },
        { name: "1x4", ratio: 0.25, color: "#009688" },
        { name: "1x8", ratio: 0.125, color: "#006064" },
    ];

    const maxRatio = 8;
    const maxTime = chartWidth;
    const maxPrice = chartHeight;

    angles.forEach(angle => {
        const endX = origin.x + maxTime;
        const endY = origin.y - ( (angle.ratio / maxRatio) * maxPrice );
        
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = angle.color;
        ctx.lineWidth = angle.name === '1x1' ? 2.5 : 1.5;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = angle.color;
        ctx.font = angle.name === '1x1' ? 'bold 12px sans-serif' : '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(angle.name, endX + 5, endY);
    });

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
                drawChart();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawChart]);

  return <canvas ref={canvasRef} />;
}

export default GannAngleRatesVisual;