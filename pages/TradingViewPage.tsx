import React from 'react';
import { Link } from 'react-router-dom';
import { TRADINGVIEW_CATEGORIES } from '../constants';
import { TradingViewCategory } from '../types';
import SeoHead from '../components/SeoHead';

const CategoryCard: React.FC<{ category: TradingViewCategory }> = ({ category }) => (
    <Link 
        to={`/tradingview/${category.slug}`}
        className="group block bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <category.icon className="h-9 w-9 text-brand-blue" />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{category.name}</h3>
                <p className="mt-1 text-gray-600">{category.description}</p>
            </div>
        </div>
    </Link>
);


export default function TradingViewHubPage() {
    return (
        <>
            <SeoHead
                title="TradingView Indicator Library | GannToolPro"
                description="Explore our complete library of 100+ TradingView indicators, organized by category. Find the best tools for trend, momentum, volume, and volatility analysis."
            />
            <div className="bg-brand-light py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight sm:text-5xl">
                            TradingView Indicator Library
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                           A comprehensive, curated list of over 100 of the most powerful and popular indicators. Dive into a category to find the perfect tool for your trading strategy.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {TRADINGVIEW_CATEGORIES.map(category => (
                            <CategoryCard key={category.slug} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}