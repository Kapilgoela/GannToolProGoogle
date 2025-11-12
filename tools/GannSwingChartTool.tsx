import React, { useRef, useEffect, useState, useCallback } from 'react';

const defaultPrices = "100,105,102,108,104,112,107,115,110,120,115,125,122,128,124";
const sampleData = "110,112,115,113,118,122,125,121,119,124,128,132,129,127,130,135,140,136,138,142,145,141,139,137,143,148,152,149,155,151";

const GannSwingChartTool = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [priceInput, setPriceInput] = useState(defaultPrices);
    const [reversalBars, setReversalBars] = useState(2);

    const generateSwings = useCallback((prices: number[], bars: number) => {
        if (prices.length < bars + 1) return [];

        const swings = [{ index: 0, price: prices[0] }];
        let direction = 0; // 1 for up, -1 for down

        for (let i = 1; i < prices.length - (bars -1); i++) {
            if (direction === 0) {
                if(prices[i] > prices[i-1]) direction = 1;
                else direction = -1;
            }
            
            if (direction === 1) { // Looking for a top
                let isTop = true;
                for(let j=1; j<=bars; j++) {
                    if(prices[i+j-1] > prices[i-1]) {
                        isTop = false;
                        break;
                    }
                }
                if(isTop) {
                    swings.push({index: i-1, price: prices[i-1]});
                    direction = -1;
                }
            } else { // Looking for a bottom
                 let isBottom = true;
                for(let j=1; j<=bars; j++) {
                    if(prices[i+j-1] < prices[i-1]) {
                        isBottom = false;
                        break;
                    }
                }
                if(isBottom) {
                    swings.push({index: i-1, price: prices[i-1]});
                    direction = 1;
                }
            }
        }
        swings.push({index: prices.length-1, price: prices[prices.length-1]})
        return swings;
    }, []);

    const drawChart = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prices = priceInput.split(',').map(Number).filter(n => !isNaN(n));
        if (prices.length < 2) return;

        const swings = generateSwings(prices, reversalBars);
        if (swings.length < 2) return;

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        const xStep = width / (prices.length - 1);
        const yRatio = height * 0.9 / priceRange;
        const yOffset = height * 0.05;

        // Draw swing line
        ctx.beginPath();
        ctx.lineWidth = 2;
        swings.forEach((swing, i) => {
            const x = swing.index * xStep;
            const y = height - ((swing.price - minPrice) * yRatio + yOffset);
            
            if (i > 0) {
                 ctx.strokeStyle = swing.price > swings[i-1].price ? '#00C853' : '#D50000'; // Green up, Red down
                 ctx.lineTo(x, y);
                 ctx.stroke();
            }
            ctx.moveTo(x, y);
        });

    }, [priceInput, reversalBars, generateSwings]);
    
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
                drawChart();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawChart]);

    useEffect(drawChart, [drawChart]);

    const handleLoadSampleData = () => {
        setPriceInput(sampleData);
    };

    return (
        <div className="flex flex-col gap-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="priceDataSwing" className="block text-sm font-medium text-gray-700">Price Data (comma-separated)</label>
                        <button 
                            onClick={handleLoadSampleData}
                            className="px-3 py-1 bg-blue-100 text-brand-blue font-semibold rounded-md hover:bg-blue-200 transition-colors text-xs whitespace-nowrap"
                        >
                            Load Sample Data
                        </button>
                    </div>
                    <textarea
                        id="priceDataSwing"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        rows={2}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="reversalBars" className="block text-sm font-medium text-gray-700">Reversal Bars</label>
                    <input
                        type="number"
                        id="reversalBars"
                        value={reversalBars}
                        onChange={(e) => setReversalBars(Math.max(1, Number(e.target.value)))}
                        min="1"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                    />
                </div>
            </div>
            <div className="w-full h-64 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} />
            </div>
             <div className="text-xs text-gray-500">
                The Gann Swing Chart simplifies price action into a series of up and down swings. A trend reverses when the price breaks the previous swing high or low. "Reversal Bars" defines how many consecutive lower highs (for a top) or higher lows (for a bottom) are needed to confirm a swing point.
            </div>
        </div>
    );
};

export default GannSwingChartTool;