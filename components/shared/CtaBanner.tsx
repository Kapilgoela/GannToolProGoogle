import React from 'react';

const TRADINGVIEW_AFFILIATE_LINK = 'https://www.tradingview.com/?aff_id=158802';

interface CtaBannerProps {
    title?: string;
    description?: string;
    buttonText?: string;
}

const CtaBanner: React.FC<CtaBannerProps> = ({
    title = "Power Up Your Analysis with TradingView",
    description = "Access world-class charting tools, a vibrant trading community, and real-time data. The ultimate platform for traders and investors.",
    buttonText = "Try TradingView Free →"
}) => {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-r from-brand-blue to-blue-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                {title}
                            </h2>
                            <p className="mt-4 text-lg text-blue-200 max-w-2xl">
                                {description}
                            </p>
                        </div>
                        <div className="mt-6 md:mt-0 flex-shrink-0">
                            <a
                                href={TRADINGVIEW_AFFILIATE_LINK}
                                target="_blank"
                                rel="nofollow sponsored"
                                className="inline-block bg-brand-gold text-brand-dark font-bold px-8 py-4 rounded-md hover:opacity-90 transition-transform hover:scale-105 shadow-lg text-lg"
                            >
                                {buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaBanner;