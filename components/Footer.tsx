
import React from 'react';
import { Link } from 'react-router-dom';
import { GANN_TOOLS } from '../constants';

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
        {children}
    </a>
);

export default function Footer() {
    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About & Social */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-brand-gold">GannToolPro</h3>
                        <p className="mt-4 text-gray-400 text-sm">
                            Your premier resource for professional Gann-based trading tools and analysis. Master the markets with the wisdom of W.D. Gann.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg></SocialIcon>
                            <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></SocialIcon>
                            <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.019c0 3.442 1.772 6.453 4.48 8.163.078.046.12.13.12.223v2.32c0 .19.223.313.39.223.23-.122.42-.26.568-.41a12.037 12.037 0 012.292-2.476c.43-.37.953-.557 1.488-.557h2.642c3.313 0 6-2.687 6-6.019S15.313 6.02 12 6.02a5.99 5.99 0 00-4.242 1.757 6.002 6.002 0 00-1.758 4.242zm2.633-3.328a8.002 8.002 0 017.348 9.328 8.002 8.002 0 01-9.328 7.348 8.002 8.002 0 01-7.348-9.328 8.002 8.002 0 019.328-7.348z" clipRule="evenodd"></path></svg></SocialIcon>
                        </div>
                    </div>

                    {/* Sitemap */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold tracking-wider text-brand-gold">Sitemap</h3>
                        <ul className="mt-4 space-y-2">
                            {GANN_TOOLS.slice(0, 5).map(tool => (
                                <li key={tool.slug}>
                                    <Link to={`/tools/${tool.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">{tool.name}</Link>
                                </li>
                            ))}
                             <li>
                                <Link to="/compare-tools" className="text-sm text-gray-400 hover:text-white transition-colors">Compare All Tools</Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Legal */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold tracking-wider text-brand-gold">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a></li>
                             <li><a href="#" className="text-sm text-gray-400 hover:text-white">Disclaimer</a></li>
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold tracking-wider text-brand-gold">Contact Us</h3>
                        <form className="mt-4" onSubmit={handleContactSubmit}>
                            <input type="email" placeholder="Your Email" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
                            <textarea placeholder="Your Message" rows={3} className="w-full mt-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold" required></textarea>
                            <button type="submit" className="w-full mt-2 px-4 py-2 bg-brand-blue hover:bg-blue-700 text-white font-semibold rounded-md transition-colors">Send</button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} GannToolPro. All Rights Reserved. For educational purposes only.</p>
                </div>
            </div>
        </footer>
    );
}
