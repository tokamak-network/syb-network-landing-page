'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const headerRef = useScrollAnimation('animate-fade-in-up', 0);
  const leftContentRef = useScrollAnimation('animate-fade-in-left', 0.1);
  const rightContentRef = useScrollAnimation('animate-fade-in-right', 0.2);
  const cardsRef = useStaggeredScrollAnimation(3, 'animate-fade-in-up', 0.2);
  const bottomRef = useScrollAnimation('animate-fade-in-up', 0);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            What is <span className="text-blue-600">SYB Network</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            SYB Network is a revolutionary decentralized infrastructure that transforms how digital identity 
            and trust work in Web3, providing verifiable uniqueness and preventing manipulation at scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div ref={leftContentRef}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">The Problem We Solve</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Current Web3 systems struggle with Sybil attacks, fake accounts, and unfair participation. 
              Traditional solutions are centralized, expensive, or easily gamed.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              SYB Network provides the first truly decentralized solution that ensures one person equals 
              one identity while maintaining privacy and scalability.
            </p>
          </div>
          <div ref={rightContentRef} className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-xl"></div>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Our Solution</h4>
            <p className="text-gray-600 leading-relaxed">
              A decentralized network that combines web-of-trust mechanisms with zero-knowledge proofs 
              to create verifiable uniqueness scores for every participant.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Verifiable Uniqueness</h3>
            <p className="text-gray-600 leading-relaxed">Every account receives a cryptographically verifiable uniqueness score that proves authentic participation without revealing personal information.</p>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sybil Resistance</h3>
            <p className="text-gray-600 leading-relaxed">Advanced algorithms ensure one person equals one identity, effectively preventing fake accounts and manipulation attacks.</p>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-xl border-2 border-blue-600"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trustless Architecture</h3>
            <p className="text-gray-600 leading-relaxed">All computations are verified on-chain using zero-knowledge proofs, ensuring complete transparency and decentralization.</p>
          </div>
        </div>

        <div ref={bottomRef} className="mt-16 text-center">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Foundation of Web3 Trust</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              SYB Network serves as the critical infrastructure for decentralized identity and trust, 
              enabling fair participation across governance, DeFi, gaming, and social applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
