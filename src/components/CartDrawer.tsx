'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useCartStore,
  selectSubtotal,
  selectIsFreeDelivery,
  selectDeliveryFee,
  selectTotal,
  DEFAULT_DELIVERY_FEE,
} from '@/store/cartStore';
import AppImage from '@/components/ui/AppImage';
import FreeDeliveryProgress from '@/components/FreeDeliveryProgress';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();

  const subtotal = useCartStore(selectSubtotal);
  const isFreeDelivery = useCartStore(selectIsFreeDelivery);
  const deliveryFee = useCartStore(selectDeliveryFee);
  const total = useCartStore(selectTotal);

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

            {/* Drawer Panel: Ocupa ancho completo en celulares (pl-0) y max-w-md con pl-10 en tablets/desktop */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full sm:w-screen sm:max-w-md bg-background shadow-2xl flex flex-col justify-between border-l border-border h-full max-h-[100dvh]"
              >
                {/* Drawer Header */}
                <div className="p-3.5 sm:p-6 border-b border-border flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 text-amber-700">
                      <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight">
                        Tu Carrito
                      </h2>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">
                        {items.length} {items.length === 1 ? 'producto' : 'productos'} en total
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCart}
                    aria-label="Cerrar carrito"
                    className="p-1.5 sm:p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>

                {/* Free Delivery Incentive Bar */}
                {items.length > 0 && (
                  <div className="px-3 py-2 sm:px-6 sm:pt-4 sm:pb-2 border-b border-border/50 bg-muted/20 shrink-0">
                    <FreeDeliveryProgress compact />
                  </div>
                )}

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-2.5 sm:space-y-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 py-8 sm:py-12 px-2">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary/80 flex items-center justify-center text-amber-600">
                        <ShoppingBag size={28} className="sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-base sm:text-lg text-foreground">
                          Tu carrito está vacío
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                          Explora nuestras mieles artesanales puras y agrega tus favoritas.
                        </p>
                      </div>
                      <button
                        onClick={closeCart}
                        className="bg-primary text-primary-foreground text-xs sm:text-sm font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-amber hover:bg-primary/90 transition-all"
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
                          className="flex gap-2.5 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-muted/60 border border-border/60 hover:border-border transition-all"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-background shrink-0 border border-border flex items-center justify-center p-1">
                            <AppImage
                              src={item.image}
                              alt={item.name}
                              className={`w-full h-full object-contain ${
                                isPropoleo ? 'scale-120' : 'scale-105'
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-1">
                              <div className="min-w-0 flex-1">
                                <h4 className="font-display font-semibold text-xs sm:text-sm text-foreground truncate">
                                  {item.name}
                                </h4>
                                <p className="text-[11px] text-muted-foreground font-medium">
                                  {item.weight}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-rose-600 transition-colors p-1 shrink-0"
                                title="Eliminar producto"
                                aria-label={`Eliminar ${item.name}`}
                              >
                                <Trash2 size={14} className="sm:w-[15px] sm:h-[15px]" />
                              </button>
                            </div>

                            <div className="flex justify-between items-center pt-1.5 sm:pt-2 gap-2">
                              <div className="flex items-center border border-border rounded-lg bg-background p-0.5 shrink-0">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label="Disminuir cantidad"
                                  className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-foreground hover:bg-muted"
                                >
                                  <Minus size={11} className="sm:w-3 sm:h-3" />
                                </button>
                                <span className="w-6 sm:w-7 text-center text-xs font-bold text-foreground">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Aumentar cantidad"
                                  className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-foreground hover:bg-muted"
                                >
                                  <Plus size={11} className="sm:w-3 sm:h-3" />
                                </button>
                              </div>

                              <span className="font-display font-bold text-xs sm:text-sm text-primary whitespace-nowrap">
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
                  <div className="p-3.5 sm:p-6 border-t border-border bg-background space-y-3 sm:space-y-4 shadow-lg shrink-0">
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtotal productos</span>
                        <span>
                          $
                          {subtotal.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          USD
                        </span>
                      </div>
                      <div className="flex justify-between text-xs items-center">
                        <span className="text-muted-foreground">Envío (Caracas)</span>
                        {isFreeDelivery ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={13} strokeWidth={2.5} />
                            ¡GRATIS!
                          </span>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Coordinado por WhatsApp
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm sm:text-base font-bold text-foreground pt-1.5 sm:pt-2 border-t border-border">
                        <span>Total estimado</span>
                        <span className="text-primary text-lg sm:text-xl font-black">
                          $
                          {total.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          USD
                        </span>
                      </div>

                      {/* Nota aclaratoria de Tasa Oficial BCV */}
                      <div className="mt-2 sm:mt-3 p-2 sm:p-3 rounded-xl bg-amber-500/10 dark:bg-stone-900/60 border border-amber-500/20 text-amber-950 dark:text-stone-300 text-[10px] sm:text-xs leading-relaxed flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
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
                          Pagos en Bs. calculados a la{' '}
                          <strong>tasa oficial BCV vigente del día</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <button
                        onClick={handleCheckout}
                        className="whatsapp-btn w-full font-bold shadow-lg text-xs sm:text-sm py-2.5 sm:py-3 inline-flex items-center justify-center gap-2"
                      >
                        <Image
                          src="/assets/images/whatsapp_logo.svg"
                          alt="WhatsApp"
                          width={18}
                          height={18}
                          className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                        />
                        <span>Finalizar Pedido</span>
                        <ArrowRight size={15} className="sm:w-4 sm:h-4" />
                      </button>

                      <button
                        onClick={clearCart}
                        className="w-full text-[11px] sm:text-xs text-muted-foreground hover:text-rose-600 transition-colors py-1 text-center"
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
