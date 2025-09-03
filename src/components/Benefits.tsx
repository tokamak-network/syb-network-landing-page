'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

export default function Benefits() {
  const headerRef = useScrollAnimation('animate-fade-in-up', 0);
  const cardsRef = useStaggeredScrollAnimation(6, 'animate-fade-in-up', 0.15);

  return (
    <section id="benefits" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            Why Choose <span className="text-blue-600">SYB Network</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            SYB Network delivers unmatched security, transparency, and fairness through cutting-edge
            cryptographic technologies and decentralized architecture.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verifiable by Design</h3>
                <p className="text-gray-600 leading-relaxed">Proofs are cryptographically secured, visible to everyone, ensuring complete transparency and trust.</p>
              </div>
            </div>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fully Decentralized</h3>
                <p className="text-gray-600 leading-relaxed">No central authority; trust comes from the network itself through distributed consensus mechanisms.</p>
              </div>
            </div>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fair Participation</h3>
                <p className="text-gray-600 leading-relaxed">Eliminates Sybil attacks, fake accounts, and manipulation through advanced identity verification.</p>
              </div>
            </div>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable & Secure</h3>
                <p className="text-gray-600 leading-relaxed">Built on zk-Rollups, handling thousands of users seamlessly while maintaining enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
