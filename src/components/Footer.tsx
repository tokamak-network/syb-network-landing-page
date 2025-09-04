'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

export default function Footer() {
  const brandRef = useScrollAnimation('animate-fade-in-left', 0);
  const linksRef = useScrollAnimation('animate-fade-in-up', 0.2);
  const resourcesRef = useScrollAnimation('animate-fade-in-up', 0.3);
  const bottomRef = useScrollAnimation('animate-fade-in-up', 0.4);

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Brand Section */}
          <div ref={brandRef} className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/assets/brand/syb-logo-dark.png" 
                alt="SYB Network" 
                className="h-12 w-auto mr-4"
              />
              <h3 className="text-2xl font-bold tracking-tight">SYB Network</h3>
            </div>
            <p className="text-lg text-blue-300 mb-4 font-medium">
              The Verifiable Decentralized Network of Trust
            </p>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Powered by zk-SNARKs and zk-Rollups, SYB Network ensures fairness, prevents Sybil attacks, 
              and secures Web3 identities through verifiable decentralization.
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-3">
              <a href="#" className="group w-11 h-11 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="group w-11 h-11 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343l-.333 1.36c-.053.22-.174.267-.402.161C4.798 16.73 3.936 14.61 3.936 11.97c0-3.751 2.748-7.196 7.92-7.196 4.15 0 7.377 2.958 7.377 6.91 0 4.127-2.607 7.44-6.227 7.44-1.216 0-2.357-.63-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="group w-11 h-11 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575-.105.79-.252.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.129 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.391-5.247 5.678.417.36.777 1.05.777 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.658.79.546C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75z"/>
                </svg>
              </a>
              <a href="#" className="group w-11 h-11 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div ref={linksRef}>
            <h4 className="text-lg font-bold mb-6 text-blue-300 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Discovery</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Protocol</a></li>
              <li><a href="#benefits" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Advantages</a></li>
              <li><a href="#use-cases" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Applications</a></li>
              <li><a href="#vision" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Future</a></li>
              <li><a href="#connect" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Community</a></li>
            </ul>
          </div>

          {/* Enhanced Resources */}
          <div ref={resourcesRef}>
            <h4 className="text-lg font-bold mb-6 text-blue-300 tracking-wide">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">GitHub Repository</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Research Papers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Community Hub</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div ref={bottomRef} className="border-t border-gray-700/50 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 SYB Network. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Powered by</span>
                <span className="text-blue-400 font-medium">zk-SNARKs</span>
                <span>•</span>
                <span className="text-cyan-400 font-medium">zk-Rollups</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
