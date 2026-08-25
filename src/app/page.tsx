import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import SobreNosotros from './components/SobreNosotros';
import BeneficiosSection from './components/BeneficiosSection';
import FeaturedProducts from './components/FeaturedProducts';
import CartDrawer from '@/components/CartDrawer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background honeycomb-bg">
      <Header />
      <main>
        <HeroSection />
        <SobreNosotros />
        <BeneficiosSection />
        <FeaturedProducts />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
