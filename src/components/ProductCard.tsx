'use client';

import React from 'react';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import AppImage from '@/components/ui/AppImage';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export default function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const { addItem } = useCartStore();

  const isPropoleo =
    product.name.toLowerCase().includes('propóleo') ||
    product.name.toLowerCase().includes('propoleo');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
  };

  const categoryLabels: Record<string, string> = {
    miel: 'Miel',
    colmena: 'Colmena',
    snacks: 'Snacks',
    mayor: 'Al mayor',
  };

  return (
    <div
      onClick={() => onSelectProduct?.(product)}
      className="group relative bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-rustic hover:shadow-rustic-hover transition-all duration-300 flex flex-col cursor-pointer select-none"
    >
      {/* 1. Contenedor de Imagen */}
      <div className="relative w-full aspect-square overflow-hidden bg-amber-950/5 dark:bg-amber-950/20 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center p-1.5 sm:p-2">
        <AppImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain transition-transform duration-300 ${
            isPropoleo ? 'scale-125 group-hover:scale-[1.32]' : 'scale-105 group-hover:scale-110'
          }`}
        />
      </div>

      {/* 2. Información del Producto */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Categoría y Peso */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span className="capitalize font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-[90px] sm:max-w-none">
              {categoryLabels[product.category] || product.category}
            </span>
            <span className="font-medium text-[10px] sm:text-xs shrink-0">{product.weight}</span>
          </div>

          {/* Nombre del Producto */}
          <h3 className="font-display font-bold text-xs sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* 3. Barra Inferior: Precio en USD y Botón de Acción Rápida */}
        <div className="pt-2 border-t border-border flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5 truncate">
            <span className="font-display text-sm sm:text-lg font-bold text-amber-500 dark:text-amber-400">
              ${product.price.toLocaleString('en-US')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">
              USD
            </span>
          </div>

          {/* Botón de Agregar al Carrito */}
          <button
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-amber hover:bg-primary/90 active:scale-90 transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer"
            title="Agregar al Carrito"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
