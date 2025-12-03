import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - SYB Network',
  description: 'Learn about the SYB Network, a sybil-resistant reputation network using mutual-stake vouching to create verifiable trust.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
}
