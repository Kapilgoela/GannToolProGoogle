import React, { useRef, useEffect, useCallback } from 'react';

interface GannDateTimePredictorVisualProps {
  startDate: string;
}

const GannDateTimePredictorVisual: React.FC<GannDateTimePredictorVisualProps> = ({ startDate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#F7FAFC'; // bg
    ctx.fillRect(0, 0, width, height);

    const padding = { top: 30, bottom: 40, left: 60, right: 60 };
    const timelineY = height / 2;
    const timelineWidth = width - padding.left - padding.right;

    const cycles = [ { days: 90, label: '90D' }, { days: 180, label: '180D' }, { days: 360, label: '360D' }];
    const maxDays = 400;

    // Draw timeline
    ctx.beginPath();
    ctx.moveTo(padding.left, timelineY);
    ctx.lineTo(width - padding.right, timelineY);
    ctx.strokeStyle = '#4A5568';
    ctx.lineWidth = 2;
    ctx.stroke();

    const addDays = (dateStr: string, days: number): string => {
        const date = new Date(dateStr + 'T00:00:00');
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString('en-CA');
    };

    // Draw start point
    const startX = padding.left;
    ctx.beginPath();
    ctx.arc(startX, timelineY, 5, 0, 2*Math.PI);
    ctx.fillStyle = '#0D47A1';
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.font = '12px sans-serif';
    ctx.fillText('Start', startX, timelineY + 20);
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(startDate, startX, timelineY + 35);


    // Draw cycle points
    cycles.forEach(cycle => {
        const x = padding.left + (cycle.days / maxDays) * timelineWidth;
        ctx.beginPath();
        ctx.moveTo(x, timelineY - 5);
        ctx.lineTo(x, timelineY + 5);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#1A202C';
        ctx.font = '12px sans-serif';
        ctx.fillText(cycle.label, x, timelineY - 25);
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(addDays(startDate, cycle.days), x, timelineY - 10);
    })

  }, [startDate]);

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
                draw();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [draw]);

  return <canvas ref={canvasRef} />;
}
export default GannDateTimePredictorVisual;