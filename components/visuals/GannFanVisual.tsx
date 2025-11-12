import React, { useRef, useEffect, useCallback } from 'react';

interface GannFanVisualProps {
  prices: number[];
}

const GannFanVisual: React.FC<GannFanVisualProps> = ({ prices }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawChart = useCallback(() => {
    if (!prices || prices.length < 2) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice === 0 ? 10 : maxPrice - minPrice;
    
    const xStep = width / (prices.length - 1);
    const yMargin = height * 0.1;
    const effectiveHeight = height - (2 * yMargin);
    const yRatio = effectiveHeight / priceRange;

    // Find pivot (lowest point in first half)
    const firstHalf = prices.slice(0, Math.ceil(prices.length / 2));
    const pivotPrice = Math.min(...firstHalf);
    const pivotIndex = firstHalf.indexOf(pivotPrice);
    const pivotX = pivotIndex * xStep;
    const pivotY = height - ((pivotPrice - minPrice) * yRatio + yMargin);


    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = '#0D47A1'; // brand-blue
    ctx.lineWidth = 2;
    prices.forEach((price, index) => {
        const x = index * xStep;
        const y = height - ((price - minPrice) * yRatio + yMargin);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw pivot point
    ctx.fillStyle = '#FFD700'; // brand-gold
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#1A202C';
    ctx.lineWidth = 1;
    ctx.stroke();


    // Draw Gann Fans
    const angles = [
        { ratio: 1/8, color: '#EF9A9A' }, // 8x1 Redish
        { ratio: 1/4, color: '#FFCC80' }, // 4x1 Orange
        { ratio: 1, color: '#4CAF50' },   // 1x1 Green
        { ratio: 2, color: '#64B5F6' },   // 1x2 Blue
        { ratio: 4, color: '#9575CD' },   // 1x4 Purple
    ];
    
    angles.forEach(angle => {
        ctx.beginPath();
        ctx.strokeStyle = angle.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(pivotX, pivotY);
        
        const pricePerTime = (priceRange / (prices.length -1));
        const endX = width;
        const priceChange = (endX - pivotX) / xStep * pricePerTime * angle.ratio;
        const endY = pivotY - (priceChange * yRatio);
        
        ctx.lineTo(endX, endY);
        ctx.stroke();
    });
    ctx.setLineDash([]);
  }, [prices]);

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

export default GannFanVisual;