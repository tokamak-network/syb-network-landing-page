import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pt-20 sm:pt-24 lg:pt-0">
      {/* Animated Network Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/25 to-blue-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Moving Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
      </div>

      {/* Large Circle Background Elements */}
      <div className="absolute inset-0 overflow-hidden" style={{zIndex: 0}}>
        {/* Left Side Large Circles */}
        <div className="absolute left-0 top-0 h-full w-80 opacity-20">
          <div className="absolute top-12 -left-16 w-48 h-48 bg-gradient-to-br from-blue-400/60 to-blue-600/40 rounded-full shadow-2xl animate-pulse" 
               style={{animationDelay: '0s'}}></div>
          <div className="absolute top-72 left-8 w-40 h-40 bg-gradient-to-br from-blue-500/65 to-blue-700/45 rounded-full shadow-2xl animate-pulse" 
               style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-32 -left-12 w-44 h-44 bg-gradient-to-br from-cyan-300/55 to-cyan-500/35 rounded-full shadow-xl animate-bounce" 
               style={{animationDelay: '1s', animationDuration: '6s'}}></div>
        </div>

        {/* Right Side Large Circles */}
        <div className="absolute right-0 top-0 h-full w-80 opacity-20">
          <div className="absolute top-8 -right-16 w-48 h-48 bg-gradient-to-bl from-cyan-400/60 to-cyan-600/40 rounded-full shadow-2xl animate-pulse" 
               style={{animationDelay: '1s'}}></div>
          <div className="absolute top-68 right-8 w-40 h-40 bg-gradient-to-bl from-cyan-500/65 to-cyan-700/45 rounded-full shadow-2xl animate-pulse" 
               style={{animationDelay: '5s'}}></div>
          <div className="absolute bottom-28 -right-12 w-44 h-44 bg-gradient-to-bl from-blue-300/55 to-blue-500/35 rounded-full shadow-xl animate-bounce" 
               style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        </div>

        {/* Center Large Circles - Much Lighter */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/4 left-1/3 w-56 h-56 bg-gradient-to-br from-blue-400/20 to-cyan-400/15 rounded-full shadow-lg animate-pulse" 
               style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-52 h-52 bg-gradient-to-bl from-cyan-400/20 to-blue-400/15 rounded-full shadow-lg animate-pulse" 
               style={{animationDelay: '7s'}}></div>
        </div>

        {/* Corner Large Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-25">
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-500/60 to-transparent rounded-full animate-spin shadow-xl" 
               style={{animationDuration: '20s'}}></div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-25">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-cyan-500/60 to-transparent rounded-full animate-spin shadow-xl" 
               style={{animationDuration: '22s', animationDirection: 'reverse'}}></div>
        </div>
      </div>
      
      {/* Interactive Network Circles */}
      <div className="absolute inset-0 opacity-60">
        {/* Large Network Nodes - Mouse Interactive */}
        <div className="mouse-follow absolute top-1/3 left-1/5 w-4 h-4 bg-blue-500 rounded-full animate-ping hover:animate-none hover:scale-150 hover:bg-blue-400 transition-all duration-300 cursor-pointer" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="mouse-follow absolute top-1/4 right-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-ping hover:animate-none hover:scale-150 hover:bg-cyan-400 transition-all duration-300 cursor-pointer" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="mouse-follow absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-600 rounded-full animate-ping hover:animate-none hover:scale-150 hover:bg-blue-500 transition-all duration-300 cursor-pointer" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
        <div className="mouse-follow absolute bottom-1/4 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping hover:animate-none hover:scale-150 hover:bg-cyan-300 transition-all duration-300 cursor-pointer" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}></div>
        <div className="mouse-follow absolute top-2/3 left-2/3 w-4 h-4 bg-blue-400 rounded-full animate-ping hover:animate-none hover:scale-150 hover:bg-blue-300 transition-all duration-300 cursor-pointer" style={{animationDelay: '1.5s', animationDuration: '3s'}}></div>
        
        {/* Small Network Nodes - Reactive */}
        <div className="mouse-follow absolute top-20 left-1/2 w-2 h-2 bg-blue-300 rounded-full animate-pulse hover:w-4 hover:h-4 hover:bg-blue-400 transition-all duration-300" style={{animationDelay: '0s'}}></div>
        <div className="mouse-follow absolute top-1/2 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse hover:w-4 hover:h-4 hover:bg-cyan-400 transition-all duration-300" style={{animationDelay: '1s'}}></div>
        <div className="mouse-follow absolute bottom-32 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse hover:w-4 hover:h-4 hover:bg-blue-500 transition-all duration-300" style={{animationDelay: '2s'}}></div>
        <div className="mouse-follow absolute top-40 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse hover:w-4 hover:h-4 hover:bg-cyan-500 transition-all duration-300" style={{animationDelay: '0.5s'}}></div>
        <div className="mouse-follow absolute bottom-20 left-40 w-2 h-2 bg-blue-500 rounded-full animate-pulse hover:w-4 hover:h-4 hover:bg-blue-600 transition-all duration-300" style={{animationDelay: '1.5s'}}></div>
        
        {/* Additional Interactive Nodes */}
        <div className="mouse-follow absolute top-16 right-1/6 w-3 h-3 bg-blue-300 rounded-full animate-pulse hover:w-6 hover:h-6 hover:bg-blue-500 transition-all duration-500" style={{animationDelay: '2.5s'}}></div>
        <div className="mouse-follow absolute bottom-16 left-1/6 w-3 h-3 bg-cyan-300 rounded-full animate-pulse hover:w-6 hover:h-6 hover:bg-cyan-500 transition-all duration-500" style={{animationDelay: '3.5s'}}></div>
      </div>


      {/* Enhanced Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-25 hover:opacity-40 transition-opacity duration-500" style={{zIndex: 1}}>
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5"/>
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="radialGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Interactive Connecting Lines */}
        <path d="M 20% 30% Q 50% 20% 80% 40%" stroke="url(#lineGradient1)" strokeWidth="1.5" fill="none" className="animate-pulse hover:stroke-width-2 transition-all duration-300"/>
        <path d="M 10% 60% Q 40% 80% 70% 50%" stroke="url(#lineGradient2)" strokeWidth="1.5" fill="none" className="animate-pulse hover:stroke-width-2 transition-all duration-300" style={{animationDelay: '1s'}}/>
        <path d="M 30% 20% Q 60% 60% 90% 30%" stroke="url(#lineGradient1)" strokeWidth="1.5" fill="none" className="animate-pulse hover:stroke-width-2 transition-all duration-300" style={{animationDelay: '2s'}}/>
        <path d="M 15% 80% Q 45% 40% 85% 70%" stroke="url(#lineGradient2)" strokeWidth="1.5" fill="none" className="animate-pulse hover:stroke-width-2 transition-all duration-300" style={{animationDelay: '0.5s'}}/>
        
        {/* Additional Curved Connections */}
        <path d="M 5% 45% Q 35% 25% 65% 65%" stroke="url(#lineGradient1)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '3s'}}/>
        <path d="M 35% 85% Q 65% 15% 95% 55%" stroke="url(#lineGradient2)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2.5s'}}/>
        
        {/* Interactive Grid Pattern */}
        <line x1="0%" y1="25%" x2="100%" y2="25%" stroke="url(#lineGradient1)" strokeWidth="0.8" opacity="0.4" className="animate-pulse hover:opacity-70 transition-opacity duration-300" style={{animationDelay: '3s'}}/>
        <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="url(#lineGradient2)" strokeWidth="0.8" opacity="0.4" className="animate-pulse hover:opacity-70 transition-opacity duration-300" style={{animationDelay: '2.5s'}}/>
        <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="url(#lineGradient1)" strokeWidth="0.8" opacity="0.3" className="animate-pulse hover:opacity-60 transition-opacity duration-300" style={{animationDelay: '1.5s'}}/>
        <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="url(#lineGradient2)" strokeWidth="0.8" opacity="0.3" className="animate-pulse hover:opacity-60 transition-opacity duration-300" style={{animationDelay: '4s'}}/>
        
        {/* Diagonal Network Lines */}
        <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="url(#lineGradient1)" strokeWidth="0.5" opacity="0.2" className="animate-pulse" style={{animationDelay: '5s'}}/>
        <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="url(#lineGradient2)" strokeWidth="0.5" opacity="0.2" className="animate-pulse" style={{animationDelay: '4.5s'}}/>
        
        {/* Radial Network Pattern */}
        <circle cx="50%" cy="50%" r="30%" fill="none" stroke="url(#radialGradient)" strokeWidth="0.5" opacity="0.15" className="animate-pulse" style={{animationDelay: '6s'}}/>
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="url(#radialGradient)" strokeWidth="0.3" opacity="0.1" className="animate-pulse" style={{animationDelay: '7s'}}/>
      </svg>

      {/* Enhanced Floating Interactive Elements */}
      <div className="absolute inset-0 opacity-50" style={{zIndex: 2}}>
        {/* Interactive Spinning Rings */}
        <div className="mouse-follow absolute top-1/4 left-1/6 w-8 h-8 border-2 border-blue-400 rounded-full animate-spin hover:border-4 hover:border-blue-300 hover:scale-125 transition-all duration-300 cursor-pointer" style={{animationDuration: '8s'}}></div>
        <div className="mouse-follow absolute bottom-1/3 right-1/5 w-6 h-6 border-2 border-cyan-400 rounded-full animate-spin hover:border-4 hover:border-cyan-300 hover:scale-125 transition-all duration-300 cursor-pointer" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
        <div className="mouse-follow absolute top-2/3 left-3/4 w-10 h-10 border border-blue-300 rounded-full animate-spin hover:border-2 hover:border-blue-500 hover:scale-110 transition-all duration-300 cursor-pointer" style={{animationDuration: '10s'}}></div>
        
        {/* Interactive Geometric Shapes */}
        <div className="mouse-follow absolute top-20 right-1/3 w-4 h-4 bg-blue-400/40 transform rotate-45 animate-pulse hover:rotate-180 hover:scale-150 hover:bg-blue-500/60 transition-all duration-500 cursor-pointer" style={{animationDelay: '2s'}}></div>
        <div className="mouse-follow absolute bottom-40 left-1/4 w-3 h-3 bg-cyan-400/40 transform rotate-45 animate-pulse hover:rotate-180 hover:scale-150 hover:bg-cyan-500/60 transition-all duration-500 cursor-pointer" style={{animationDelay: '3s'}}></div>
        
        {/* Additional Interactive Elements */}
        <div className="mouse-follow absolute top-1/5 right-1/4 w-6 h-6 border-2 border-blue-300/50 rounded-lg animate-pulse hover:rounded-full hover:border-blue-500 hover:scale-125 hover:rotate-45 transition-all duration-700 cursor-pointer" style={{animationDelay: '1s'}}></div>
        <div className="mouse-follow absolute bottom-1/5 left-1/5 w-5 h-5 border border-cyan-300/50 transform rotate-12 animate-pulse hover:rotate-90 hover:border-cyan-500 hover:scale-140 transition-all duration-600 cursor-pointer" style={{animationDelay: '3.5s'}}></div>
        
        {/* Morphing Interactive Shapes */}
        <div className="floating-orb absolute top-1/6 left-2/3 w-4 h-4 bg-blue-300/50 rounded-full hover:rounded-none hover:rotate-45 hover:scale-150 hover:bg-blue-500/70 transition-all duration-1000 cursor-pointer"></div>
        <div className="floating-orb absolute bottom-1/6 right-2/3 w-3 h-3 bg-cyan-300/50 rounded-full hover:rounded-none hover:rotate-45 hover:scale-150 hover:bg-cyan-500/70 transition-all duration-1000 cursor-pointer"></div>
        
        {/* Interactive Triangular Elements */}
        <div className="mouse-follow absolute top-1/3 right-1/6 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-blue-400/50 hover:border-b-blue-600 hover:scale-150 transition-all duration-500 cursor-pointer" style={{animationDelay: '2.5s'}}></div>
        <div className="mouse-follow absolute bottom-1/3 left-1/6 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-cyan-400/50 hover:border-b-cyan-600 hover:scale-150 transition-all duration-500 cursor-pointer" style={{animationDelay: '4s'}}></div>
        
        {/* Pulsing Interactive Dots */}
        <div className="mouse-follow absolute top-12 left-1/3 w-1 h-1 bg-blue-500 rounded-full animate-ping hover:w-3 hover:h-3 hover:bg-blue-400 transition-all duration-300" style={{animationDelay: '1.5s'}}></div>
        <div className="mouse-follow absolute bottom-12 right-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-ping hover:w-3 hover:h-3 hover:bg-cyan-400 transition-all duration-300" style={{animationDelay: '5s'}}></div>
        
        {/* Oscillating Elements */}
        <div className="mouse-follow absolute top-1/2 right-12 w-2 h-8 bg-blue-400/30 rounded-full animate-bounce hover:w-4 hover:bg-blue-500/60 transition-all duration-400 cursor-pointer" style={{animationDelay: '3s', animationDuration: '2s'}}></div>
        <div className="mouse-follow absolute top-1/2 left-12 w-2 h-8 bg-cyan-400/30 rounded-full animate-bounce hover:w-4 hover:bg-cyan-500/60 transition-all duration-400 cursor-pointer" style={{animationDelay: '4s', animationDuration: '2.5s'}}></div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 min-h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-6 sm:mb-8 text-center font-['Inter',system-ui,sans-serif]">
              <span className="block font-thin text-gray-700 mb-2 sm:mb-3 font-oswald">The Verifiable</span>
              <span className="block font-bold leading-tight">
                <span className="text-blue-600">Decentralized Network</span> <span className="text-gray-700">of Trust</span>
              </span>
            </h1>
            
            <p className="hero-subtitle max-w-4xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed font-light tracking-wide">
              The SYB Network is a sybil-resistant reputation network where users vouch for each other by mutually locking stake, 
              forming a public graph that rewards connections to credible accounts.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link href="/explorer" className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm sm:text-base">
                <span className="flex items-center">
                  Explore the Network
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators - Bottom */}
      <div className="relative z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-indicators flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium tracking-wide">Fully Decentralized</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium tracking-wide">Zero-Knowledge Proofs</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium tracking-wide">Sybil Resistant</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium tracking-wide">Enterprise Ready <span className="text-gray-500">(Coming Soon)</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
