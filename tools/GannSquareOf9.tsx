import React, { useState, useMemo, useCallback } from 'react';

// Helper to generate the Square of 9 grid
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
    
    while(x >= 0 && x < size && y >= 0 && y < size) {
        if (stepsTaken === step) {
            direction = (direction + 1) % 4;
            stepsTaken = 0;
            if (direction === 0 || direction === 2) {
                step++;
            }
        }
        
        if (x === 0 && y === 0 && size > 1) break; // Break if we hit corner and filled out

        switch(direction) {
            case 0: x++; break; // right
            case 1: y--; break; // up
            case 2: x--; break; // left
            case 3: y++; break; // down
        }
        
        stepsTaken++;
        currentValue++;

        if (x >= 0 && x < size && y >= 0 && y < size) {
            grid[y][x] = currentValue;
        }
    }
    return grid;
};

export default function GannSquareOf9() {
    const [startPrice, setStartPrice] = useState('100');
    const [gridSize, setGridSize] = useState(5);
    const [tooltip, setTooltip] = useState<{ visible: boolean; content: string; x: number; y: number }>({
        visible: false,
        content: '',
        x: 0,
        y: 0,
    });
    
    const grid = useMemo(() => {
        const center = parseFloat(startPrice);
        if (!isNaN(center) && center > 0 && gridSize > 0 && gridSize % 2 !== 0) {
            return generateSquareOf9(center, gridSize);
        }
        return [];
    }, [startPrice, gridSize]);

    const centerIndex = Math.floor(gridSize / 2);

    const isCardinal = (r: number, c: number) => r === centerIndex || c === centerIndex;
    const isOrdinal = (r: number, c: number) => Math.abs(r - centerIndex) === Math.abs(c - centerIndex);

    const getCellClass = (r: number, c: number) => {
        if (r === centerIndex && c === centerIndex) return 'bg-brand-gold text-brand-dark font-bold';
        if (isCardinal(r, c)) return 'bg-blue-200';
        if (isOrdinal(r, c)) return 'bg-blue-100';
        return 'bg-white';
    };

    const getTooltipContent = (r: number, c: number) => {
        if (r === centerIndex && c === centerIndex) return 'Center/Pivot Price: The starting point of the square.';
        if (isCardinal(r, c)) return 'Cardinal Cross: Represents major support and resistance levels. These are direct vertical or horizontal lines from the center.';
        if (isOrdinal(r, c)) return 'Ordinal Cross: Represents secondary, but still significant, support and resistance levels. These are the diagonal lines from the center.';
        return null;
    };

    const handleMouseEnter = (event: React.MouseEvent, r: number, c: number) => {
        const content = getTooltipContent(r, c);
        if (content) {
            setTooltip({
                visible: true,
                content,
                x: event.clientX + 10,
                y: event.clientY + 10,
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };
    
    const resultsText = useMemo(() => {
       if (!grid.length) return '';
       let text = `Gann Square of 9 Results (Center: ${startPrice})\n\n`;
       text += `Cardinal Cross Levels:\n`;
       grid[centerIndex].forEach(val => val !== null && val !== parseFloat(startPrice) ? text += `${val.toFixed(2)}, ` : '');
       grid.forEach(row => row[centerIndex] !== null && row[centerIndex] !== parseFloat(startPrice) ? text += `${row[centerIndex].toFixed(2)}, ` : '');
       text = text.slice(0, -2) + '\n\n';

       text += `Ordinal Cross Levels:\n`;
       grid.forEach((row, r) => row.forEach((val, c) => {
          if (isOrdinal(r,c) && !(r === centerIndex && c === centerIndex) && val !== null) {
              text += `${val.toFixed(2)}, `;
          }
       }));
       text = text.slice(0, -2);
       return text;

    }, [grid, startPrice, centerIndex]);

    const handleCopyResults = useCallback(() => {
        navigator.clipboard.writeText(resultsText).then(() => {
            alert('Results copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy results.');
        });
    }, [resultsText]);
    
    return (
        <>
            {tooltip.visible && (
                <div
                    style={{ top: tooltip.y, left: tooltip.x }}
                    className="fixed bg-brand-dark text-white text-xs rounded-md p-2 z-50 max-w-xs shadow-lg pointer-events-none"
                >
                    {tooltip.content}
                </div>
            )}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div>
                        <label htmlFor="startPrice" className="block text-sm font-medium text-gray-700">Start Price / Pivot</label>
                        <input
                            type="number"
                            id="startPrice"
                            value={startPrice}
                            onChange={(e) => setStartPrice(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="e.g., 100"
                        />
                    </div>
                    <div>
                        <label htmlFor="gridSize" className="block text-sm font-medium text-gray-700">Grid Size (odd numbers)</label>
                        <input
                            type="number"
                            id="gridSize"
                            value={gridSize}
                            onChange={(e) => setGridSize(parseInt(e.target.value, 10) || 1)}
                            step="2"
                            min="3"
                            max="21"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        />
                    </div>
                    <div className="space-x-2">
                        <button onClick={handleCopyResults} className="px-4 py-2 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-800 transition-colors text-sm">Copy Results</button>
                    </div>
                    <div className="text-xs text-gray-500 pt-4">
                        <p><span className="font-bold text-blue-600">Cardinal Cross (Blue):</span> Major support/resistance.</p>
                        <p><span className="font-bold text-blue-400">Ordinal Cross (Light Blue):</span> Secondary support/resistance.</p>
                        <p className="mt-2"><i>Hover over the grid cells for more information.</i></p>
                    </div>
                </div>

                {/* Grid Display */}
                <div className="w-full md:w-2/3">
                    <div className="aspect-square border rounded-lg p-2 bg-slate-200 shadow-inner">
                        {grid.length > 0 ? (
                            <div className={`grid gap-1`} style={{gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`}}>
                                {grid.map((row, r) => 
                                    row.map((cell, c) => (
                                        <div 
                                            key={`${r}-${c}`} 
                                            className={`aspect-square flex items-center justify-center text-xs sm:text-sm rounded cursor-help ${getCellClass(r, c)}`}
                                            onMouseEnter={(e) => handleMouseEnter(e, r, c)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {cell !== null ? cell.toFixed(2) : ''}
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Please enter a valid start price and odd grid size.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}