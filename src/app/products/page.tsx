import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCatalog from './components/ProductCatalog';
import CartDrawer from '@/components/CartDrawer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Miel Pura de Abeja, Propóleo y Polen',
  description:
    'Compra miel pura 100% cruda, polen floral y extracto de propóleo al 30% al detal y al mayor en Caracas y Venezuela. Precios en USD a tasa oficial BCV.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Catálogo de Miel Pura de Abeja, Propóleo y Polen | Honey Pot',
    description:
      'Compra miel cruda 100% pura cosechada en Guanare, polen y propóleo al detal y al mayor con delivery en Caracas y envíos a toda Venezuela.',
    url: 'https://honeypotve.com/products',
    siteName: 'Honey Pot Venezuela',
    locale: 'es_VE',
    type: 'website',
  },
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
