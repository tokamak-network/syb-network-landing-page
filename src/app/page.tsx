import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import NetworkHub from '@/components/NetworkHub';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import UseCases from '@/components/UseCases';
import Vision from '@/components/Vision';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <NetworkHub />
      <HowItWorks />
      <Benefits />
      <UseCases />
      <Vision />
      <Connect />
      <Footer />
    </div>
  );
}
