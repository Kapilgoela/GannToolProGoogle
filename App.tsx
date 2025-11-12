import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NavigationSidebar from './components/NavigationSidebar';

const HomePage = lazy(() => import('./pages/HomePage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const CompareToolsPage = lazy(() => import('./pages/CompareToolsPage'));
const TradingViewHubPage = lazy(() => import('./pages/TradingViewPage'));
const TradingViewCategoryPage = lazy(() => import('./pages/TradingViewCategoryPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-blue"></div>
  </div>
);

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    // Homepage has its own full-width layout, no container or sidebar needed at this level.
    return (
      <main className="flex-grow">
        <Outlet />
      </main>
    );
  }

  // All other pages get the sidebar layout.
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
      <div className="md:grid md:grid-cols-12 md:gap-x-8">
        <aside className="hidden md:block md:col-span-3 lg:col-span-2 pt-8">
          <div className="sticky top-24">
            <NavigationSidebar />
          </div>
        </aside>
        <main className="md:col-span-9 lg:col-span-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-brand-dark">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools/:toolSlug" element={<ToolPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/:toolSlug" element={<BlogPage />} />
              <Route path="/compare-tools" element={<CompareToolsPage />} />
              <Route path="/tradingview" element={<TradingViewHubPage />} />
              <Route path="/tradingview/:categorySlug" element={<TradingViewCategoryPage />} />
            </Route>
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;