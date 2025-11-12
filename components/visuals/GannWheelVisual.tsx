import React, { useRef, useEffect, useCallback } from 'react';

interface GannWheelVisualProps {
  centerValue: number;
}

const GannWheelVisual: React.FC<GannWheelVisualProps> = ({ centerValue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) / 2 * 0.95;
    
    ctx.clearRect(0, 0, width, height);

    const rings = 5;
    const ringWidth = radius / rings;

    let currentValue = centerValue;

    // Draw center
    ctx.fillStyle = '#FFD700'; // gold
    ctx.beginPath();
    ctx.arc(center.x, center.y, ringWidth * 0.8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = `bold ${ringWidth/2.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(centerValue), center.x, center.y);


    for (let i = 1; i <= rings; i++) {
        const ringRadius = i * ringWidth;
        const segments = 8 + ( (i-1) * 8);

        // Draw ring circle
        ctx.beginPath();
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 1;
        ctx.arc(center.x, center.y, ringRadius, 0, 2*Math.PI);
        ctx.stroke();

        for (let j = 0; j < segments; j++) {
            currentValue++;
            const angle = (j / segments) * 2 * Math.PI - (Math.PI / 2);
            
            const textRadius = ringRadius - (ringWidth/2);
            const x = center.x + Math.cos(angle) * textRadius;
            const y = center.y + Math.sin(angle) * textRadius;
            
            const normalizedAngleDeg = ( (angle * 180 / Math.PI) + 360 + 90) % 360;

            const isCardinal = Math.round(normalizedAngleDeg) % 90 === 0;
            const isOrdinal = Math.round(normalizedAngleDeg) % 45 === 0 && !isCardinal;

            ctx.fillStyle = isCardinal ? '#0D47A1' : isOrdinal ? '#4CAF50' : '#1A202C';
            ctx.font = `${ringWidth/3.5}px sans-serif`;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2);
            ctx.fillText(String(currentValue), 0, 0);
            ctx.restore();
        }
    }
  }, [centerValue]);

   useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if(!parent) return;

        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                const side = Math.min(width, height);
                canvas.width = side;
                canvas.height = side;
                drawWheel();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawWheel]);

  return <canvas ref={canvasRef} style={{ margin: 'auto', display: 'block' }} />;
};

export default GannWheelVisual;