import React from 'react';
import { Link } from 'react-router-dom';
import { GANN_TOOLS } from '../constants';
import { GannTool } from '../types';
import StaticChartThumbnail from '../components/visuals/StaticChartThumbnail';

const BlogCard = ({ tool }: { tool: GannTool }) => (
    <article className="flex flex-col items-start justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full">
            <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden">
               <StaticChartThumbnail toolSlug={tool.slug} />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="max-w-xl w-full">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
                 <time dateTime={new Date().toISOString()} className="text-gray-500">
                    Just Published
                 </time>
                <Link to={`/tools/${tool.slug}`} className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-brand-blue hover:bg-blue-100">
                    Related Tool
                </Link>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/blog/${tool.slug}`}>
                        <span className="absolute inset-0" />
                        {`A Trader's Guide to the ${tool.name}`}
                    </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{tool.description}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <tool.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        <Link to={`/blog/${tool.slug}`}>
                            <span className="absolute inset-0" />
                            Read More
                        </Link>
                    </p>
                    <p className="text-gray-600">GannToolPro Analysis</p>
                </div>
            </div>
        </div>
    </article>
);


export default function BlogIndexPage() {
    return (
        <div className="bg-brand-light py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight sm:text-5xl">
                        GannToolPro Blog
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                        In-depth articles, tutorials, and strategies to help you master W.D. Gann's trading techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GANN_TOOLS.map(tool => (
                        <BlogCard key={tool.slug} tool={tool} />
                    ))}
                </div>
            </div>
        </div>
    );
}