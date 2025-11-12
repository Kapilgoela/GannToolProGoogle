import React, { useRef, useEffect, useCallback } from 'react';

const GannAngle1x1Visual: React.FC = () => {
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
    
    // Draw Axes
    ctx.beginPath();
    ctx.strokeStyle = '#4A5568'; // gray-700
    ctx.lineWidth = 1.5;
    // Y-Axis
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(origin.x, padding);
    // X-Axis
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(width - padding, origin.y);
    ctx.stroke();

    // Draw Labels
    ctx.fillStyle = '#2D3748'; // gray-800
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Time →', width / 2, origin.y + 5);
    ctx.save();
    ctx.translate(origin.x - 15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Price →', 0, 0);
    ctx.restore();

    // Draw 1x1 Angle Line
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    const lineLength = Math.min(width - padding * 2, height - padding * 2);
    ctx.lineTo(origin.x + lineLength, origin.y - lineLength);
    ctx.strokeStyle = '#FFD700'; // brand-gold
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add Text Annotation
    ctx.fillStyle = '#0D47A1'; // brand-blue
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('1x1 Angle (45°)', origin.x + lineLength / 2, origin.y - lineLength / 2 - 15);
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText('Perfect Balance', origin.x + lineLength / 2, origin.y - lineLength / 2 + 5);

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

export default GannAngle1x1Visual;