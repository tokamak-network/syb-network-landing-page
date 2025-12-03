import Navigation from '@/components/Navigation';
import UseCases from '@/components/UseCases';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases - SYB Network',
  description: 'Explore how the SYB Network powers governance, social networks, gaming, airdrops, and enterprise applications with sybil-resistant reputation.',
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <UseCases />
      </div>
      <Footer />
    </div>
  );
}

