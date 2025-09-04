'use client';

import useScrollAnimation, { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';
import { Book, Github, FileText, MessageSquare, HelpCircle } from 'lucide-react';

export default function Connect() {
  const headerRef = useScrollAnimation('animate-fade-in-up', 0);
  const leftContentRef = useScrollAnimation('animate-fade-in-left', 0.1);
  const rightContentRef = useScrollAnimation('animate-fade-in-right', 0.2);
  const resourceCardsRef = useStaggeredScrollAnimation(4, 'animate-fade-in-up', 0.1);
  const communityCardsRef = useStaggeredScrollAnimation(4, 'animate-fade-in-up', 0.1);

  return (
    <section id="connect" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            Learn & <span className="text-blue-600">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore comprehensive resources, connect with our community, and start building with SYB Network's 
            cutting-edge decentralized identity infrastructure.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div ref={leftContentRef}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Developer Resources</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Access comprehensive documentation, development tools, and research materials to integrate 
              SYB Network's verifiable identity solutions into your applications.
            </p>
            
            <div ref={resourceCardsRef} className="grid sm:grid-cols-2 gap-6">
              <div className="scroll-stagger-item bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Documentation</h4>
                <p className="text-gray-600 text-sm mb-4">Technical specs, integration guides, and API references.</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                  Read Docs →
                </button>
              </div>
              
              <div className="scroll-stagger-item bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Developer Tools</h4>
                <p className="text-gray-600 text-sm mb-4">SDKs, APIs, and development resources.</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                  Get Started →
                </button>
              </div>
              
              <div className="scroll-stagger-item bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <Github className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">GitHub Repository</h4>
                <p className="text-gray-600 text-sm mb-4">Source code and contribution guidelines.</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                  View Code →
                </button>
              </div>
              
              <div className="scroll-stagger-item bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Research Papers</h4>
                <p className="text-gray-600 text-sm mb-4">Latest research on zero-knowledge proofs.</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                  View Research →
                </button>
              </div>
            </div>
          </div>
          
          <div ref={rightContentRef}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Community & Support</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Join our growing community of developers, researchers, and innovators building the future 
              of decentralized identity and trust infrastructure.
            </p>
            
            <div ref={communityCardsRef} className="space-y-4">
              <div className="scroll-stagger-item bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Developer Discord</h4>
                <p className="text-gray-600 mb-4">Connect with developers, get support, and share ideas.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Join Community
                </button>
              </div>
              
              <div className="scroll-stagger-item bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Technical Support</h4>
                <p className="text-gray-600 mb-4">Get help with integration and technical questions.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Get Support
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Building?</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Join the ecosystem of developers building the next generation of decentralized applications 
              with verifiable identity at their core.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105">
                Explore Documentation
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
                Join Discord Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
