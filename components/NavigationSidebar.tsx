import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GANN_TOOLS, TRADINGVIEW_CATEGORIES } from '../constants';

const NavHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="px-3 text-xs font-semibold uppercase text-gray-500 tracking-wider">
    {children}
  </h3>
);

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-blue-100 text-brand-blue'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`
    }
  >
    {children}
  </NavLink>
);

const AccordionSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-xs font-semibold uppercase text-gray-500 tracking-wider hover:bg-gray-100 rounded-md transition-colors"
            >
                <span>{title}</span>
                <svg className={`w-4 h-4 transform transition-transform ${isOpen ? '' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="mt-1 space-y-1 pl-2 border-l-2 border-gray-200 ml-2">{children}</div>}
        </div>
    );
};

export default function NavigationSidebar() {
  return (
    <nav className="space-y-6">
      <div className="space-y-1">
        <NavHeader>Dashboard</NavHeader>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/compare-tools">Compare Tools</NavItem>
        <NavItem to="/blog">Blog</NavItem>
      </div>

      <div className="space-y-1">
        <AccordionSection title="Gann Tools">
          {GANN_TOOLS.map(tool => (
            <NavItem key={tool.slug} to={`/tools/${tool.slug}`}>
              {tool.name}
            </NavItem>
          ))}
        </AccordionSection>
      </div>

      <div className="space-y-1">
        <AccordionSection title="TradingView Library">
          <NavItem to="/tradingview">All Categories</NavItem>
          {TRADINGVIEW_CATEGORIES.map(category => (
            <NavItem key={category.slug} to={`/tradingview/${category.slug}`}>
              {category.name}
            </NavItem>
          ))}
        </AccordionSection>
      </div>
    </nav>
  );
}