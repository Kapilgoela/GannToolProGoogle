
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GANN_TOOLS } from '../constants';
import SeoHead from '../components/SeoHead';

export default function ToolPage() {
    const { toolSlug } = useParams<{ toolSlug: string }>();
    const tool = GANN_TOOLS.find(t => t.slug === toolSlug);

    if (!tool) {
        return <Navigate to="/" replace />;
    }
    
    const { name, description, component: ToolComponent, icon: Icon } = tool;

    const toolSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": name,
        "applicationCategory": "FinancialApplication",
        "operatingSystem": "Web",
        "description": description,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "218"
        }
    };

    return (
        <>
            <SeoHead 
                title={`${name} | GannToolPro`} 
                description={description} 
                schema={toolSchema}
            />
            <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center">
                            <div className="flex justify-center items-center mb-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Icon className="h-9 w-9 text-brand-blue" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">{name}</h1>
                            <p className="mt-4 text-lg text-gray-600">{description}</p>
                        </div>

                        {/* Interactive Tool Component */}
                        <div className="mt-12">
                            <div className="bg-brand-light p-4 sm:p-8 rounded-xl shadow-inner">
                                <ToolComponent />
                            </div>
                        </div>
                        
                        {/* Learn More Section */}
                        <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-brand-dark">Want to Master This Tool?</h2>
                            <p className="mt-2 text-gray-600">
                                Dive deeper with our comprehensive, AI-generated guide. Learn the theory, practical applications, and advanced strategies for the {name}.
                            </p>
                            <Link 
                                to={`/blog/${tool.slug}`}
                                className="mt-6 inline-block bg-brand-blue text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-800 transition-transform hover:scale-105"
                            >
                                Read the Full Blog Post
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
