'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

export default function HowItWorks() {
  const headerRef = useScrollAnimation('animate-fade-in-up', 0);
  const cardsRef = useStaggeredScrollAnimation(4, 'animate-fade-in-up', 0.15);

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            How <span className="text-blue-600">SYB Network</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            SYB Network operates through four core mechanisms that ensure decentralized trust,
            verifiable uniqueness, and secure computation at scale.
          </p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Verifiable Decentralized Architecture</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">A network of nodes runs computations off-chain</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">Results are verified with zero-knowledge proofs, making them tamper-proof</span>
              </li>
            </ul>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Web-of-Trust Mechanism</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">Users vouch for each other</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">The network calculates trust using a PageRank-style algorithm</span>
              </li>
            </ul>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-600 rounded-lg bg-white"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Uniqueness Scoring System</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">Every address gets a verifiable uniqueness score</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">This score becomes the key to fair participation</span>
              </li>
            </ul>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg border-2 border-blue-600 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">zk-Rollup Infrastructure</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">High-cost computations run off-chain</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">Final proofs are posted on-chain for transparency</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
