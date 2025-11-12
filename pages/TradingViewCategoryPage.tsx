import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ALL_TRADINGVIEW_INDICATORS, TRADINGVIEW_CATEGORIES, TRENDING_INDICATORS, MOST_USED_INDICATORS } from '../constants';
import { TradingViewIndicator, IndicatorTag } from '../types';
import CtaBanner from '../components/shared/CtaBanner';
import StaticChartThumbnail from '../components/visuals/StaticChartThumbnail';
import SeoHead from '../components/SeoHead';
import Sparkline from '../components/Sparkline';
import Pagination from '../components/Pagination';

const TRADINGVIEW_AFFILIATE_LINK = 'https://www.tradingview.com/?aff_id=158802';

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const colors: { [key in IndicatorTag]: string } = {
        Trend: 'bg-blue-100 text-blue-800',
        Momentum: 'bg-purple-100 text-purple-800',
        Volume: 'bg-green-100 text-green-800',
        Volatility: 'bg-yellow-100 text-yellow-800',
        'Support/Resistance': 'bg-red-100 text-red-800',
        Pattern: 'bg-indigo-100 text-indigo-800',
        Custom: 'bg-pink-100 text-pink-800'
    };
    const colorClass = colors[children as IndicatorTag] || 'bg-gray-100 text-gray-800';
    return <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>{children}</span>;
};

const IndicatorCard: React.FC<{ indicator: TradingViewIndicator }> = ({ indicator }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
        <div className="h-48 w-full bg-slate-200 overflow-hidden">
            <div className="w-full h-full group-hover:scale-105 transition-transform duration-300">
                <StaticChartThumbnail toolSlug={indicator.slug} />
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-brand-dark">{indicator.name}</h3>
            <p className="mt-2 text-sm text-gray-600 flex-grow">{indicator.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {indicator.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
            <a
                href={TRADINGVIEW_AFFILIATE_LINK}
                target="_blank"
                rel="nofollow sponsored"
                className="mt-6 w-full text-center px-4 py-2 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-800 transition-colors"
            >
                View on TradingView &rarr;
            </a>
        </div>
    </div>
);

const TradingViewSidebar: React.FC = () => (
    <aside className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4 border-b pb-3">🔥 Trending Indicators</h4>
            <ul className="space-y-4">
                {TRENDING_INDICATORS.map(item => (
                    <li key={item.name} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <Sparkline data={item.data} color="#4CAF50" />
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4 border-b pb-3">Most Used This Month</h4>
            <ul className="space-y-4">
                {MOST_USED_INDICATORS.map(item => (
                    <li key={item.name} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <Sparkline data={item.data} color="#FFD700" />
                    </li>
                ))}
            </ul>
        </div>
    </aside>
);

const ITEMS_PER_PAGE = 10;

export default function TradingViewCategoryPage() {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const category = useMemo(() => TRADINGVIEW_CATEGORIES.find(c => c.slug === categorySlug), [categorySlug]);

    const filteredIndicators = useMemo(() => {
        if (!category) return [];
        return ALL_TRADINGVIEW_INDICATORS
            .filter(indicator => indicator.categorySlug === category.slug)
            .filter(indicator => indicator.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [category, searchQuery]);
    
    // Reset page to 1 when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Pagination logic
    const totalPages = Math.ceil(filteredIndicators.length / ITEMS_PER_PAGE);
    const paginatedIndicators = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredIndicators.slice(startIndex, endIndex);
    }, [filteredIndicators, currentPage]);


    if (!category) {
        return <Navigate to="/tradingview" replace />;
    }

    return (
        <>
            <SeoHead
                title={`${category.name} | TradingView Library`}
                description={`Explore the best TradingView ${category.name.toLowerCase()} including ${filteredIndicators.slice(0,3).map(i => i.name).join(', ')}, and more.`}
            />
            <div className="bg-brand-light py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left mb-12">
                         <Link to="/tradingview" className="text-sm text-brand-blue hover:underline mb-4 inline-block">&larr; Back to Categories</Link>
                        <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight sm:text-5xl">
                            {category.name}
                        </h1>
                        <p className="mt-4 max-w-3xl text-lg text-gray-600">
                            {category.description}
                        </p>
                    </div>

                    <div className="mb-8">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search in ${category.name}...`}
                            className="block w-full max-w-lg pl-4 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <main className="lg:col-span-9">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {paginatedIndicators.map(indicator => (
                                    <IndicatorCard key={indicator.slug} indicator={indicator} />
                                ))}
                            </div>
                            {filteredIndicators.length === 0 && (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-700">No indicators found.</h3>
                                    <p className="text-gray-500 mt-2">Try adjusting your search query.</p>
                                </div>
                            )}
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-24">
                                <TradingViewSidebar />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            <CtaBanner 
                title={`Try These ${category.name} Live`}
                description={`The best way to learn is by doing. Open a free TradingView account and apply these indicators to a live chart today.`}
                buttonText="Open TradingView Chart →"
            />
        </>
    );
}