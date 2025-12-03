'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';
import { Vote, Gamepad2, Gift, Building, Users } from 'lucide-react';

export default function UseCases() {
  const headerRef = useScrollAnimation('animate-fade-in-up', 0);
  const cardsRef = useStaggeredScrollAnimation(6, 'animate-fade-in-up', 0.15);

  return (
    <section id="use-cases" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            <span className="text-blue-600">Use Cases</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The SYB Network powers diverse applications across Web3, from decentralized governance
            to secure gaming ecosystems, ensuring authentic participation in every interaction.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <Vote className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Governance</h3>
            <p className="text-gray-600 leading-relaxed">Fair one-person-one-vote systems in DAOs and communities, ensuring democratic participation.</p>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Social Networks</h3>
            <p className="text-gray-600 leading-relaxed">Verified interactions, fewer bots, and authentic communities built on trust.</p>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Gaming & Metaverse</h3>
            <p className="text-gray-600 leading-relaxed">Stops bot exploitation and ensures real player fairness in virtual economies.</p>
          </div>

          <div className="scroll-stagger-item bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center">
              <Gift className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Airdrops & Rewards</h3>
            <p className="text-gray-600 leading-relaxed">Rewards distribution to verified, unique participants only, preventing fraud.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 lg:col-span-2">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance & Enterprise</h3>
                <p className="text-gray-600 leading-relaxed">Build Web3 systems with provable uniqueness and transparency for regulatory compliance and enterprise applications.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Implement SYB Network?</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Whether you're building a DAO, launching a social platform, or creating the next big gaming experience,
              the SYB Network provides the trust infrastructure you need.
            </p>
            <a 
              href="https://www.notion.so/tokamak/Tokamak-Sybil-Resistance-Overview-03cc941223844f30ba4473e98b1275a7?pvs=4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 inline-block"
            >
              Explore Integration Options
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
