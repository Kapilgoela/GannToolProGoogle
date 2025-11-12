
import React from 'react';
import { Link } from 'react-router-dom';
import { GANN_TOOLS } from '../constants';

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);
const XIcon = () => (
    <svg className="h-6 w-6 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function CompareToolsPage() {

    const features = [
        { key: 'calculator', name: 'Calculator' },
        { key: 'charting', name: 'Charting/Visual' },
        { key: 'levels', name: 'Price Levels' },
        { key: 'time', name: 'Time Forecasting' },
        { key: 'trend', name: 'Trend Analysis' },
    ];

    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">Compare Gann Tools</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Find the perfect Gann tool for your trading strategy by comparing their core features at a glance.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                                {features.map(feature => (
                                    <th key={feature.key} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{feature.name}</th>
                                ))}
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {GANN_TOOLS.map((tool) => (
                                <tr key={tool.slug} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <tool.icon className="h-6 w-6 text-brand-blue" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                                                <div className="text-sm text-gray-500 max-w-xs truncate">{tool.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    {features.map(feature => (
                                        <td key={feature.key} className="px-6 py-4 whitespace-nowrap text-center">
                                            {tool.tags.includes(feature.key) ? <CheckIcon /> : <XIcon />}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/tools/${tool.slug}`} className="text-brand-blue hover:text-blue-800">
                                            Use Tool &rarr;
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
