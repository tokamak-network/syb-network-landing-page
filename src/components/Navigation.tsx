'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const navbarPill = document.querySelector('.navbar-pill');
    let isScrolled = false;

    function updateNavbar() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const heroHeight = window.innerHeight * 0.3; // 30% of viewport height

              if (scrollTop > heroHeight && !isScrolled) {
          // Scrolled past hero - keep pill shape but with more opacity
          if (navbarPill && navbarPill.parentElement) {
            navbarPill.className = 'navbar-pill bg-white/90 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-7xl';
            if (navbarPill.parentElement.parentElement) {
              navbarPill.parentElement.parentElement.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
            }
            navbarPill.parentElement.className = 'flex justify-center pt-2 sm:pt-4';
          }
          isScrolled = true;
        } else if (scrollTop <= heroHeight && isScrolled) {
          // In hero section - floating pill
          if (navbarPill && navbarPill.parentElement) {
            navbarPill.className = 'navbar-pill bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-7xl';
            navbarPill.parentElement.className = 'flex justify-center pt-2 sm:pt-4';
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
    <>
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Unique Floating Pill Design */}
          <div className="flex justify-center pt-2 sm:pt-4">
            <div className="navbar-pill bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-7xl">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-105 hover:bg-blue-700 transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <img 
                      src="/assets/brand/syb-logo-dark.png" 
                      alt="SYB Network" 
                      className="h-6 sm:h-8 w-auto"
                    />
                  </Link>
                </div>

                {/* Desktop Navigation Links - Clean Style */}
                <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                  <Link href="/about" className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                    About
                  </Link>
                  <Link href="/protocol" className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                    Protocol
                  </Link>
                  <Link href="/use-cases" className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                    Use Cases
                  </Link>
                  <Link href="/vision" className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                    Vision
                  </Link>
                  <Link href="/blog" className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:text-slate-700 hover:shadow-md transition-all duration-300">
                    Blog
                  </Link>
                </div>

                {/* Desktop CTA Button */}
                <div className="hidden lg:block">
                  <Link href="/explorer" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 xl:px-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                    Network Explorer
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <button 
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                    aria-label="Toggle mobile menu"
                  >
                    <div className="w-5 h-5 relative">
                      <div 
                        className={`absolute top-0 left-0 w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                          isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''
                        }`}
                      ></div>
                      <div 
                        className={`absolute top-2 left-0 w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                          isMobileMenuOpen ? 'opacity-0' : ''
                        }`}
                      ></div>
                      <div 
                        className={`absolute top-4 left-0 w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                          isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 sm:top-24 bg-white/95 backdrop-blur-md z-40">
            <div className="flex flex-col items-center justify-start pt-12 space-y-6">
              <Link 
                href="/about" 
                onClick={closeMobileMenu}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              >
                About
              </Link>
              <Link 
                href="/protocol" 
                onClick={closeMobileMenu}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              >
                Protocol
              </Link>
              <Link 
                href="/use-cases" 
                onClick={closeMobileMenu}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              >
                Use Cases
              </Link>
              <Link 
                href="/vision" 
                onClick={closeMobileMenu}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              >
                Vision
              </Link>
              <Link 
                href="/blog" 
                onClick={closeMobileMenu}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              >
                Blog
              </Link>
              
              {/* Mobile CTA Button */}
              <div className="pt-4">
                <Link 
                  href="/explorer"
                  onClick={closeMobileMenu}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Network Explorer
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
}
