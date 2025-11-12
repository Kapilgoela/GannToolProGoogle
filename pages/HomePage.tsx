import React from 'react';
import { Link } from 'react-router-dom';
import { GANN_TOOLS, ALL_TRADINGVIEW_INDICATORS } from '../constants';
import { GannTool, TradingViewIndicator } from '../types';
import StaticChartThumbnail from '../components/visuals/StaticChartThumbnail';
import CtaBanner from '../components/shared/CtaBanner';
import SeoHead from '../components/SeoHead';

const Hero = () => (
    <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                Master the Markets with <span className="text-brand-blue">Gann Theory</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                Unlock the predictive power of W.D. Gann's legendary techniques. Our professional-grade tools simplify complex calculations, helping you master market cycles, price levels, and time-based turning points.
            </p>
            <div className="mt-8 flex justify-center">
                <Link to="/compare-tools" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-blue-800 transition-colors">
                    Explore Tools
                </Link>
            </div>
        </div>
    </div>
);

const ToolCard = ({ tool }: { tool: GannTool }) => (
    <Link to={`/tools/${tool.slug}`} className="group block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <tool.icon className="h-7 w-7 text-brand-blue" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-dark group-hover:text-brand-blue transition-colors">{tool.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
            </div>
        </div>
    </Link>
);


const AboutSection = () => (
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-brand-dark">What is Gann Theory?</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                    Gann Theory, developed by W.D. Gann, is a comprehensive trading method based on the idea that financial markets are geometric and cyclical in nature. Gann believed that price and time are intrinsically linked and that market movements can be predicted by studying historical patterns and applying geometric principles.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-blue">Time & Price Harmony</h3>
                    <p className="mt-2 text-gray-600">Gann's core concept: when time and price "square out," a change in trend is imminent. This balance is the key to forecasting major tops and bottoms.</p>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-blue">Geometric Angles</h3>
                    <p className="mt-2 text-gray-600">Gann Angles, or "Gann Fans," are trendlines drawn from pivots at specific angles that act as dynamic support and resistance levels.</p>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-blue">Cardinal Squares</h3>
                    <p className="mt-2 text-gray-600">Tools like the Square of 9 reveal hidden price relationships and vibration levels, providing high-probability targets for entries and exits.</p>
                </div>
            </div>
        </div>
    </section>
);


const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <dt>
                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-start text-left text-gray-500">
                    <span className="font-medium text-gray-900">{question}</span>
                    <span className="ml-6 h-7 flex items-center">
                        <svg className={`h-6 w-6 transform ${isOpen ? '-rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
            </dt>
            {isOpen && (
                <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-600">{answer}</p>
                </dd>
            )}
        </div>
    );
};

const FaqSection = () => (
    <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-extrabold text-center text-brand-dark">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                <FaqItem
                    question="Is Gann Theory still relevant today?"
                    answer="Absolutely. While markets have evolved, the underlying principles of human psychology and market cycles that Gann studied remain constant. Many algorithmic and high-frequency trading models are based on similar principles of pattern recognition and cyclicality. Gann's tools provide a robust framework for understanding these timeless market dynamics."
                />
                <FaqItem
                    question="Are these tools suitable for beginners?"
                    answer="Yes, our tools are designed to be user-friendly for all levels. While Gann Theory can be complex, our calculators and visual aids simplify the process. We recommend starting with the Square of 9 and Gann Angles, and reading our pre-rendered blog posts to build a solid foundation."
                />
                 <FaqItem
                    question="What markets can I apply Gann tools to?"
                    answer="Gann's methods are universal and can be applied to any liquid market, including stocks, forex, commodities, and cryptocurrencies. The principles of time, price, and pattern are market-agnostic."
                />
            </dl>
        </div>
    </section>
);

const BlogPreviewCard = ({ tool }: { tool: GannTool }) => (
    <div className="group flex flex-col overflow-hidden rounded-lg shadow-lg">
        <Link to={`/blog/${tool.slug}`} className="flex-shrink-0">
            <div className="h-48 w-full bg-slate-200">
               <StaticChartThumbnail toolSlug={tool.slug} />
           </div>
        </Link>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
                <p className="text-sm font-medium text-brand-blue">
                    <Link to={`/blog/${tool.slug}`} className="hover:underline">
                        Deep Dive
                    </Link>
                </p>
                <Link to={`/blog/${tool.slug}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-brand-blue transition-colors">{`Mastering the ${tool.name}`}</p>
                    <p className="mt-3 text-base text-gray-500">{`An in-depth guide on how to leverage the ${tool.name} for trend analysis, price forecasting, and more.`}</p>
                </Link>
            </div>
             <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <span className="sr-only">{tool.name}</span>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <tool.icon className="h-6 w-6 text-brand-blue" />
                    </div>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                        GannToolPro Staff
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={new Date().toISOString()}>Just Published</time>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const BlogPreviewSection = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">From Our Blog</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Dive deeper into Gann theory with our expert guides and tutorials.
                </p>
            </div>
            <div className="mt-12 mx-auto grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
                {GANN_TOOLS.slice(0, 3).map(tool => (
                    <BlogPreviewCard key={tool.slug} tool={tool} />
                ))}
            </div>
        </div>
    </section>
);

const IndicatorPreviewCard = ({ indicator }: { indicator: TradingViewIndicator }) => (
    <div className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <Link to={`/tradingview/${indicator.categorySlug}`} className="flex-shrink-0">
            <div className="h-48 w-full bg-slate-200">
               <StaticChartThumbnail toolSlug={indicator.slug} />
           </div>
        </Link>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
                <Link to={`/tradingview/${indicator.categorySlug}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-brand-blue transition-colors">{indicator.name}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-2">{indicator.description}</p>
                </Link>
            </div>
             <div className="mt-6 flex items-center">
                 <Link to={`/tradingview/${indicator.categorySlug}`} className="text-sm font-medium text-brand-blue hover:underline">
                    Explore in {indicator.tags[0]} Indicators &rarr;
                </Link>
            </div>
        </div>
    </div>
);

const FeaturedIndicatorsSection = () => {
    const featuredSlugs = ['rsi', 'macd', 'supertrend', 'volume-profile', 'smc-concept', 'bollinger-bands'];
    const featuredIndicators = ALL_TRADINGVIEW_INDICATORS.filter(ind => featuredSlugs.includes(ind.slug));

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Featured TradingView Indicators</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Explore some of the most popular and effective indicators from our extensive library.
                    </p>
                </div>
                <div className="mt-12 mx-auto grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
                    {featuredIndicators.map(indicator => (
                        <IndicatorPreviewCard key={indicator.slug} indicator={indicator} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        to="/tradingview"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-blue-800 transition-colors"
                    >
                        View All 100+ Indicators
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default function HomePage() {
     const homePageSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "GannToolPro",
        "url": "https://www.ganntoolpro.com/",
        "description": "A modern, SEO-optimized website focused on 8 popular Gann-based trading tools, featuring interactive calculators, AI-generated blog content, and in-depth analysis to help traders master Gann theory.",
        "publisher": {
            "@type": "Organization",
            "name": "GannToolPro",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.ganntoolpro.com/logo.png" 
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.ganntoolpro.com/#/compare-tools?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };
    return (
        <>
            <SeoHead
                title="GannToolPro - Master Gann Trading Tools & Theory"
                description="Unlock the predictive power of W.D. Gann's legendary techniques. Our suite of professional-grade tools simplifies complex calculations, helping you master market cycles, price levels, and time-based turning points."
                schema={homePageSchema}
            />
            <Hero />
            <div className="py-16 bg-brand-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-brand-dark">Explore Our Gann Tools</h2>
                        <p className="mt-4 text-lg text-gray-600">From level calculators to time predictors, find the right tool for your analysis.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {GANN_TOOLS.map(tool => (
                            <ToolCard key={tool.slug} tool={tool} />
                        ))}
                    </div>
                </div>
            </div>
            <FeaturedIndicatorsSection />
            <AboutSection />
            <BlogPreviewSection />
            <CtaBanner />
            <FaqSection />
        </>
    );
}