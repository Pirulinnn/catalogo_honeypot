'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featuredList = products.filter((p) => p.featured);

  return (
    <section id="catalogo" className="py-20 md:py-28 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full text-xs font-semibold">
              <Sparkles size={14} className="text-amber-600" />
              <span>Selección Especial</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Nuestras Mieles Destacadas
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Las cosechas más aclamadas por nuestros clientes por su aroma, pureza y textura única.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all shrink-0"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {featuredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
