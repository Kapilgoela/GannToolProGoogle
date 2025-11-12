import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GANN_TOOLS } from '../constants';

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <svg className="h-8 w-8 text-brand-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
    </svg>
    <span className="text-2xl font-bold text-brand-dark tracking-tight">GannToolPro</span>
  </Link>
);


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const tool = GANN_TOOLS.find(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (tool) {
        navigate(`/tools/${tool.slug}`);
      } else {
        alert('No tool found. Blog search coming soon!');
      }
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navItemClasses = "py-2 px-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-brand-blue transition-colors";
  const activeNavItemClasses = "bg-blue-100 text-brand-blue font-semibold";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <nav className="hidden md:flex md:ml-10 md:space-x-8">
              <NavLink to="/" className={({ isActive }) => `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>Home</NavLink>
              <NavLink to="/compare-tools" className={({ isActive }) => `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>Tools</NavLink>
              <NavLink to="/tradingview" className={({ isActive }) => `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>TradingView</NavLink>
              <NavLink to="/blog" className={({ isActive }) => `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>Blog</NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
              />
              <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
                 <svg className="h-5 w-5 text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue">
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block ${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>Home</NavLink>
            <NavLink to="/compare-tools" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block ${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>Tools</NavLink>
            <NavLink to="/tradingview" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block ${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>TradingView</NavLink>
            <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block ${navItemClasses} ${isActive ? activeNavItemClasses : ''}`}>Blog</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}