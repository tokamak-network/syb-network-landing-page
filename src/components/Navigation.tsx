'use client';

import { useEffect } from 'react';

export default function Navigation() {
  useEffect(() => {
    const navbarPill = document.querySelector('.navbar-pill');
    let isScrolled = false;

    function updateNavbar() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const heroHeight = window.innerHeight * 0.3; // 30% of viewport height

              if (scrollTop > heroHeight && !isScrolled) {
          // Scrolled past hero - keep pill shape but with more opacity
          if (navbarPill && navbarPill.parentElement) {
            navbarPill.className = 'navbar-pill bg-white/90 backdrop-blur-md border border-white/20 rounded-full px-12 py-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-7xl';
            if (navbarPill.parentElement.parentElement) {
              navbarPill.parentElement.parentElement.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
            }
            navbarPill.parentElement.className = 'flex justify-center pt-4';
          }
          isScrolled = true;
        } else if (scrollTop <= heroHeight && isScrolled) {
          // In hero section - floating pill
          if (navbarPill && navbarPill.parentElement) {
            navbarPill.className = 'navbar-pill bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-12 py-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-7xl';
            navbarPill.parentElement.className = 'flex justify-center pt-4';
          }
          isScrolled = false;
        }
    }

    // Initial check
    updateNavbar();

    // Listen for scroll events
    window.addEventListener('scroll', updateNavbar, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateNavbar);
    };
  }, []);

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unique Floating Pill Design */}
        <div className="flex justify-center pt-4">
          <div className="navbar-pill bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-12 py-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-7xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-105 hover:bg-blue-700 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <img 
                    src="/assets/brand/syb-logo-dark.png" 
                    alt="SYB Network" 
                    className="h-8 w-auto"
                  />
                </button>
              </div>

              {          /* Desktop Navigation Links - Clean Style */}
          <div className="hidden md:flex items-center space-x-2">
                <a href="#about" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                  Discovery
                </a>
                <a href="#how-it-works" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                  Protocol
                </a>
                <a href="#benefits" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                  Advantages
                </a>
                <a href="#use-cases" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                  Applications
                </a>
                <a href="#vision" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                  Future
                </a>
                <a href="#connect" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                  Community
                </a>
              </div>

              {/* Unique CTA Button */}
              <div className="hidden sm:block">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Started
                </button>
              </div>

              {/* Modern Mobile Menu Button */}
              <div className="md:hidden">
                <button className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <div className="w-5 h-5 relative">
                    <div className="absolute top-0 left-0 w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300"></div>
                    <div className="absolute top-2 left-0 w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300"></div>
                    <div className="absolute top-4 left-0 w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
