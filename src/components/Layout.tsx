import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className={`sticky top-0 z-20 transition-all duration-300 ${scrolled ? 'py-2 bg-white/90 shadow-md' : 'py-4 bg-white/60'} backdrop-blur-md border-b border-blue-200`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group">
            <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-purple-600 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-700 transition-all">
              Stashu
            </span>
          </div>
          <form
            className="flex items-center bg-white rounded-xl px-3 py-1.5 shadow-sm border border-blue-200/50 hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 py-1 text-blue-900 placeholder-blue-400/70 w-32 sm:w-48 md:w-64 lg:w-80 transition"
            />
            <button
              type="submit"
              className="ml-2 p-1.5 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-600 transition-all transform hover:scale-105 active:scale-95"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
            </button>
          </form>
        </div>
      </header>

      {/* Main content rendered by routes */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={`sticky bottom-0 z-10 transition-all ${scrolled ? 'shadow-inner' : ''} bg-white/60 backdrop-blur-md border-t border-blue-200`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between">
          <p className="text-blue-700 font-medium">
            &copy; {new Date().getFullYear()} <span className="font-bold text-blue-600 hover:text-purple-600 transition">Stashu</span>. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-blue-600 hover:text-purple-600 transition">Terms</a>
            <a href="#" className="text-blue-600 hover:text-purple-600 transition">Privacy</a>
            <a href="#" className="text-blue-600 hover:text-purple-600 transition">Contact</a>
          </div>
        </div>
      </footer>

      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 sm:right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-600 transition-all transform hover:scale-110 z-10"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
