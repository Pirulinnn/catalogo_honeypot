'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import AppImage from '@/components/ui/AppImage';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isPropoleo =
    product.name.toLowerCase().includes('propóleo') ||
    product.name.toLowerCase().includes('propoleo');

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 modal-overlay"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-background rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 z-10 overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Image Container (Single Image) */}
              <div className="space-y-3">
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-muted/60 border border-border flex items-center justify-center p-2 sm:p-3">
                  <AppImage
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-contain ${
                      isPropoleo ? 'scale-125' : 'scale-105'
                    }`}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 px-2.5 py-0.5 rounded-md text-xs">
                      {product.weight}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-3xl font-bold text-primary">
                      ${product.price.toLocaleString('en-US')}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">USD</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-xl bg-muted p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-all cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-foreground">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-all cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl shadow-amber hover:bg-primary/90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag size={18} />
                      <span>
                        Agregar al Carrito — ${(product.price * quantity).toLocaleString('en-US')}{' '}
                        USD
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
