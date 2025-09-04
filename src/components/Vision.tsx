'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';
import { Target, BarChart3, Users, Zap } from 'lucide-react';

export default function Vision() {
  const headerRef = useScrollAnimation('animate-fade-in-up', 0);
  const contentLeftRef = useScrollAnimation('animate-fade-in-left', 0.1);
  const contentRightRef = useScrollAnimation('animate-fade-in-right', 0.2);
  const cardsRef = useStaggeredScrollAnimation(3, 'animate-fade-in-up', 0.2);

  return (
    <section id="vision" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-cyan-500/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-600/30 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-40 right-20 w-2 h-2 bg-cyan-600/30 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            The <span className="text-blue-600">Vision</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            SYB Network envisions a future where digital identity, trust, and fairness are foundational 
            pillars of the decentralized web, creating unprecedented opportunities for authentic participation.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div ref={contentLeftRef}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Building the Future of Web3</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              SYB is more than a protocol, it's a comprehensive network for decentralized identity and fairness 
              that transforms how we interact in digital spaces.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              By combining cryptography, zero-knowledge proofs, and decentralized computation, SYB lays 
              the foundation for a new era of digital trust and authentic participation.
            </p>
          </div>
          <div ref={contentRightRef} className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 flex items-center justify-center shadow-md">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
            <p className="text-gray-700 leading-relaxed">
              To create a verifiable, fair, and trustworthy foundation for the next generation of 
              decentralized applications and digital communities.
            </p>
          </div>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          <div className="scroll-stagger-item bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-md">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">A Fairer Web3 Economy</h3>
            <p className="text-gray-700 text-center leading-relaxed">Creating equal opportunities and preventing exploitation through verifiable identity systems.</p>
          </div>
          <div className="scroll-stagger-item bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Trustworthy Digital Society</h3>
            <p className="text-gray-700 text-center leading-relaxed">Building authentic connections and interactions based on cryptographic proof and transparency.</p>
          </div>
          <div className="scroll-stagger-item bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Verifiable Decentralized Future</h3>
            <p className="text-gray-700 text-center leading-relaxed">Ensuring transparency, accountability, and trust through advanced cryptographic technologies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
