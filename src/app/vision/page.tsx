import Navigation from '@/components/Navigation';
import Vision from '@/components/Vision';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision - SYB Network',
  description: 'Discover the vision of the SYB Network: building a fairer Web3 economy with verifiable, decentralized trust infrastructure.',
};

export default function VisionPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Vision />
        <Connect />
      </div>
      <Footer />
    </div>
  );
}

