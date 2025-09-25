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
              <a href="https://x.com/SYBNetwork" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://t.me/+HOQmpdZqr4gyZjc8" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
            </ul>
          </div>

          {/* Enhanced Resources */}
          <div ref={resourcesRef}>
            <h4 className="text-lg font-bold mb-6 text-blue-300 tracking-wide">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://www.notion.so/tokamak/Tokamak-Sybil-Resistance-Overview-03cc941223844f30ba4473e98b1275a7?pvs=4" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Documentation</a></li>
              <li><a href="https://explorer.syb.network" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Network Explorer</a></li>
              <li><a href="https://github.com/tokamak-network" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">GitHub Repository</a></li>
              <li><a href="https://www.notion.so/tokamak/Tokamak-Sybil-Resistance-Overview-03cc941223844f30ba4473e98b1275a7?pvs=4" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Research Papers</a></li>
              <li><a href="https://t.me/+HOQmpdZqr4gyZjc8" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1 transform inline-block">Community Hub</a></li>
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
