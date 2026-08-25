import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCatalog from './components/ProductCatalog';
import CartDrawer from '@/components/CartDrawer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Mieles Puras — Honeypot',
  description:
    'Explora nuestra selección completa de mieles 100% puras artesanales: florales, silvestres, de manuka y variedades infusionadas.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background honeycomb-bg">
      <Header />
      <main>
        <ProductCatalog />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
