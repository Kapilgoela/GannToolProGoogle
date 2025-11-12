import React from 'react';
import { GannTool, BlogPost, TradingViewIndicator, TradingViewCategory } from './types';
import GannSquareOf9 from './tools/GannSquareOf9';
import GannFanTool from './tools/GannFanTool';
import GannWheel from './tools/GannWheel';
import GannEmblem from './tools/GannEmblem';
import GannAngleCalculator from './tools/GannAngleCalculator';
import GannDateTimePredictor from './tools/GannDateTimePredictor';
import GannSwingChartTool from './tools/GannSwingChartTool';
import GannGridOverlay from './tools/GannGridOverlay';


// SVG Icons for tools
const SquareIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zm-8 4h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8 4h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"}))
);
const FanIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M21 21H3v-2h16.6L4.4 3.8 5.8 2.4 21 17.6V3h2v18h-2v-2z"}))
);
const WheelIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-11h2v5h-2v-5zm0 6h2v2h-2v-2z"}))
);
const EmblemIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M12 2l-10 6 10 6 10-6L12 2zm0 8.24L4.82 6 12 3.76 19.18 6 12 10.24zM2 14.5l10 6 10-6-10-6-10 6zm10 4.24L4.82 14.5l7.18-4.24 7.18 4.24L12 18.74z"}))
);
const AngleIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M12,2L3,22h18L12,2z M12,6.44L14.7,12h-5.4L12,6.44z M7.09,19l4.91-9h0.01l4.9,9H7.09z"}))
);
const TimeIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"}))
);
const SwingIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"}))
);
const GridIcon = ({ className }: { className?: string }) => (
    React.createElement("svg", { className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor"}, React.createElement("path", {d: "M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 1h4v2h-4v-2zm6-1h4v4h-4v-4z"}))
);
// SVG Icons for TV Categories
// FIX: Converted JSX to React.createElement to be valid in a .ts file.
const TrendIcon = ({ className }: { className?: string }) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }));
const MomentumIcon = ({ className }: { className?: string }) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }));
const VolumeIcon = ({ className }: { className?: string }) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }));
const VolatilityIcon = ({ className }: { className?: string }) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8c-3.314 0-6 1.79-6 4s2.686 4 6 4 6-1.79 6-4-2.686-4-6-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-10c-5.523 0-10 3.582-10 8s4.477 8 10 8 10-3.582 10-8-4.477-8-10-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" }));
const PatternIcon = ({ className }: { className?: string }) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 19l-7-7 7-7m8 14l7-7-7-7" }));
const CustomIcon = ({ className }: { className?: string }) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }));


export const GANN_TOOLS: GannTool[] = [
  { slug: 'gann-square-of-9-calculator', name: 'Gann Square of 9 Calculator', description: 'Calculate key support and resistance levels based on a spiral number grid.', icon: SquareIcon, component: GannSquareOf9, tags: ['calculator', 'levels', 'support', 'resistance']},
  { slug: 'gann-fan-tool', name: 'Gann Fan Tool', description: 'Draw geometric angles from price pivots to identify trend lines and market patterns.', icon: FanIcon, component: GannFanTool, tags: ['charting', 'angles', 'trend', 'visual']},
  { slug: 'gann-wheel-square-of-144', name: 'Gann Wheel / Square of 144', description: 'A master calculator combining price and time into a 360-degree circle.', icon: WheelIcon, component: GannWheel, tags: ['master chart', 'time', 'price', 'cycles']},
  { slug: 'gann-emblem', name: 'Gann Emblem', description: 'A unique diagram showing the harmony of square, circle, and triangle.', icon: EmblemIcon, component: GannEmblem, tags: ['geometry', 'harmony', 'patterns', 'visual']},
  { slug: 'gann-angle-calculator', name: 'Gann Angle Calculator', description: 'Determine the slope of trend lines based on price and time relationships.', icon: AngleIcon, component: GannAngleCalculator, tags: ['calculator', 'angles', 'trend', 'slope']},
  { slug: 'gann-date-time-predictor', name: 'Gann Date & Time Predictor', description: 'Forecast potential market turning points using historical time cycles.', icon: TimeIcon, component: GannDateTimePredictor, tags: ['forecasting', 'time cycles', 'prediction', 'dates']},
  { slug: 'gann-swing-chart-tool', name: 'Gann Swing Chart Tool', description: 'Identify market trends and reversals by tracking price swing patterns.', icon: SwingIcon, component: GannSwingChartTool, tags: ['charting', 'swings', 'trend', 'reversals']},
  { slug: 'gann-grid-overlay', name: 'Gann Grid Overlay', description: 'Apply a grid of support and resistance lines to your price chart.', icon: GridIcon, component: GannGridOverlay, tags: ['charting', 'grid', 'levels', 'visual']},
];

export const TRADINGVIEW_CATEGORIES: TradingViewCategory[] = [
    { slug: 'trend', name: 'Trend Indicators', description: 'Identify the direction and strength of market trends.', icon: TrendIcon },
    { slug: 'momentum', name: 'Momentum Indicators', description: 'Measure the velocity of price changes to find overbought/oversold conditions.', icon: MomentumIcon },
    { slug: 'volume', name: 'Volume Indicators', description: 'Use trading volume to confirm trends and spot reversals.', icon: VolumeIcon },
    { slug: 'volatility', name: 'Volatility Indicators', description: 'Measure the rate of price fluctuation to identify risk and market conditions.', icon: VolatilityIcon },
    { slug: 'pattern', name: 'Pattern & Support/Resistance', description: 'Automatically identify chart patterns, pivots, and key price levels.', icon: PatternIcon },
    { slug: 'custom', name: 'Custom Scripts & Premium Picks', description: 'Explore powerful, community-built scripts and advanced trading concepts.', icon: CustomIcon },
];

export const ALL_TRADINGVIEW_INDICATORS: TradingViewIndicator[] = [
    // Trend
    { slug: 'supertrend', name: 'Supertrend', description: 'A popular trend-following indicator that plots a line over the price, indicating the current trend direction.', tags: ['Trend'], categorySlug: 'trend' },
    { slug: 'moving-average', name: 'Moving Average (MA)', description: 'Calculates the average price over a specific period, smoothing out price action to identify the trend.', tags: ['Trend'], categorySlug: 'trend' },
    { slug: 'ema-cross', name: 'EMA Cross (9/21)', description: 'A strategy that uses two Exponential Moving Averages. A buy or sell signal is generated when the two EMAs cross.', tags: ['Trend', 'Momentum'], categorySlug: 'trend' },
    { slug: 'hull-ma', name: 'Hull Moving Average (HMA)', description: 'A fast and smooth moving average that almost eliminates lag and improves responsiveness.', tags: ['Trend'], categorySlug: 'trend' },
    { slug: 'parabolic-sar', name: 'Parabolic SAR', description: 'A time and price technical analysis tool used to determine the direction of a trend and potential reversal points.', tags: ['Trend', 'Volatility'], categorySlug: 'trend' },
    { slug: 'gann-fan-tv', name: 'Gann Fan', description: 'A built-in TradingView tool based on W.D. Gann\'s theory that time and price are geometrically related.', tags: ['Trend', 'Support/Resistance'], categorySlug: 'trend' },
    { slug: 'donchian-channels', name: 'Donchian Channels', description: 'A volatility indicator that plots the highest high and lowest low over a period, creating a channel.', tags: ['Trend', 'Volatility'], categorySlug: 'trend' },
    { slug: 'kijun-sen', name: 'Ichimoku Kijun-Sen', description: 'Part of the Ichimoku system, it acts as a dynamic support/resistance and trend direction indicator.', tags: ['Trend', 'Support/Resistance'], categorySlug: 'trend' },
    { slug: 'tema', name: 'Triple Exponential Moving Average (TEMA)', description: 'Reduces lag more effectively than a standard EMA, providing a quicker response to price changes.', tags: ['Trend'], categorySlug: 'trend' },
    { slug: 'dema', name: 'Double Exponential Moving Average (DEMA)', description: 'A fast-acting moving average that takes the standard EMA a step further to reduce lag.', tags: ['Trend'], categorySlug: 'trend' },
    { slug: 'ichimoku-cloud', name: 'Ichimoku Cloud', description: 'A collection of technical indicators that show support and resistance levels, as well as momentum and trend direction.', tags: ['Trend', 'Support/Resistance'], categorySlug: 'trend' },
    { slug: 'adx', name: 'ADX & DI', description: 'Used to determine the strength of a trend, not its direction. It fluctuates from 0 to 100.', tags: ['Trend', 'Volatility'], categorySlug: 'trend' },
    { slug: 'aroon', name: 'Aroon', description: 'An indicator system that determines whether a security is in a trend and how strong that trend is.', tags: ['Trend', 'Momentum'], categorySlug: 'trend' },
    { slug: 'vortex-indicator', name: 'Vortex Indicator (VI)', description: 'Used to spot trend reversals and confirm current trends by plotting two oscillating lines.', tags: ['Trend'], categorySlug: 'trend' },
    { slug: 'qstick', name: 'Qstick', description: 'A technical analysis indicator that quantifies and displays the bullish/bearish sentiment of candlestick charts.', tags: ['Trend', 'Momentum'], categorySlug: 'trend' },
    // Momentum
    { slug: 'rsi', name: 'RSI (Relative Strength Index)', description: 'A momentum oscillator measuring the speed and change of price movements to identify overbought or oversold conditions.', tags: ['Momentum', 'Volatility'], categorySlug: 'momentum' },
    { slug: 'macd', name: 'MACD', description: 'A trend-following momentum indicator that shows the relationship between two moving averages of a security’s price.', tags: ['Trend', 'Momentum'], categorySlug: 'momentum' },
    { slug: 'stochastic', name: 'Stochastic Oscillator', description: 'A momentum indicator comparing a particular closing price of a security to a range of its prices over a certain period of time.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'cci', name: 'Commodity Channel Index (CCI)', description: 'An oscillator used to identify cyclical trends in commodity prices, but applicable to all markets.', tags: ['Momentum', 'Volatility'], categorySlug: 'momentum' },
    { slug: 'roc', name: 'Rate of Change (ROC)', description: 'A momentum-based technical indicator that measures the percentage change in price between the current price and the price a certain number of periods ago.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'momentum-indicator', name: 'Momentum Indicator', description: 'A simple oscillator that measures the speed of price changes over a given time frame.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'ultimate-oscillator', name: 'Ultimate Oscillator', description: 'A technical indicator that uses the weighted average of three different time periods to reduce volatility and false signals.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'williams-r', name: 'Williams %R', description: 'A momentum indicator that is the inverse of the Stochastic Oscillator. It reflects the level of the close relative to the highest high for the look-back period.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'tsi', name: 'True Strength Index (TSI)', description: 'A momentum oscillator based on a double smoothing of price changes, providing a clear view of trend and momentum.', tags: ['Momentum', 'Trend'], categorySlug: 'momentum' },
    { slug: 'rsi-divergence', name: 'RSI Divergence Indicator', description: 'Automatically plots bullish and bearish divergences between price and the RSI, signaling potential reversals.', tags: ['Momentum', 'Pattern'], categorySlug: 'momentum' },
    { slug: 'awesome-oscillator', name: 'Awesome Oscillator (AO)', description: 'Calculates the difference between a 34-period and 5-period simple moving average.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'stoch-rsi', name: 'Stochastic RSI', description: 'An indicator that applies the Stochastic formula to RSI values, rather than price data, making it an indicator of an indicator.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'know-sure-thing', name: 'Know Sure Thing (KST)', description: 'A momentum oscillator based on the smoothed rate-of-change over four different time periods.', tags: ['Momentum', 'Trend'], categorySlug: 'momentum' },
    { slug: 'fisher-transform', name: 'Fisher Transform', description: 'An indicator that converts prices into a Gaussian normal distribution, helping to identify price reversals.', tags: ['Momentum'], categorySlug: 'momentum' },
    { slug: 'coppock-curve', name: 'Coppock Curve', description: 'A long-term price momentum indicator used primarily to recognize major bottoms in stock indices.', tags: ['Momentum', 'Trend'], categorySlug: 'momentum' },
    // Volume
    { slug: 'obv', name: 'On-Balance Volume (OBV)', description: 'Uses volume flow to predict changes in stock price. A rising OBV reflects positive volume pressure.', tags: ['Volume', 'Momentum'], categorySlug: 'volume' },
    { slug: 'vwap', name: 'Volume Weighted Average Price (VWAP)', description: 'The average price a security has traded at throughout the day, based on both volume and price.', tags: ['Volume', 'Support/Resistance'], categorySlug: 'volume' },
    { slug: 'volume-profile', name: 'Volume Profile (Visible Range)', description: 'Displays trading activity over a specified time period at specified price levels, indicating significant support/resistance.', tags: ['Volume', 'Support/Resistance'], categorySlug: 'volume' },
    { slug: 'chaikin-money-flow', name: 'Chaikin Money Flow (CMF)', description: 'Measures the amount of Money Flow Volume over a set period. It helps determine buying or selling pressure.', tags: ['Volume', 'Momentum'], categorySlug: 'volume' },
    { slug: 'mfi', name: 'Money Flow Index (MFI)', description: 'A momentum indicator that uses price and volume to identify overbought or oversold signals.', tags: ['Volume', 'Momentum'], categorySlug: 'volume' },
    { slug: 'ease-of-movement', name: 'Ease of Movement (EOM)', description: 'Relates price change to volume and is particularly useful for assessing the strength of a trend.', tags: ['Volume', 'Trend'], categorySlug: 'volume' },
    { slug: 'accumulation-distribution', name: 'Accumulation/Distribution Line (A/D)', description: 'A volume-based indicator designed to measure the cumulative flow of money into and out of a security.', tags: ['Volume', 'Trend'], categorySlug: 'volume' },
    { slug: 'volume-oscillator', name: 'Volume Oscillator', description: 'Computes a fast and slow volume moving average, showing the difference between the two to highlight volume surges.', tags: ['Volume'], categorySlug: 'volume' },
    { slug: 'net-volume', name: 'Net Volume', description: 'A technical analysis indicator that displays the difference between a security\'s upticks and downticks.', tags: ['Volume'], categorySlug: 'volume' },
    { slug: 'force-index', name: 'Force Index (FI)', description: 'An indicator that uses price and volume to assess the power behind a move or identify possible turning points.', tags: ['Volume', 'Momentum'], categorySlug: 'volume' },
    { slug: 'negative-volume-index', name: 'Negative Volume Index (NVI)', description: 'A cumulative indicator that uses the change in volume to decide when the smart money is active.', tags: ['Volume'], categorySlug: 'volume' },
    { slug: 'volume-rate-of-change', name: 'Volume Rate of Change (VROC)', description: 'Highlights increases in volume, which typically occur at market tops, bottoms or breakouts.', tags: ['Volume'], categorySlug: 'volume' },
    // Volatility
    { slug: 'atr', name: 'Average True Range (ATR)', description: 'A technical analysis indicator that measures market volatility by decomposing the entire range of an asset price for that period.', tags: ['Volatility'], categorySlug: 'volatility' },
    { slug: 'bollinger-bands', name: 'Bollinger Bands', description: 'Volatility bands placed above and below a moving average. Volatility is based on the standard deviation.', tags: ['Volatility', 'Trend'], categorySlug: 'volatility' },
    { slug: 'keltner-channels', name: 'Keltner Channels', description: 'Volatility-based bands that are placed on either side of an asset\'s price and can aid in determining the direction of a trend.', tags: ['Volatility', 'Trend'], categorySlug: 'volatility' },
    { slug: 'donchian-width', name: 'Donchian Channel Width', description: 'An indicator that measures the difference between the upper and lower Donchian channel lines, indicating changes in volatility.', tags: ['Volatility'], categorySlug: 'volatility' },
    { slug: 'volatility-stop', name: 'Volatility Stop', description: 'An indicator that identifies stop-loss levels based on a market\'s recent volatility (ATR).', tags: ['Volatility', 'Trend'], categorySlug: 'volatility' },
    { slug: 'range-filter', name: 'Range Filter', description: 'A technical indicator that measures the volatility of a market and filters out smaller, less significant price movements.', tags: ['Volatility', 'Trend'], categorySlug: 'volatility' },
    { slug: 'standard-deviation', name: 'Standard Deviation', description: 'A statistical measure of the amount of variation or dispersion of a set of values, used to measure volatility.', tags: ['Volatility'], categorySlug: 'volatility' },
    { slug: 'chaikin-volatility', name: 'Chaikin Volatility', description: 'This indicator depicts the volatility by calculating the difference between the high and low prices of a security.', tags: ['Volatility'], categorySlug: 'volatility' },
    { slug: 'bb-width', name: 'Bollinger Bands Width', description: 'Calculates the percentage difference between the upper and lower Bollinger Bands, quantifying volatility.', tags: ['Volatility'], categorySlug: 'volatility' },
    { slug: 'relative-volatility-index', name: 'Relative Volatility Index (RVI)', description: 'Measures the direction of volatility on a scale of 0 to 100.', tags: ['Volatility'], categorySlug: 'volatility' },
    // Pattern & S/R
    { slug: 'fib-retracement', name: 'Fibonacci Retracement', description: 'A tool used to identify potential support and resistance levels by drawing horizontal lines at key Fibonacci ratios.', tags: ['Support/Resistance', 'Pattern'], categorySlug: 'pattern' },
    { slug: 'harmonic-patterns', name: 'Harmonic Patterns', description: 'Automatically identifies and draws various harmonic patterns like Gartley, Bat, and Butterfly.', tags: ['Pattern', 'Support/Resistance'], categorySlug: 'pattern' },
    { slug: 'pivot-points', name: 'Pivot Points Standard', description: 'Calculates and displays significant support and resistance levels based on previous high, low, and close prices.', tags: ['Support/Resistance'], categorySlug: 'pattern' },
    { slug: 'trendline-auto', name: 'Trendline Auto-Plotter', description: 'A script that automatically draws significant trendlines on the chart, identifying key support and resistance.', tags: ['Support/Resistance', 'Pattern'], categorySlug: 'pattern' },
    { slug: 'chart-pattern-recognition', name: 'Chart Pattern Recognition', description: 'Identifies common chart patterns like triangles, wedges, and channels automatically.', tags: ['Pattern'], categorySlug: 'pattern' },
    { slug: 'breakout-box', name: 'Breakout Box', description: 'Draws a box around a consolidation range, highlighting potential breakout and breakdown levels.', tags: ['Pattern', 'Support/Resistance'], categorySlug: 'pattern' },
    { slug: 'camarilla-pivots', name: 'Camarilla Pivot Points', description: 'A pivot point trading indicator that provides eight levels for support, resistance, and potential breakouts.', tags: ['Support/Resistance'], categorySlug: 'pattern' },
    { slug: 'murrey-math-lines', name: 'Murrey Math Lines', description: 'A geometric trading system that plots a series of 8 horizontal lines representing support and resistance.', tags: ['Support/Resistance'], categorySlug: 'pattern' },
    { slug: 'zigzag', name: 'Zig Zag', description: 'A tool that filters out small price movements, making it easier to identify significant trends and chart patterns.', tags: ['Pattern', 'Trend'], categorySlug: 'pattern' },
    { slug: 'elliott-wave-oscillator', name: 'Elliott Wave Oscillator', description: 'Helps traders identify the five-wave and three-wave patterns of Elliott Wave Theory.', tags: ['Pattern', 'Momentum'], categorySlug: 'pattern' },
    // Custom & Premium
    { slug: 'luxalgo', name: 'LuxAlgo Premium', description: 'A popular suite of premium indicators known for its confirmation signals, trend catchers, and contrarian oscillators.', tags: ['Custom', 'Trend', 'Momentum'], categorySlug: 'custom' },
    { slug: 'alphatrend', name: 'AlphaTrend', description: 'A well-regarded community script that combines moving averages and ATR to create a responsive trend-following indicator.', tags: ['Custom', 'Trend'], categorySlug: 'custom' },
    { slug: 'smc-concept', name: 'SMC Concept (by Smart Money)', description: 'Indicators designed around "Smart Money Concepts," plotting order blocks, liquidity grabs, and breaker blocks.', tags: ['Custom', 'Support/Resistance'], categorySlug: 'custom' },
    { slug: 'volume-heatmap', name: 'Volume Heatmap', description: 'Visualizes high-volume nodes on the chart, showing areas of strong support and resistance as a heatmap.', tags: ['Custom', 'Volume', 'Support/Resistance'], categorySlug: 'custom' },
    { slug: 'order-block-finder', name: 'Order Block Finder', description: 'Automatically identifies and highlights bullish and bearish order blocks where institutional orders are likely placed.', tags: ['Custom', 'Support/Resistance'], categorySlug: 'custom' },
    { slug: 'supply-demand-zones', name: 'Supply-Demand Zones', description: 'Draws zones of high supply (resistance) and demand (support) based on price action.', tags: ['Custom', 'Support/Resistance'], categorySlug: 'custom' },
    { slug: 'fair-value-gap', name: 'Fair Value Gap (FVG) Detector', description: 'Identifies and highlights Fair Value Gaps or imbalances in the market, which often act as price magnets.', tags: ['Custom', 'Pattern'], categorySlug: 'custom' },
    { slug: 'market-structure-breaks', name: 'Market Structure Breaks (BOS/CHoCH)', description: 'Automatically plots Break of Structure (BOS) and Change of Character (CHoCH) for trend analysis.', tags: ['Custom', 'Trend', 'Pattern'], categorySlug: 'custom' },
    { slug: 'liquidity-levels', name: 'Liquidity Levels & Sweeps', description: 'Identifies and marks key liquidity levels (e.g., equal highs/lows) and shows where liquidity has been "swept".', tags: ['Custom', 'Support/Resistance'], categorySlug: 'custom' },
    { slug: 'wolfpack-id', name: 'Wolfpack ID', description: 'A momentum-based indicator that identifies trend direction and potential reversal points with a simple visual interface.', tags: ['Custom', 'Momentum'], categorySlug: 'custom' },
    { slug: 'squeeze-momentum', name: 'Squeeze Momentum Indicator', description: 'Based on the TTM Squeeze, it identifies periods of low volatility (the "squeeze") that often precede a big move.', tags: ['Custom', 'Volatility', 'Momentum'], categorySlug: 'custom' },
    { slug: 'vu-manchu-cipher', name: 'VuManChu Cipher B', description: 'A comprehensive script providing multiple momentum readings, stochastic RSI, and VWAP signals in one place.', tags: ['Custom', 'Momentum', 'Volume'], categorySlug: 'custom' },
    { slug: 'nadaraya-watson', name: 'Nadaraya-Watson Envelope', description: 'A sophisticated smoothing technique that can act as a responsive, moving support and resistance.', tags: ['Custom', 'Trend', 'Support/Resistance'], categorySlug: 'custom' },
    { slug: 'divergence-for-many', name: 'Divergence for many indicators', description: 'A powerful script that can detect and display divergences on RSI, MACD, Stochastics, and more.', tags: ['Custom', 'Momentum', 'Pattern'], categorySlug: 'custom' },
    { slug: 'session-boxes', name: 'Trading Session Boxes', description: 'Automatically draws boxes highlighting the price range for different trading sessions (e.g., London, New York, Tokyo).', tags: ['Custom', 'Pattern'], categorySlug: 'custom' },
];

export const TRENDING_INDICATORS = [
    { name: 'SMC Concept', data: [5, 6, 8, 10, 9, 12, 15] },
    { name: 'Supertrend', data: [10, 11, 9, 12, 11, 13, 12] },
    { name: 'RSI Divergence', data: [3, 4, 5, 4, 6, 8, 7] },
    { name: 'Volume Profile', data: [8, 9, 7, 8, 9, 10, 9] },
    { name: 'Fair Value Gap (FVG)', data: [2, 3, 5, 6, 5, 7, 9] },
];

export const MOST_USED_INDICATORS = [
    { name: 'RSI', data: [20, 22, 21, 23, 24, 23, 25] },
    { name: 'MACD', data: [18, 19, 20, 19, 21, 20, 22] },
    { name: 'Moving Average', data: [15, 16, 17, 18, 17, 19, 18] },
    { name: 'Bollinger Bands', data: [12, 13, 14, 13, 15, 14, 16] },
    { name: 'VWAP', data: [10, 11, 12, 13, 12, 14, 13] },
];

const TRADINGVIEW_AFFILIATE_LINK = 'https://www.tradingview.com/?aff_id=158802';

// --- STATIC BLOG CONTENT ---
export const blogPosts: { [key: string]: BlogPost } = {
    'gann-square-of-9-calculator': {
        title: "Mastering the Gann Square of 9: A Trader's Ultimate Guide",
        metaDescription: "Unlock the secrets of the Gann Square of 9. Learn to calculate and identify crucial support and resistance levels for any market with our in-depth guide.",
        introduction: "The Gann Square of 9 is a legendary tool for identifying hidden market symmetry. Many traders search for a practical **Square of 9 calculator for intraday** charts, and for good reason: its principles work across all timeframes. This guide demystifies the spiral square, showing you how to calculate and apply key price levels to gain a significant analytical edge in any market.",
        sections: [
            { 
                heading: "<h2>What is the Gann Square of 9?</h2>", 
                content: "At its core, the Square of 9 is a spiral of numbers starting with a base number in the center, spiraling outwards. Gann discovered that numbers aligning on the square's **cardinal crosses** (vertical/horizontal lines) and **ordinal crosses** (diagonal lines) represent significant support and resistance levels. It operates on the principle of price vibration, suggesting prices move between these key angular and numerical relationships.",
                visual: { type: 'SQUARE_OF_9', caption: "A visual representation of the Gann Square of 9, with cardinal (blue) and ordinal (green) crosses highlighted.", data: { center: 150, size: 7 } },
            },
            { 
                heading: "<h2>How to Use the Square of 9 for Trading</h2>", 
                content: "To use the Square of 9, a trader selects a significant market pivot (a major high or low) as the starting number. The calculator then generates the spiral. The key levels on the cardinal and ordinal crosses become potential targets for price pullbacks (support) or rallies (resistance). A 90-degree turn on the square represents a key price movement, as does a 180-degree turn, and so on. This represents a 'squaring' of price."
            },
            {
                heading: "<h3>Identifying Cardinal and Ordinal Levels</h3>",
                content: "The most critical levels are found on the cardinal (0, 90, 180, 270 degrees) and ordinal (45, 135, 225, 315 degrees) crosses. When the market approaches these pre-calculated price points from a major high or low, traders should watch for potential reversals or pauses in the trend. These levels act as a natural 'vibration' map for price.",
                visual: { type: 'SQUARE_OF_9', caption: "Starting from a pivot of 1200, the numbers on the crosses are potential future S/R levels.", data: { center: 1200, size: 5 } }
            },
            {
                heading: "<h3>Using the Calculator for Intraday Trading</h3>",
                content: "The Square of 9 is highly effective for day trading. Instead of using a major daily or weekly pivot, an intraday trader can use the opening price, the previous day's high/low, or a significant high/low from the current session as the center number. The resulting cardinal and ordinal levels often act as precise targets and pivot points throughout the trading day."
            },
            {
                heading: "<h3>Frequently Asked Questions</h3>",
                content: "<strong>Is the Square of 9 effective for intraday trading?</strong><br/>Yes. The principles of market vibration are fractal, meaning they apply across all timeframes. For intraday use, start with a significant high or low from the current or previous day. The resulting levels can act as powerful intraday pivot points.<br/><br/><strong>What do the different colors mean?</strong><br/>The gold cell is your center/pivot price. The blue cells (Cardinal Cross) represent the most powerful support/resistance levels. The lighter blue/green cells (Ordinal Cross) are secondary, but still very important, levels."
            }
        ],
        conclusion: "The Gann Square of 9 is more than just a novelty; it's a powerful tool for understanding the hidden geometric structure of the market. By mastering its principles, traders can gain a deeper insight into price action and forecast potential turning points with greater confidence. Integrate it with other forms of analysis to confirm signals and enhance your trading strategy.",
        externalLinks: [
            { title: "Gann Square of 9 Explained - Investopedia", url: "https://www.investopedia.com/terms/g/gann-square-of-9.asp" },
            { title: "W. D. Gann - Wikipedia", url: "https://en.wikipedia.org/wiki/W._D._Gann" }
        ],
    },
    'gann-fan-tool': {
        title: "The Gann Fan: Drawing the Angles of Market Trends",
        metaDescription: "Learn to use the Gann Fan tool to identify dynamic support and resistance levels. Our guide covers the key angles like the 1x1 line and practical applications.",
        introduction: `The Gann Fan is a cornerstone of technical analysis, providing a roadmap for future price movements. If you've ever wanted to learn <strong>how to use the Gann Fan in <a href="${TRADINGVIEW_AFFILIATE_LINK}" target="_blank" rel="nofollow sponsored">TradingView</a></strong> or other charting platforms, you're in the right place. This guide explains the core principles behind Gann Angles and provides a practical walkthrough on drawing and interpreting them to dramatically improve your trend-trading.`,
        sections: [
             {
                heading: "<h2>The Cornerstone: What is the 1x1 Gann Angle?</h2>",
                content: "The 1x1 angle is paramount because it represents a perfect 45° line, signifying a market where one unit of price equals one unit of time. Gann called this 'perfect balance'. A price trend that consistently respects the 1x1 line is considered stable and strong. A break below it in an uptrend is a major warning sign for the trend's health.",
                visual: { type: 'GANN_ANGLE_1X1', caption: "The 1x1 angle represents a perfect 45° line, indicating a balance between price and time.", data: {} }
            },
            { 
                heading: "<h2>How to Draw a Gann Fan in TradingView</h2>", 
                content: "To draw a Gann Fan, you first identify a significant pivot high or pivot low on your chart. In TradingView, select the 'Gann Fan' tool from the drawing panel. Click once on your chosen pivot point (e.g., a major bottom) and drag your cursor to another significant point (e.g., a subsequent top) to set the scale, then project forward. The angles will automatically appear. In an uptrend, the angles provide moving support. In a downtrend started from a high, they provide moving resistance.",
                visual: { type: 'GANN_FAN', caption: "A Gann Fan from a low pivot, showing various angles acting as dynamic support.", data: { prices: [110, 112, 111, 115, 113, 118, 116, 120, 119, 122, 120, 125, 123, 128] } },
            },
            { 
                heading: "<h3>Common Mistakes When Drawing Gann Fans</h3>", 
                content: "A frequent error is incorrect scaling. The Gann Fan must be scaled correctly so the 1x1 line truly represents a 45-degree angle. Ensure your chart's price-to-time ratio is properly configured. Another mistake is choosing insignificant pivot points. Always start your Gann Fan from a major, confirmed top or bottom for the most reliable signals."
            },
            {
                heading: "<h3>Frequently Asked Questions</h3>",
                content: "<strong>What is the 1x1 Gann angle?</strong><br/>It represents a perfect 45-degree angle, which Gann considered the ideal balance between price and time. A market trending along the 1x1 angle is in a strong, sustainable trend. A break of this angle is a significant signal of a potential trend change.<br/><br/><strong>What do the other angles (2x1, 1x2, etc.) mean?</strong><br/>They represent the velocity of the trend. A 2x1 angle is twice as fast as the 1x1, indicating a very aggressive trend. A 1x2 angle is half the speed of the 1x1, indicating a slower, weaker trend."
            }
        ],
        conclusion: "The Gann Fan is an indispensable tool for any serious technical trader. It moves beyond simple horizontal support and resistance, offering a dynamic view of the market's structure. By learning to draw and interpret these angles, you can better anticipate trend changes and make more informed trading decisions.",
        externalLinks: [
            { title: "Using Gann Angles - TradingView", url: "https://www.tradingview.com/support/solutions/43000502127-gann-angles/" },
            { title: "Gann Theory - Investopedia", url: "https://www.investopedia.com/terms/g/gann-theory.asp" }
        ],
    },
    'gann-wheel-square-of-144': {
      title: 'Gann Wheel: The Master Chart of Time and Price',
      metaDescription: 'Explore the Gann Wheel (Square of 144), the master calculator for identifying cyclical patterns and key dates in financial markets.',
      introduction: 'The Gann Wheel is one of Gann\'s most profound creations, mapping price and time onto a 360-degree circle. For traders looking to build a **Gann Wheel trading strategy**, this tool is essential. It reveals harmonic relationships and potential turning points that are invisible on standard charts, offering a unique predictive roadmap.',
      sections: [
        { 
            heading: '<h2>How the Gann Wheel Works</h2>', 
            content: 'The Gann Wheel, or Square of 144, is a spiral calculator that aligns numbers to degrees on a circle. By placing a key pivot price or date at the center, traders can see how future prices and dates align with key angles (90, 180, 270, 360 degrees), which mark important potential turning points where price and time are in harmony.',
            visual: { type: 'GANN_WHEEL', caption: 'A Gann Wheel starting from a central price, showing concentric rings of numbers.', data: { center: 100 } }
        },
        {
            heading: '<h2>Developing a Gann Wheel Trading Strategy</h2>',
            content: 'A simple strategy involves identifying a major low price. Enter this price as the center of the wheel. The numbers that fall on the cardinal (90, 180, 270, 360 degrees) and ordinal (45, 135, 225, 315 degrees) crosses are your potential future resistance levels. The same can be done from a major high to find support.',
            visual: { type: 'GANN_WHEEL', caption: 'Opposing and squared numbers on the wheel often have a harmonic relationship.', data: { center: 500 } }
        },
        {
            heading: "<h3>Frequently Asked Questions</h3>",
            content: "<strong>How is the Gann Wheel different from the Square of 9?</strong><br/>The Square of 9 is a square spiral focused on price 'squaring out' at 90-degree intervals. The Gann Wheel is a circular calculator that converts prices into degrees, focusing on 360-degree cycles of price and time.<br/><br/><strong>Can it predict dates?</strong><br/>Yes. By converting dates into numbers (e.g., days from a major pivot), the wheel can be used to forecast key time turning points that align with the same geometric angles."
        }
      ],
      conclusion: 'The Gann Wheel is a complex but powerful tool for advanced cycle analysis. It requires study, but offers a unique perspective on how market movements are governed by natural geometric and harmonic laws.',
      externalLinks: [{ title: "W. D. Gann - Wikipedia", url: "https://en.wikipedia.org/wiki/W._D._Gann" }],
    },
    'gann-swing-chart-tool': {
      title: 'Simplifying Trends with the Gann Swing Chart',
      metaDescription: 'Learn to use the Gann Swing Chart to eliminate market noise and clearly identify the primary trend and potential reversals.',
      introduction: 'In a volatile market, it can be hard to see the true trend. This guide explains the definitive **Gann Swing Chart rules** to help you filter out minor price fluctuations, focus on the main trend direction, and identify high-probability reversal points with clarity.',
      sections: [
        {
            heading: '<h2>The Core Rules of Gann Swing Charts</h2>',
            content: 'A swing chart plots a series of up and down moves based on a set number of "reversal bars". For example, using the common 2-bar rule, an uptrend is only confirmed as reversed when there are two consecutive lower highs. This method filters out insignificant daily noise and clearly defines upswings (bullish) and downswings (bearish).',
            visual: { type: 'SWING_CHART', caption: 'A Gann Swing chart showing clear up (green) and down (red) trends by filtering noise.', data: { prices: [50, 55, 52, 58, 56, 62, 60, 65, 63, 68] } }
        },
        {
            heading: '<h2>How to Identify Trend Changes</h2>',
            content: 'A primary trend change occurs when a downswing takes out a previous swing bottom, or an upswing surpasses a previous swing top. These are the most critical signals a swing chart provides, often indicating a major shift in market direction that traders can act upon. Minor trend changes are simply the first confirmation of a new up or down swing.',
            visual: { type: 'SWING_CHART', caption: 'A break of a prior swing low (blue line) signals a potential trend change.', data: { prices: [110, 120, 115, 125, 118, 112, 116, 110, 105] } }
        },
        {
            heading: "<h3>Frequently Asked Questions</h3>",
            content: "<strong>What's the best number of reversal bars to use?</strong><br/>There is no single 'best' number. A lower number (e.g., 1 or 2 bars) will be more sensitive to trend changes but give more false signals. A higher number (e.g., 3 or 4 bars) will be less sensitive, filtering more noise but entering trends later. Start with 2 and adjust based on the market's volatility.<br/><br/><strong>Can this be used for intraday charts?</strong><br/>Absolutely. The rules are the same. On a 5-minute chart, a 'bar' is simply a 5-minute candle."
        }
    ],
      conclusion: 'Mastering the swing chart is a foundational skill for any Gann trader. It provides clarity in chaotic markets and delivers clear, actionable signals for trend entries and exits.',
      externalLinks: [{ title: "Swing Trading - Investopedia", url: "https://www.investopedia.com/terms/s/swingtrading.asp" }],
    },
    'gann-emblem': {
        title: "Decoding the Gann Emblem: The Harmony of Geometry",
        metaDescription: "Explore the Gann Emblem, a powerful symbol representing the harmony between the square (price), circle (time), and triangle (pattern) in financial markets.",
        introduction: "The Gann Emblem is not a calculator, but a philosophical blueprint for the market. For traders seeking to understand the deep **Gann Emblem meaning**, it visually represents Gann's core belief that geometry provides the structure for all market movements. It harmonizes price, time, and pattern into a single, powerful symbol.",
        sections: [
            {
                heading: "<h2>The Meaning Behind the Shapes</h2>",
                content: "The Emblem combines three fundamental geometric shapes, each with a specific market meaning. The **Square** represents price structure, support, and resistance. The **Circle** symbolizes time cycles and natural periodicity. The **Triangle** represents balance, proportion, and trend patterns.",
                visual: { type: 'GANN_EMBLEM', caption: "The Gann Emblem combines the Square (Gold), Circle (Blue), and Triangle (Red).", data: {} }
            },
            {
                heading: "<h2>How to Use it as a Framework for Analysis</h2>",
                content: "Traders use the Emblem as a mental checklist. It reminds them to analyze the market from three perspectives: What is the price structure (the square)? Where are we in the current time cycle (the circle)? What is the prevailing pattern or trend (the triangle)? A complete analysis considers all three to find high-probability trade setups.",
                visual: { type: 'GANN_EMBLEM', caption: "A visual reminder to analyze Price, Time, and Pattern.", data: {} }
            },
            {
                heading: "<h3>Frequently Asked Questions</h3>",
                content: "<strong>Is the Gann Emblem a trading tool?</strong><br/>Not directly like a calculator. It's a conceptual model that reinforces the core tenets of Gann theory: that price, time, and pattern are interconnected. It serves as a reminder to conduct a holistic market analysis.<br/><br/><strong>What is the significance of the shapes being inscribed?</strong><br/>The inscription of the square and triangle within the circle visually represents that price action and patterns are ultimately governed by the cycles of time."
            }
        ],
        conclusion: "The Gann Emblem is a powerful symbol that encapsulates the core tenets of Gann theory. By understanding its meaning, traders can adopt a more holistic and robust approach to market analysis.",
        externalLinks: [{ title: "Geometric Principles in Trading - Wikipedia", url: "https://en.wikipedia.org/wiki/Technical_analysis" }]
    },
    'gann-angle-calculator': {
        title: "Gann Angle Calculator: Quantifying Trend Velocity",
        metaDescription: "Learn how the Gann Angle Calculator helps you determine the strength and velocity of market trends by calculating the rate of price change over time.",
        introduction: "A trend is defined by its direction and velocity. This article serves as a practical guide with **Gann angles explained** in simple terms. Using our calculator, you can precisely measure a trend's strength, helping you differentiate between sustainable movements and speculative blow-offs.",
        sections: [
            {
                heading: "<h2>The 1x1 Angle: Perfect Balance Explained</h2>",
                content: "The cornerstone of Gann's work is the 1x1 Angle, representing a 45-degree line where one unit of price equals one unit of time. It's the ideal, balanced state for a sustainable trend. Our calculator helps you find the rate of change (e.g., points per day) required for a market to maintain this perfect balance.",
                visual: { type: 'GANN_ANGLE_1X1', caption: "The 1x1 angle (45°) represents a perfect balance of price and time.", data: {} }
            },
            {
                heading: "<h2>Interpreting Steeper vs. Flatter Angles</h2>",
                content: "Angles steeper than 1x1, like 2x1 (2 price units per time unit) or the aggressive 4x1, indicate strong, fast-moving trends that are often unsustainable. Angles flatter than 1x1, like 1x2 or 1x4, represent weaker, slower, but potentially more durable trends. This tool calculates the exact rate for each of these key angles based on your inputs.",
                visual: { type: 'GANN_FAN', caption: "Visualizing different trend velocities with Gann Angles.", data: { prices: [100, 105, 103, 110, 108, 115, 113, 122] } }
            },
            {
                heading: "<h3>Frequently Asked Questions</h3>",
                content: "<strong>What happens when the price breaks the 1x1 angle?</strong><br/>In an uptrend, a break below the 1x1 angle is a sign of weakness and a potential trend change. Conversely, in a downtrend, a break above the 1x1 angle signals that the downtrend is losing momentum.<br/><br/><strong>How do I find the correct 'Price Range' and 'Time Range'?</strong><br/>Measure the distance from a significant bottom to a significant top. The price difference is your price range, and the number of bars (days, hours, etc.) between them is your time range."
            }
        ],
        conclusion: "By quantifying the speed of the market, the Gann Angle Calculator provides a deeper understanding of trend dynamics, allowing traders to align their strategies with the market's true momentum.",
        externalLinks: [{ title: "Trend Analysis - Investopedia", url: "https://www.investopedia.com/terms/t/trendanalysis.asp" }]
    },
    'gann-date-time-predictor': {
        title: "Gann Date & Time Predictor: Forecasting Market Turns",
        metaDescription: "Discover how to use Gann's time cycle theories to forecast potential market turning points with the Gann Date & Time Predictor.",
        introduction: "W.D. Gann famously stated, 'Time is the most important factor.' This article explores how to perform **Gann time cycle analysis** to forecast potential market turning points. Our tool is built on that principle, allowing you to project key cyclical dates into the future based on a significant past market event.",
        sections: [
            {
                heading: "<h2>How to Perform Time Cycle Analysis</h2>",
                content: "The predictor works by taking a major pivot date (a significant high or low) as a starting point. It then adds key Gann time cycles—such as 90 days (a seasonal cycle) or 360 days (an annual cycle)—to this date. The resulting dates are future periods where a change in trend is highly probable.",
                visual: { type: 'GANN_DATE_PREDICTOR', caption: "Projecting key cycle dates from a starting pivot date.", data: { startDate: new Date().toISOString().split('T')[0] } }
            },
            {
                heading: "<h2>The Importance of Anniversary Dates</h2>",
                content: "One of Gann's simplest yet most effective techniques was watching anniversary dates. A market will often experience a significant move, reversal, or acceleration one or more years after a major top or bottom. This tool helps you track these important yearly cycles with precision.",
                 visual: { type: 'GANN_DATE_PREDICTOR', caption: "Projecting 360-day 'anniversary' dates.", data: { startDate: '2023-01-15' } }
            },
            {
                heading: "<h3>Frequently Asked Questions</h3>",
                content: "<strong>Are these dates guaranteed turning points?</strong><br/>No. They are high-probability zones where traders should be on alert for a potential change in trend. These dates should be used in conjunction with price analysis for confirmation.<br/><br/><strong>What is a 'pivot date'?</strong><br/>It's a date on which a significant market event occurred, such as an all-time high, a major crash low, or the start of a new bull market."
            }
        ],
        conclusion: "By incorporating time analysis into your trading, the Gann Date & Time Predictor provides a fourth dimension to your charts, helping you anticipate when major market moves are likely to occur.",
        externalLinks: [{ title: "Market Cycles - Wikipedia", url: "https://en.wikipedia.org/wiki/Market_cycle" }]
    },
    'gann-grid-overlay': {
        title: "Gann Grid Overlay: Mapping Support and Resistance",
        metaDescription: "Learn to use the Gann Grid Overlay to identify static support and resistance levels by dividing a price range into key geometric proportions.",
        introduction: "The Gann Grid is a straightforward yet powerful tool for identifying high-probability support and resistance zones. This guide shows you **how to draw a Gann Grid** by dividing a significant price range into key Gann proportions, creating a static map of levels where the market is likely to react.",
        sections: [
            {
                heading: "<h2>How to Draw a Gann Grid</h2>",
                content: "To create a Gann Grid, you first identify a major price range by selecting a significant high and low. This could be the range of the previous year, quarter, or a major bull/bear swing. The tool then automatically divides this range into key Gann levels, primarily eighths (12.5%, 25%, 37.5%, etc.) and thirds. These lines often act as invisible barriers to price.",
                visual: { type: 'GANN_GRID', caption: "A Gann Grid dividing the range from 100 to 150 into key levels.", data: { low: 100, high: 150 } }
            },
            {
                heading: "<h2>The Critical Importance of the 50% Level</h2>",
                content: "Across all of Gann's work, the 50% retracement or midpoint is the single most important level. A market that pulls back 50% of its prior move and finds support is often preparing for a powerful continuation of its trend. A failure to hold the 50% level is a major sign of weakness that can signal a full trend reversal.",
                visual: { type: 'GANN_GRID', caption: "The 50% level (gold line) is the most critical support/resistance point in any range.", data: { low: 200, high: 250 } }
            },
            {
                heading: "<h3>Frequently Asked Questions</h3>",
                content: "<strong>Is the Gann Grid the same as Fibonacci retracements?</strong><br/>They are similar concepts but based on different principles. Fibonacci uses the golden ratio (e.g., 38.2%, 61.8%), while Gann focuses on geometric divisions of a square (e.g., 25%, 50%, 75%). Many traders use both to find clusters of support or resistance.<br/><br/><strong>Can this be used on any timeframe?</strong><br/>Yes. You can draw a Gann Grid on a long-term weekly chart using the all-time high and low, or on an intraday chart using the high and low of the day."
            }
        ],
        conclusion: "The Gann Grid Overlay provides a simple, objective way to identify crucial price levels. Use it to set price targets, identify entry points, and manage risk with greater precision.",
        externalLinks: [{ title: "Support and Resistance - Investopedia", url: "https://www.investopedia.com/terms/s/supportandresistance.asp" }]
    }
};