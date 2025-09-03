'use client';

import useScrollAnimation from '../hooks/useScrollAnimation';

export default function NetworkHub() {
  const hubRef = useScrollAnimation('animate-fade-in-up', 0);
  const titleRef = useScrollAnimation('animate-fade-in-up', 0.2);

  return (
    <section id="network-hub" className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            The <span className="text-blue-600">Network Hub</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the heart of SYB Network, a dynamic ecosystem where trust, verification, 
            and decentralized connections converge to create the future of digital identity.
          </p>
        </div>

        {/* Central Hub Network Animation */}
        <div ref={hubRef} className="relative flex items-center justify-center min-h-[600px]">
          <div className="relative">
            {/* Central Hub - Pulsing Core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute inset-3 bg-white rounded-full opacity-90"></div>
              </div>
            </div>

            {/* Outer Orbit - Professional Circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] animate-spin" style={{animationDuration: '25s'}}>
              {/* Decentralized - Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-xl flex items-center justify-center border-4 border-white/20 hover:scale-110 transition-all duration-300">
                    <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-full px-3 py-1 shadow-lg border border-blue-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-blue-900">Decentralized</span>
                  </div>
                </div>
              </div>
              
              {/* Verifiable - Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-xl flex items-center justify-center border-4 border-white/20 hover:scale-110 transition-all duration-300">
                    <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-full px-3 py-1 shadow-lg border border-cyan-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-cyan-900">Verifiable</span>
                  </div>
                </div>
              </div>
              
              {/* Scalable - Left */}
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-xl flex items-center justify-center border-4 border-white/20 hover:scale-110 transition-all duration-300">
                    <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
                  </div>
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-lg rounded-full px-3 py-1 shadow-lg border border-blue-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-blue-900">Scalable</span>
                  </div>
                </div>
              </div>
              
              {/* Trust Network - Right */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full shadow-xl flex items-center justify-center border-4 border-white/20 hover:scale-110 transition-all duration-300">
                    <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
                  </div>
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-lg rounded-full px-3 py-1 shadow-lg border border-cyan-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-cyan-900">Trust Network</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Orbit - Technical Circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 animate-spin" style={{animationDuration: '18s', animationDirection: 'reverse'}}>
              {/* zk-SNARKs - Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-lg flex items-center justify-center border-3 border-white/30 hover:scale-110 transition-all duration-300">
                    <div className="w-4 h-4 bg-white rounded opacity-90"></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-full px-2 py-0.5 shadow-md border border-blue-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-blue-900">zk-SNARKs</span>
                  </div>
                </div>
              </div>
              
              {/* zk-Rollups - Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full shadow-lg flex items-center justify-center border-3 border-white/30 hover:scale-110 transition-all duration-300">
                    <div className="w-4 h-4 bg-white rounded opacity-90"></div>
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-full px-2 py-0.5 shadow-md border border-cyan-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-cyan-900">zk-Rollups</span>
                  </div>
                </div>
              </div>
              
              {/* Identity Score - Left */}
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center border-3 border-white/30 hover:scale-110 transition-all duration-300">
                    <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
                  </div>
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-lg rounded-full px-2 py-0.5 shadow-md border border-blue-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-blue-900">Identity</span>
                  </div>
                </div>
              </div>
              
              {/* Consensus - Right */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-lg flex items-center justify-center border-3 border-white/30 hover:scale-110 transition-all duration-300">
                    <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
                  </div>
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-lg rounded-full px-2 py-0.5 shadow-md border border-cyan-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    <span className="text-xs font-semibold text-cyan-900">Consensus</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Orbit */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-spin" style={{animationDuration: '12s'}}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full opacity-90 animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-cyan-600 rounded-full opacity-85 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full opacity-75 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-5 h-5 bg-cyan-500 rounded-full opacity-80 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* Connecting Lines to Central Hub */}
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30" style={{zIndex: -1}}>
              <defs>
                <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2"/>
                </radialGradient>
                <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
              
              {/* Radial Connection Lines */}
              <g className="animate-pulse" style={{animationDuration: '3s'}}>
                <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="url(#connectionLine)" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50%" y1="50%" x2="50%" y2="95%" stroke="url(#connectionLine)" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="url(#connectionLine)" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="url(#connectionLine)" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#connectionLine)" strokeWidth="1.2" opacity="0.5"/>
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#connectionLine)" strokeWidth="1.2" opacity="0.5"/>
                <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#connectionLine)" strokeWidth="1.2" opacity="0.5"/>
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#connectionLine)" strokeWidth="1.2" opacity="0.5"/>
              </g>
              
              {/* Central Hub Glow */}
              <circle cx="50%" cy="50%" r="8%" fill="url(#hubGradient)" opacity="0.4" className="animate-pulse" style={{animationDuration: '2s'}}/>
            </svg>

            {/* Expanding Ripple Effects */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border border-blue-400/30 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
              <div className="absolute inset-0 w-48 h-48 border border-cyan-400/20 rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
              <div className="absolute inset-0 w-64 h-64 border border-blue-300/15 rounded-full animate-ping" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
              <div className="absolute inset-0 w-80 h-80 border border-cyan-300/10 rounded-full animate-ping" style={{animationDuration: '7s', animationDelay: '3s'}}></div>
              <div className="absolute inset-0 w-96 h-96 border border-blue-200/8 rounded-full animate-ping" style={{animationDuration: '8s', animationDelay: '4s'}}></div>
            </div>

            {/* Data Flow Animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-blue-500 rounded-full opacity-70 animate-bounce absolute" style={{
                top: '-80px', 
                left: '-6px',
                animationDuration: '2.5s',
                animationDelay: '0s'
              }}></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full opacity-70 animate-bounce absolute" style={{
                bottom: '-80px', 
                right: '-6px',
                animationDuration: '2.5s',
                animationDelay: '0.6s'
              }}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full opacity-70 animate-bounce absolute" style={{
                left: '-80px', 
                top: '-6px',
                animationDuration: '2.5s',
                animationDelay: '1.2s'
              }}></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full opacity-70 animate-bounce absolute" style={{
                right: '-80px', 
                bottom: '-6px',
                animationDuration: '2.5s',
                animationDelay: '1.8s'
              }}></div>
              
              {/* Additional Data Flow Points */}
              <div className="w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-bounce absolute" style={{
                top: '-60px', 
                right: '-40px',
                animationDuration: '3s',
                animationDelay: '0.8s'
              }}></div>
              <div className="w-2 h-2 bg-cyan-300 rounded-full opacity-60 animate-bounce absolute" style={{
                bottom: '-60px', 
                left: '-40px',
                animationDuration: '3s',
                animationDelay: '1.5s'
              }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full opacity-60 animate-bounce absolute" style={{
                top: '-40px', 
                left: '-60px',
                animationDuration: '3s',
                animationDelay: '2.2s'
              }}></div>
              <div className="w-2 h-2 bg-cyan-600 rounded-full opacity-60 animate-bounce absolute" style={{
                bottom: '-40px', 
                right: '-60px',
                animationDuration: '3s',
                animationDelay: '2.8s'
              }}></div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
