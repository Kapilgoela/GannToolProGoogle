import React, { useRef, useEffect, useCallback } from 'react';

const generateSwings = (prices: number[], bars: number) => {
    if (prices.length < bars + 1) return [];

    const swings = [{ index: 0, price: prices[0] }];
    let direction = prices[1] > prices[0] ? 1 : -1;

    for (let i = 1; i < prices.length; i++) {
        const lastSwing = swings[swings.length - 1];

        if (direction === 1) { // In an uptrend, looking for a top
            if (prices[i] < lastSwing.price) { // Potential top formed at previous point
                let isTop = true;
                for (let j = 1; j <= bars; j++) {
                    if (i + j >= prices.length || prices[i + j] > prices[i-1]) {
                        isTop = false;
                        break;
                    }
                }
                if (isTop) {
                    swings.push({ index: i - 1, price: prices[i - 1] });
                    direction = -1;
                }
            } else if (prices[i] > lastSwing.price) {
                // If we are making new highs in an uptrend, update the last swing
                swings[swings.length -1] = { index: i, price: prices[i] };
            }
        } else { // In a downtrend, looking for a bottom
             if (prices[i] > lastSwing.price) { // Potential bottom formed
                let isBottom = true;
                for (let j = 1; j <= bars; j++) {
                    if (i + j >= prices.length || prices[i + j] < prices[i-1]) {
                        isBottom = false;
                        break;
                    }
                }
                 if(isBottom) {
                    swings.push({ index: i - 1, price: prices[i - 1] });
                    direction = 1;
                 }
            } else if (prices[i] < lastSwing.price) {
                // If we are making new lows in a downtrend, update the last swing
                swings[swings.length -1] = { index: i, price: prices[i] };
            }
        }
    }
    // ensure last point is added if it's a new high/low
    const lastPrice = prices[prices.length - 1];
    const lastSwing = swings[swings.length - 1];
    if ((direction === 1 && lastPrice > lastSwing.price) || (direction === -1 && lastPrice < lastSwing.price)) {
         swings[swings.length -1] = { index: prices.length-1, price: lastPrice };
    }
    
    return swings;
};


interface GannSwingChartVisualProps {
  prices: number[];
  reversalBars: number;
}

const GannSwingChartVisual: React.FC<GannSwingChartVisualProps> = ({ prices, reversalBars }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawChart = useCallback(() => {
    if (!prices || prices.length < 2) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const swings = generateSwings(prices, reversalBars);
    if (swings.length < 2) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice === 0 ? 10 : maxPrice - minPrice;

    const xStep = width / (prices.length - 1);
    const yMargin = height * 0.1;
    const effectiveHeight = height - (2 * yMargin);
    const yRatio = effectiveHeight / priceRange;


    // Draw swing line
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    
    const firstSwing = swings[0];
    const firstX = firstSwing.index * xStep;
    const firstY = height - ((firstSwing.price - minPrice) * yRatio + yMargin);
    ctx.moveTo(firstX, firstY);

    for(let i = 1; i < swings.length; i++) {
        const swing = swings[i];
        const prevSwing = swings[i-1];
        const x = swing.index * xStep;
        const y = height - ((swing.price - minPrice) * yRatio + yMargin);
        
        ctx.strokeStyle = swing.price > prevSwing.price ? '#4CAF50' : '#F44336'; // Green up, Red down
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw circles at pivots
    swings.forEach(swing => {
        const x = swing.index * xStep;
        const y = height - ((swing.price - minPrice) * yRatio + yMargin);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2*Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#1A202C';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    })


  }, [prices, reversalBars]);
  
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

export default GannSwingChartVisual;