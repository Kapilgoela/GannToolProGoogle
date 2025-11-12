import React from 'react';
import { Link } from 'react-router-dom';
import { GANN_TOOLS } from '../constants';

interface SidebarProps {
  currentToolSlug: string;
}

const MarketFeedPlaceholder = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">Live Market Feed</h4>
        <div className="space-y-3 animate-pulse">
            <div className="flex justify-between items-center">
                <span className="h-4 bg-gray-200 rounded w-1/4"></span>
                <span className="h-4 bg-green-200 rounded w-1/4"></span>
            </div>
             <div className="flex justify-between items-center">
                <span className="h-4 bg-gray-200 rounded w-1/4"></span>
                <span className="h-4 bg-red-200 rounded w-1/4"></span>
            </div>
             <div className="flex justify-between items-center">
                <span className="h-4 bg-gray-200 rounded w-1/4"></span>
                <span className="h-4 bg-green-200 rounded w-1/4"></span>
            </div>
             <div className="flex justify-between items-center">
                <span className="h-4 bg-gray-200 rounded w-1/4"></span>
                <span className="h-4 bg-red-200 rounded w-1/4"></span>
            </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">Live feed coming soon</p>
    </div>
)


export const Sidebar: React.FC<SidebarProps> = ({ currentToolSlug }) => {
  const relatedTools = GANN_TOOLS.filter(t => t.slug !== currentToolSlug).slice(0, 4);
  const popularIndicators = ["RSI (Relative Strength Index)", "MACD", "Bollinger Bands", "Moving Averages"];

  return (
    <aside className="space-y-8">
        {/* Related Tools */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Related Tools</h4>
            <ul className="space-y-3">
                {relatedTools.map(tool => (
                    <li key={tool.slug}>
                        <Link to={`/tools/${tool.slug}`} className="flex items-center space-x-3 group">
                           <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                                <tool.icon className="h-5 w-5 text-brand-blue" />
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-brand-blue transition-colors">{tool.name}</span>
                        </Link>
                    </li>
                ))}
                 <li>
                    <Link to="/compare-tools" className="flex items-center space-x-3 group text-sm font-semibold text-brand-blue hover:underline pt-2">
                        Compare All Tools &rarr;
                    </Link>
                </li>
            </ul>
        </div>

        {/* Popular Indicators */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Popular Indicators</h4>
             <ul className="space-y-2 text-sm text-gray-600">
                {popularIndicators.map(indicator => (
                    <li key={indicator} className="pl-2 border-l-2 border-gray-200 hover:border-brand-blue transition-colors">{indicator}</li>
                ))}
            </ul>
        </div>
        
        {/* Market Feed */}
        <MarketFeedPlaceholder />

    </aside>
  );
};