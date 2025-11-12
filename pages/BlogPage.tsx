import React, { useState, useId, useLayoutEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GANN_TOOLS, blogPosts } from '../constants';
import { BlogPost } from '../types';
import { Sidebar } from '../components/Sidebar';
import { InlineVisual } from '../components/visuals/InlineVisual';
import SeoHead from '../components/SeoHead';

// This component provides UI controls for adjusting typography
const TypographyControls = ({ 
    fontSize, setFontSize, 
    lineHeight, setLineHeight 
}: {
    fontSize: number;
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
    lineHeight: number;
    setLineHeight: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const ControlButton = ({ onClick, 'aria-label': ariaLabel, children, disabled }: { onClick: () => void; 'aria-label': string; children: React.ReactNode; disabled?: boolean }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className="p-1.5 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );

    return (
        <div className="flex flex-wrap items-center justify-start sm:justify-end gap-x-6 gap-y-2 p-3 mb-6 bg-slate-50 border rounded-lg">
            {/* Font Size Controls */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 select-none">Size</span>
                <ControlButton onClick={() => setFontSize(s => s - 1)} aria-label="Decrease font size" disabled={fontSize <= 14}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                </ControlButton>
                <span className="text-sm text-gray-800 w-10 text-center select-none" aria-live="polite">{fontSize}px</span>
                <ControlButton onClick={() => setFontSize(s => s + 1)} aria-label="Increase font size" disabled={fontSize >= 22}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </ControlButton>
            </div>

            {/* Line Spacing Controls */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 select-none">Spacing</span>
                 <ControlButton onClick={() => setLineHeight(l => parseFloat(Math.max(1.4, l - 0.1).toFixed(2)))} aria-label="Decrease line spacing" disabled={lineHeight <= 1.4}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                 </ControlButton>
                 <span className="text-sm text-gray-800 w-10 text-center select-none" aria-live="polite">{lineHeight.toFixed(2)}</span>
                <ControlButton onClick={() => setLineHeight(l => parseFloat(Math.min(2.2, l + 0.1).toFixed(2)))} aria-label="Increase line spacing" disabled={lineHeight >= 2.2}>
                     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </ControlButton>
            </div>
        </div>
    );
};


export default function BlogPage() {
    const { toolSlug } = useParams<{ toolSlug: string }>();
    const [baseFontSize, setBaseFontSize] = useState(18);
    const [lineHeight, setLineHeight] = useState(1.75);

    const tool = GANN_TOOLS.find(t => t.slug === toolSlug);
    const blogPost: BlogPost | null = toolSlug ? (blogPosts as { [key: string]: BlogPost })[toolSlug] : null;

    const uniqueId = useId();
    const articleClassName = `blog-article-${uniqueId.replace(/:/g, "")}`;
    
    useLayoutEffect(() => {
        const styleId = `typography-overrides-${uniqueId}`;
        let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        styleElement.innerHTML = `
            .${articleClassName}.prose p,
            .${articleClassName}.prose ul,
            .${articleClassName}.prose ol,
            .${articleClassName}.prose li,
            .${articleClassName}.prose blockquote {
                line-height: ${lineHeight};
            }
        `;
    }, [lineHeight, articleClassName, uniqueId]);


    if (!tool || !blogPost) {
        return <Navigate to="/404" replace />;
    }

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blogPost.title,
        "description": blogPost.metaDescription,
        "author": {
            "@type": "Organization",
            "name": "GannToolPro"
        },
        "publisher": {
            "@type": "Organization",
            "name": "GannToolPro",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.ganntoolpro.com/logo.png"
            }
        },
        "datePublished": "2023-10-27T09:00:00Z",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.ganntoolpro.com/#/blog/${tool.slug}`
        }
    };

    return (
        <>
            <SeoHead 
                title={blogPost.title}
                description={blogPost.metaDescription}
                schema={blogSchema}
            />
            <div className="bg-slate-50 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        
                        {/* Main Content */}
                        <main className="lg:col-span-8">
                             <div className="p-6 sm:p-8 bg-white rounded-lg shadow-md">
                                <TypographyControls 
                                    fontSize={baseFontSize}
                                    setFontSize={setBaseFontSize}
                                    lineHeight={lineHeight}
                                    setLineHeight={setLineHeight}
                                />
                                <article 
                                    className={`prose max-w-none prose-blue ${articleClassName}`}
                                    style={{ fontSize: `${baseFontSize}px` }}
                                >
                                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-dark">{blogPost.title}</h1>
                                    <p className="text-lg text-gray-600 ">{blogPost.introduction}</p>
                                    
                                    {blogPost.sections.map((section, index) => (
                                        <React.Fragment key={index}>
                                            <h2 dangerouslySetInnerHTML={{ __html: section.heading }}></h2>
                                            <p dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}></p>
                                            {section.visual && <InlineVisual visual={section.visual} />}
                                        </React.Fragment>
                                    ))}
                                    
                                    <h2>Conclusion</h2>
                                    <p>{blogPost.conclusion}</p>

                                    <div className="mt-12 p-6 bg-slate-50 rounded-lg border">
                                        <h3 className="font-semibold text-gray-800">Sources & Further Reading</h3>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            {blogPost.externalLinks.map((link, index) => (
                                                <li key={index}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a></li>
                                            ))}
                                        </ul>
                                        <p className="text-xs text-gray-400 mt-4 italic">
                                            Chart examples created using GannToolPro visuals, inspired by TradingView charting logic.
                                        </p>
                                    </div>
                                </article>
                                <div className="mt-12 text-center p-8 bg-gradient-to-r from-brand-blue to-blue-800 rounded-lg">
                                    <h3 className="text-2xl font-bold text-white">Ready to Put Theory into Practice?</h3>
                                    <Link to={`/tools/${tool.slug}`} className="mt-4 inline-flex items-center bg-brand-gold text-brand-dark font-bold px-8 py-3 rounded-md hover:opacity-90 transition-transform hover:scale-105 shadow-lg">
                                        Try the {tool.name} Now
                                        <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </div>
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24">
                               {tool && <Sidebar currentToolSlug={tool.slug} />}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}