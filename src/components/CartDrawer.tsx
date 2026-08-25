'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import AppImage from '@/components/ui/AppImage';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, getTotalPrice } =
    useCartStore();

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="absolute inset-0 modal-overlay"
            />

            {/* Drawer Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-background shadow-2xl flex flex-col justify-between border-l border-border"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-foreground">Tu Carrito</h2>
                      <p className="text-xs text-muted-foreground">
                        {items.length} {items.length === 1 ? 'producto' : 'productos'} en total
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCart}
                    className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                      <div className="w-16 h-16 rounded-full bg-secondary/80 flex items-center justify-center text-amber-600">
                        <ShoppingBag size={32} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          Tu carrito está vacío
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                          Explora nuestras mieles artesanales puras y agrega tus favoritas.
                        </p>
                      </div>
                      <button
                        onClick={closeCart}
                        className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl shadow-amber hover:bg-primary/90 transition-all"
                      >
                        Ver Mieles Disponibles
                      </button>
                    </div>
                  ) : (
                    items.map((item) => {
                      const isPropoleo =
                        item.name.toLowerCase().includes('propóleo') ||
                        item.name.toLowerCase().includes('propoleo');

                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 rounded-2xl bg-muted/60 border border-border/60 hover:border-border transition-all"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-background shrink-0 border border-border flex items-center justify-center p-1">
                            <AppImage
                              src={item.image}
                              alt={item.name}
                              className={`w-full h-full object-contain ${
                                isPropoleo ? 'scale-120' : 'scale-105'
                              }`}
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-display font-semibold text-sm text-foreground line-clamp-1">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-muted-foreground font-medium">
                                  {item.weight}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-rose-600 transition-colors p-1"
                                title="Eliminar producto"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                              <div className="flex items-center border border-border rounded-lg bg-background p-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-foreground hover:bg-muted"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="w-7 text-center text-xs font-bold text-foreground">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-foreground hover:bg-muted"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <span className="font-display font-bold text-sm text-primary">
                                ${(item.price * item.quantity).toLocaleString('en-US')} USD
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Drawer Footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-border bg-background space-y-4 shadow-lg">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${totalPrice.toLocaleString('en-US')} USD</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Envío a domicilio</span>
                        <span className="text-emerald-600 font-medium">Calculado por WhatsApp</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary text-xl">
                          ${totalPrice.toLocaleString('en-US')} USD
                        </span>
                      </div>

                      {/* Nota aclaratoria de Tasa Oficial BCV */}
                      <div className="mt-3 p-3 rounded-xl bg-amber-500/10 dark:bg-stone-900/60 border border-amber-500/20 text-amber-950 dark:text-stone-300 text-xs leading-relaxed flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p>
                          Para pagos en Bolívares (Pago Móvil / Transferencia), el monto exacto se
                          calcula a la{' '}
                          <strong>
                            tasa oficial del Banco Central de Venezuela (BCV) vigente a la tasa del
                            día
                          </strong>
                          .
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handleCheckout}
                        className="whatsapp-btn w-full font-semibold shadow-lg text-sm py-3"
                      >
                        <Image
                          src="/assets/images/whatsapp_logo.svg"
                          alt="WhatsApp"
                          width={20}
                          height={20}
                          className="w-5 h-5 shrink-0"
                        />
                        <span>Pedir por WhatsApp</span>
                        <ArrowRight size={16} />
                      </button>

                      <button
                        onClick={clearCart}
                        className="w-full text-xs text-muted-foreground hover:text-rose-600 transition-colors py-1 text-center"
                      >
                        Vaciar Carrito
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
