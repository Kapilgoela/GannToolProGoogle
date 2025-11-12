import React, { useRef, useEffect, useCallback } from 'react';

interface StaticChartThumbnailProps {
  toolSlug: string;
}

const StaticChartThumbnail: React.FC<StaticChartThumbnailProps> = ({ toolSlug }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#F7FAFC'; // brand-light bg
        ctx.fillRect(0, 0, width, height);
        
        switch (toolSlug) {
            // Gann Tools
            case 'gann-square-of-9-calculator': drawSquareOf9(ctx, width, height); break;
            case 'gann-fan-tool': drawGannFan(ctx, width, height); break;
            case 'gann-wheel-square-of-144': drawGannWheel(ctx, width, height); break;
            case 'gann-swing-chart-tool': drawSwingChart(ctx, width, height); break;
            case 'gann-grid-overlay': drawGridOverlay(ctx, width, height); break;
            case 'gann-emblem': drawGannEmblem(ctx, width, height); break;
            
            // TradingView Indicators - Trend
            case 'supertrend': drawSupertrend(ctx, width, height); break;
            case 'moving-average': case 'ema-cross': case 'hull-ma': case 'tema': case 'dema': case 'nadaraya-watson': drawMovingAverage(ctx, width, height); break;
            case 'parabolic-sar': drawParabolicSAR(ctx, width, height); break;
            case 'gann-fan-tv': drawGannFan(ctx, width, height); break;
            case 'donchian-channels': drawBollingerBands(ctx, width, height, '#8E44AD'); break;
            case 'kijun-sen': drawKijunSen(ctx, width, height); break;
            case 'ichimoku-cloud': drawIchimokuCloud(ctx, width, height); break;
            case 'adx': drawADX(ctx, width, height); break;
            case 'aroon': drawOscillator(ctx, width, height, '#E67E22', '#3498DB'); break;
            case 'vortex-indicator': drawOscillator(ctx, width, height, '#2ECC71', '#E74C3C'); break;
            case 'qstick': drawOscillator(ctx, width, height, '#1ABC9C'); break;
            
            // TradingView Indicators - Momentum
            case 'rsi': case 'momentum-indicator': case 'williams-r': case 'rsi-divergence': drawOscillator(ctx, width, height, '#9C27B0'); break;
            case 'macd': drawMACD(ctx, width, height); break;
            case 'stochastic': case 'stoch-rsi': drawOscillator(ctx, width, height, '#3498DB', '#F1C40F'); break;
            case 'cci': drawOscillator(ctx, width, height, '#2980B9'); break;
            case 'roc': drawOscillator(ctx, width, height, '#8E44AD'); break;
            case 'ultimate-oscillator': drawOscillator(ctx, width, height, '#27AE60'); break;
            case 'tsi': drawOscillator(ctx, width, height, '#D35400', '#2C3E50'); break;
            case 'awesome-oscillator': drawMACD(ctx, width, height, true); break;
            case 'know-sure-thing': drawOscillator(ctx, width, height, '#16A085', '#E74C3C'); break;
            case 'fisher-transform': drawOscillator(ctx, width, height, '#2ECC71', '#F39C12'); break;
            case 'coppock-curve': drawOscillator(ctx, width, height, '#34495E'); break;

            // TradingView Indicators - Volume
            case 'obv': drawOscillator(ctx, width, height, '#27AE60', undefined, false); break;
            case 'vwap': drawVWAP(ctx, width, height); break;
            case 'volume-profile': drawVolumeProfile(ctx, width, height); break;
            case 'chaikin-money-flow': case 'mfi': drawOscillator(ctx, width, height, '#16A085', undefined, true); break;
            case 'ease-of-movement': drawOscillator(ctx, width, height, '#8E44AD', undefined, true); break;
            case 'accumulation-distribution': drawOscillator(ctx, width, height, '#2980B9', undefined, false); break;
            case 'volume-oscillator': case 'net-volume': case 'volume-rate-of-change': drawVolumeBars(ctx, width, height, true); break;
            case 'force-index': drawOscillator(ctx, width, height, '#C0392B', undefined, true); break;
            case 'negative-volume-index': drawOscillator(ctx, width, height, '#7F8C8D', undefined, false); break;

            // TradingView Indicators - Volatility
            case 'atr': drawOscillator(ctx, width, height, '#E67E22', undefined, false); break;
            case 'bollinger-bands': drawBollingerBands(ctx, width, height, '#2196F3'); break;
            case 'keltner-channels': drawBollingerBands(ctx, width, height, '#009688'); break;
            case 'donchian-width': case 'bb-width': case 'relative-volatility-index': case 'chaikin-volatility': drawOscillator(ctx, width, height, '#F1C40F', undefined, false); break;
            case 'volatility-stop': drawParabolicSAR(ctx, width, height, '#E74C3C'); break;
            case 'range-filter': drawSupertrend(ctx, width, height); break;
            case 'standard-deviation': drawOscillator(ctx, width, height, '#9B59B6', undefined, false); break;

            // TradingView Indicators - Pattern & S/R
            case 'fib-retracement': drawFibRetracement(ctx, width, height); break;
            case 'harmonic-patterns': drawHarmonicPattern(ctx, width, height); break;
            case 'pivot-points': case 'camarilla-pivots': case 'murrey-math-lines': drawFibRetracement(ctx, width, height, true); break;
            case 'trendline-auto': drawTrendline(ctx, width, height); break;
            case 'chart-pattern-recognition': drawChartPattern(ctx, width, height); break;
            case 'breakout-box': drawBreakoutBox(ctx, width, height); break;
            case 'zigzag': drawSwingChart(ctx, width, height); break;
            case 'elliott-wave-oscillator': drawMACD(ctx, width, height, true); break;

            // TradingView Indicators - Custom
            case 'luxalgo': drawSupertrend(ctx, width, height); break;
            case 'alphatrend': drawSupertrend(ctx, width, height); break;
            case 'smc-concept': case 'order-block-finder': case 'supply-demand-zones': case 'liquidity-levels': drawBreakoutBox(ctx, width, height, true); break;
            case 'volume-heatmap': drawVolumeProfile(ctx, width, height); break;
            case 'fair-value-gap': drawBreakoutBox(ctx, width, height, true); break;
            case 'market-structure-breaks': drawTrendline(ctx, width, height); break;
            case 'wolfpack-id': drawOscillator(ctx, width, height, '#F1C40F', '#3498DB'); break;
            case 'squeeze-momentum': drawMACD(ctx, width, height, true); break;
            case 'vu-manchu-cipher': drawMACD(ctx, width, height, true); break;
            case 'divergence-for-many': drawOscillator(ctx, width, height, '#9B59B6'); break;
            case 'session-boxes': drawBreakoutBox(ctx, width, height, false); break;

            default:
                drawDefault(ctx, width, height, toolSlug);
                break;
        }
    }, [toolSlug]);
    
    // --- Price Action & Chart Element Helpers ---
    const drawPriceLine = (ctx: CanvasRenderingContext2D, w: number, h: number, color = '#0D47A1', mainChart = true) => {
        const chartH = mainChart ? h * 0.6 : h;
        const chartY = mainChart ? 0 : 0;
        ctx.beginPath();
        ctx.moveTo(w*0.1, chartY + chartH*0.6);
        ctx.lineTo(w*0.25, chartY + chartH*0.4);
        ctx.lineTo(w*0.4, chartY + chartH*0.55);
        ctx.lineTo(w*0.55, chartY + chartH*0.3);
        ctx.lineTo(w*0.7, chartY + chartH*0.45);
        ctx.lineTo(w*0.9, chartY + chartH*0.2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const drawOscillator = (ctx: CanvasRenderingContext2D, w: number, h: number, color1: string, color2?: string, hasZeroLine = true) => {
        drawPriceLine(ctx, w, h*0.6);
        ctx.strokeStyle = '#E0E0E0';
        ctx.strokeRect(0, h * 0.65, w, h * 0.35);

        if(hasZeroLine) {
            ctx.beginPath();
            ctx.moveTo(0, h * 0.825);
            ctx.lineTo(w, h * 0.825);
            ctx.strokeStyle = '#BDBDBD';
            ctx.setLineDash([2,2]);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.moveTo(w*0.1, h*0.9);
        ctx.bezierCurveTo(w*0.3, h*0.75, w*0.6, h*0.95, w*0.9, h*0.8);
        ctx.strokeStyle = color1;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (color2) {
            ctx.beginPath();
            ctx.moveTo(w*0.1, h*0.85);
            ctx.bezierCurveTo(w*0.3, h*0.8, w*0.6, h*0.9, w*0.9, h*0.75);
            ctx.strokeStyle = color2;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };

    const drawVolumeBars = (ctx: CanvasRenderingContext2D, w: number, h: number, onMainChart = false) => {
        const chartH = onMainChart ? h : h * 0.35;
        const chartY = onMainChart ? 0 : h * 0.65;
        if(!onMainChart) {
            drawPriceLine(ctx, w, h*0.6);
            ctx.strokeStyle = '#E0E0E0';
            ctx.strokeRect(0, h * 0.65, w, h * 0.35);
        }

        for(let i=0.1; i<0.9; i+=0.1) {
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)';
            const barHeight = Math.random() * chartH * 0.8;
            ctx.fillRect(w*i, chartY + chartH - barHeight, w*0.05, barHeight);
        }
    };
    
    // --- Gann Tools ---
    const drawSquareOf9 = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const size = 5;
        const cellSize = Math.min(w,h) / size;
        const center = Math.floor(size/2);
        for(let r=0; r<size; r++){
            for(let c=0; c<size; c++){
                const isCenter = r === center && c === center;
                const isCardinal = !isCenter && (r === center || c === center);
                const isOrdinal = !isCenter && (Math.abs(r-center) === Math.abs(c-center));

                if(isCenter) ctx.fillStyle = '#FFD700';
                else if(isCardinal) ctx.fillStyle = '#64B5F6';
                else if(isOrdinal) ctx.fillStyle = '#AED581';
                else ctx.fillStyle = '#FFFFFF';
                
                ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
                ctx.strokeStyle = '#E0E0E0';
                ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
            }
        }
    };
    const drawGannFan = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const pivot = {x: w * 0.1, y: h * 0.9};
        drawPriceLine(ctx, w, h);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 2]);
        ['#4CAF50', '#64B5F6', '#EF9A9A'].forEach((color, i) => {
            ctx.beginPath();
            ctx.moveTo(pivot.x, pivot.y);
            ctx.strokeStyle = color;
            ctx.lineTo(w, h * 0.7 - (i * h * 0.3));
            ctx.stroke();
        });
        ctx.setLineDash([]);
    };
    const drawGannWheel = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const center = {x: w/2, y: h/2};
        const maxRadius = Math.min(w,h) / 2 * 0.9;
        for(let i=1; i<=3; i++){
            ctx.beginPath();
            ctx.arc(center.x, center.y, maxRadius * (i/3), 0, 2 * Math.PI);
            ctx.strokeStyle = '#BDBDBD';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(center.x, center.y, maxRadius/3 * 0.8, 0, 2*Math.PI);
        ctx.fill();
    };
    const drawSwingChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.8); ctx.lineTo(w*0.3, h*0.3);
        ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.3, h*0.3); ctx.lineTo(w*0.5, h*0.6);
        ctx.strokeStyle = '#F44336'; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.5, h*0.6); ctx.lineTo(w*0.7, h*0.2);
        ctx.strokeStyle = '#4CAF50'; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.7, h*0.2); ctx.lineTo(w*0.9, h*0.5);
        ctx.strokeStyle = '#F44336'; ctx.stroke();
    };
    const drawGridOverlay = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h);
        ctx.lineWidth = 1.5;
        [0.25, 0.5, 0.75].forEach((level) => {
            ctx.strokeStyle = level === 0.5 ? '#FFD700' : '#64B5F6';
            const y = h * (1-level);
            ctx.beginPath(); ctx.setLineDash([3,3]); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        });
        ctx.setLineDash([]);
    };
    const drawGannEmblem = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const center = { x: w / 2, y: h / 2 };
        const radius = Math.min(w, h) / 2 * 0.8;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0D47A1'; ctx.beginPath(); ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI); ctx.stroke();
        ctx.strokeStyle = '#FFD700'; ctx.strokeRect(center.x - radius, center.y - radius, radius*2, radius*2);
    };

    // --- Indicator Specific Helpers ---
    const drawMACD = (ctx: CanvasRenderingContext2D, w: number, h: number, isHistogram = false) => {
        drawPriceLine(ctx, w, h*0.6);
        ctx.strokeStyle = '#E0E0E0'; ctx.strokeRect(0, h * 0.65, w, h * 0.35);
        if (isHistogram) {
             for(let i=0.1; i<0.9; i+=0.05) {
                const isUp = Math.random() > 0.5;
                ctx.fillStyle = isUp ? 'rgba(76, 175, 80, 0.6)' : 'rgba(244, 67, 54, 0.6)';
                const barHeight = Math.random() * h * 0.15;
                ctx.fillRect(w*i, h * 0.825, w*0.03, isUp ? -barHeight : barHeight);
            }
        } else {
            ctx.beginPath(); ctx.moveTo(w*0.1, h*0.8); ctx.bezierCurveTo(w*0.4, h*0.7, w*0.6, h*0.9, w*0.9, h*0.85);
            ctx.strokeStyle = '#FFC107'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(w*0.1, h*0.85); ctx.bezierCurveTo(w*0.4, h*0.75, w*0.6, h*0.85, w*0.9, h*0.9);
            ctx.strokeStyle = '#2196F3'; ctx.stroke();
        }
    };
    const drawMovingAverage = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h, '#BDBDBD');
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.8); ctx.bezierCurveTo(w*0.3, h*0.5, w*0.6, h*0.4, w*0.9, h*0.3);
        ctx.strokeStyle = '#2196F3'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.7); ctx.bezierCurveTo(w*0.3, h*0.6, w*0.6, h*0.5, w*0.9, h*0.4);
        ctx.strokeStyle = '#F57C00'; ctx.lineWidth = 2; ctx.setLineDash([2,2]); ctx.stroke(); ctx.setLineDash([]);
    };
    const drawSupertrend = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h);
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.7); ctx.lineTo(w*0.5, h*0.65);
        ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.55, h*0.2); ctx.lineTo(w*0.9, h*0.3);
        ctx.strokeStyle = '#F44336'; ctx.stroke();
    };
    const drawBollingerBands = (ctx: CanvasRenderingContext2D, w: number, h: number, color: string) => {
        drawPriceLine(ctx, w, h, '#757575');
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.7); ctx.bezierCurveTo(w*0.3, h*0.8, w*0.6, h*0.7, w*0.9, h*0.8);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.5); ctx.bezierCurveTo(w*0.3, h*0.3, w*0.6, h*0.2, w*0.9, h*0.1);
        ctx.stroke();
    };
    const drawIchimokuCloud = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h, '#757575');
        ctx.beginPath();
        const p1 = {x: w*0.4, y: h*0.8}; const p2 = {x: w, y: h*0.6};
        const p3 = {x: w, y: h*0.4}; const p4 = {x: w*0.4, y: h*0.5};
        ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y);
        ctx.closePath(); ctx.fillStyle = 'rgba(76, 175, 80, 0.2)'; ctx.fill();
    };
    const drawFibRetracement = (ctx: CanvasRenderingContext2D, w: number, h: number, isPivots = false) => {
        drawPriceLine(ctx, w, h);
        [0.382, 0.5, 0.618].forEach(level => {
            const y = h * (1 - level);
            ctx.beginPath(); ctx.moveTo(isPivots ? 0 : w*0.5, y); ctx.lineTo(w, y);
            ctx.strokeStyle = isPivots ? '#9C27B0' : '#FF9800';
            ctx.lineWidth = 1; ctx.setLineDash([3,3]); ctx.stroke();
        });
        ctx.setLineDash([]);
    };
    const drawVolumeProfile = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h);
        ctx.fillStyle = 'rgba(13, 71, 161, 0.2)';
        ctx.fillRect(w*0.7, h*0.4, w*0.2, h*0.05);
        ctx.fillRect(w*0.6, h*0.5, w*0.3, h*0.05);
        ctx.fillRect(w*0.8, h*0.6, w*0.1, h*0.05);
    };
    const drawADX = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawOscillator(ctx, w, h, '#FDD835', '#4FC3F7', true);
    };
    const drawParabolicSAR = (ctx: CanvasRenderingContext2D, w: number, h: number, color = '#00ACC1') => {
        drawPriceLine(ctx, w, h);
        for(let i=0.1; i<0.9; i+=0.1) {
            ctx.beginPath();
            ctx.arc(w*i, h*(i < 0.5 ? 0.7 : 0.1), 2, 0, 2*Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }
    };
    const drawKijunSen = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h, '#BDBDBD');
        ctx.beginPath();
        ctx.moveTo(w*0.1, h*0.6); ctx.lineTo(w*0.3, h*0.6); ctx.lineTo(w*0.5, h*0.4); ctx.lineTo(w*0.7, h*0.4); ctx.lineTo(w*0.9, h*0.3);
        ctx.strokeStyle = '#D32F2F'; ctx.lineWidth = 2; ctx.stroke();
    };
    const drawVWAP = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h, '#BDBDBD');
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.7); ctx.bezierCurveTo(w*0.3, h*0.6, w*0.6, h*0.5, w*0.9, h*0.4);
        ctx.strokeStyle = '#FF9800'; ctx.lineWidth = 2; ctx.stroke();
    };
    const drawHarmonicPattern = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.beginPath();
        ctx.moveTo(w*0.1, h*0.7); ctx.lineTo(w*0.3, h*0.3); ctx.lineTo(w*0.5, h*0.8); ctx.lineTo(w*0.7, h*0.4); ctx.lineTo(w*0.9, h*0.6);
        ctx.strokeStyle = '#03A9F4'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = 'rgba(3, 169, 244, 0.1)'; ctx.closePath(); ctx.fill();
    };
    const drawTrendline = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        drawPriceLine(ctx, w, h);
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.65); ctx.lineTo(w*0.9, h*0.25);
        ctx.strokeStyle = '#E91E63'; ctx.lineWidth = 1.5; ctx.setLineDash([2,2]); ctx.stroke(); ctx.setLineDash([]);
    };
    const drawChartPattern = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.beginPath();
        ctx.moveTo(w*0.1, h*0.6); ctx.lineTo(w*0.3, h*0.3); ctx.lineTo(w*0.5, h*0.5); ctx.lineTo(w*0.7, h*0.4); ctx.lineTo(w*0.9, h*0.45);
        ctx.strokeStyle = '#3F51B5'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.6); ctx.lineTo(w*0.9, h*0.2); ctx.strokeStyle = '#9E9E9E'; ctx.setLineDash([2,2]); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w*0.1, h*0.7); ctx.lineTo(w*0.9, h*0.6); ctx.stroke(); ctx.setLineDash([]);
    };
    const drawBreakoutBox = (ctx: CanvasRenderingContext2D, w: number, h: number, hasZones = false) => {
        drawPriceLine(ctx, w, h);
        if (hasZones) {
            ctx.fillStyle = 'rgba(239, 83, 80, 0.2)'; ctx.fillRect(0, h*0.2, w, h*0.15);
            ctx.fillStyle = 'rgba(102, 187, 106, 0.2)'; ctx.fillRect(0, h*0.7, w, h*0.15);
        } else {
            ctx.strokeStyle = '#607D8B'; ctx.lineWidth = 1.5; ctx.setLineDash([3,3]);
            ctx.strokeRect(w*0.2, h*0.3, w*0.5, h*0.4); ctx.setLineDash([]);
        }
    };
    const drawDefault = (ctx: CanvasRenderingContext2D, w: number, h: number, name: string) => {
        ctx.strokeStyle = '#BDBDBD'; ctx.lineWidth = 1; ctx.strokeRect(w*0.1, h*0.1, w*0.8, h*0.8);
        ctx.font = `bold ${h/6}px sans-serif`; ctx.fillStyle = '#9E9E9E';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const simpleName = name.replace('gann-', '').replace('-calculator','').replace('-tool','').replace('-',' ').split(' ')[0];
        ctx.fillText(simpleName.charAt(0).toUpperCase() + simpleName.slice(1), w/2, h/2);
    };
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const width = 300;
        const height = 200;
        canvas.width = width;
        canvas.height = height;

        draw(ctx, width, height);

    }, [draw]);

    return (
        <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover"
            aria-label={`Visual representation of ${toolSlug}`}
            width="300"
            height="200"
        />
    );
};

export default StaticChartThumbnail;