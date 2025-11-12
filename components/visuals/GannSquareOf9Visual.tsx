import React, { useRef, useEffect, useCallback } from 'react';

const generateSquareOf9 = (center: number, size: number) => {
    if (center <= 0 || size % 2 === 0) return [];
    
    const grid: (number | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);
    
    grid[y][x] = center;

    let currentValue = center;
    let step = 1;
    let direction = 0; // 0: right, 1: up, 2: left, 3: down
    let stepsTaken = 0;
    
    while(currentValue < center + size * size) {
        if (stepsTaken === step) {
            direction = (direction + 1) % 4;
            stepsTaken = 0;
            if (direction === 0 || direction === 2) step++;
        }
        
        if (x === 0 && y === 0 && size > 1) break;

        switch(direction) {
            case 0: x++; break;
            case 1: y--; break;
            case 2: x--; break;
            case 3: y++; break;
        }
        
        stepsTaken++;
        currentValue++;

        if (x >= 0 && x < size && y >= 0 && y < size) {
            grid[y][x] = currentValue;
        } else {
            break;
        }
    }
    return grid;
};

interface GannSquareOf9VisualProps {
  centerValue: number;
  size: number;
}

const GannSquareOf9Visual: React.FC<GannSquareOf9VisualProps> = ({ centerValue, size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const cellSize = Math.min(width, height) / size;
    const grid = generateSquareOf9(centerValue, size);

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${cellSize / 3.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerIndex = Math.floor(size / 2);

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const cellValue = grid[r][c];
            if (cellValue === null) continue;

            const isCenter = r === centerIndex && c === centerIndex;
            const isCardinal = !isCenter && (r === centerIndex || c === centerIndex);
            const isOrdinal = !isCenter && (Math.abs(r - centerIndex) === Math.abs(c - centerIndex));

            let fillStyle = '#FFFFFF'; // White
            if(isCenter) fillStyle = '#FFD700'; // Gold
            else if(isCardinal) fillStyle = '#64B5F6'; // Blue
            else if(isOrdinal) fillStyle = '#AED581'; // Light Green
            
            ctx.fillStyle = fillStyle;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            
            ctx.strokeStyle = '#E0E0E0'; // Light grey grid lines
            ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);

            ctx.fillStyle = isCenter ? '#000000' : '#1A202C'; // Black on gold, dark otherwise
            ctx.fillText(cellValue.toFixed(0), c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
        }
    }
  }, [centerValue, size]);

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
                drawGrid();
            }
        });
        resizeObserver.observe(parent);
        return () => resizeObserver.unobserve(parent);
    }, [drawGrid]);

  return <canvas ref={canvasRef} style={{ margin: 'auto', display: 'block' }} />;
};

export default GannSquareOf9Visual;