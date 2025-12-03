import Navigation from '@/components/Navigation';
import NetworkHub from '@/components/NetworkHub';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protocol - SYB Network',
  description: 'Explore how the SYB Network protocol works: verifiable architecture, web-of-trust mechanism, uniqueness scoring, and zk-Rollup infrastructure.',
};

export default function ProtocolPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <NetworkHub />
        <HowItWorks />
        <Benefits />
      </div>
      <Footer />
    </div>
  );
}

