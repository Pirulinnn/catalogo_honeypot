'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, Sparkles } from 'lucide-react';
import {
  useCartStore,
  selectSubtotal,
  selectIsFreeDelivery,
  selectAmountForFreeDelivery,
  FREE_DELIVERY_THRESHOLD,
} from '@/store/cartStore';

interface FreeDeliveryProgressProps {
  className?: string;
  compact?: boolean;
}

export default function FreeDeliveryProgress({
  className = '',
  compact = false,
}: FreeDeliveryProgressProps) {
  const [mounted, setMounted] = useState(false);

  const rawSubtotal = useCartStore(selectSubtotal);
  const rawIsFreeDelivery = useCartStore(selectIsFreeDelivery);
  const rawAmountForFreeDelivery = useCartStore(selectAmountForFreeDelivery);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Si aún no está montado en cliente, usamos estado seguro sin provocar layout shift ni parpadeo
  const subtotal = mounted ? rawSubtotal : 0;
  const isFreeDelivery = mounted ? rawIsFreeDelivery : false;
  const amountForFreeDelivery = mounted ? rawAmountForFreeDelivery : FREE_DELIVERY_THRESHOLD;

  const percentage = Math.min(100, Math.max(0, (subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div
      className={`w-full rounded-2xl border transition-all duration-300 ${
        isFreeDelivery
          ? 'bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-900/30 border-emerald-300 dark:border-emerald-700/50 shadow-sm'
          : 'bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-orange-50/60 dark:from-amber-950/40 dark:via-amber-900/20 dark:to-stone-900/40 border-amber-200/80 dark:border-amber-800/40 shadow-sm'
      } ${compact ? 'p-2.5 sm:p-3' : 'p-3 sm:p-4'} ${className}`}
    >
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isFreeDelivery
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                : 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            }`}
          >
            {isFreeDelivery ? (
              <CheckCircle2 size={14} strokeWidth={2.5} className="animate-bounce" />
            ) : (
              <Truck size={14} strokeWidth={2.2} />
            )}
          </div>

          <div className="text-[11px] sm:text-xs font-medium leading-snug">
            {isFreeDelivery ? (
              <span className="text-emerald-900 dark:text-emerald-200 font-bold flex items-center gap-1">
                <span>¡Tienes</span>
                <span className="text-emerald-700 dark:text-emerald-300 underline decoration-emerald-400">
                  Delivery GRATIS
                </span>
                <span>! 🎉</span>
              </span>
            ) : subtotal === 0 ? (
              <span className="text-stone-800 dark:text-stone-200">
                Delivery <strong className="text-amber-600 dark:text-amber-400 font-bold">GRATIS</strong> en Caracas por compras desde{' '}
                <strong className="text-amber-700 dark:text-amber-400 font-bold">
                  ${FREE_DELIVERY_THRESHOLD.toFixed(0)}
                </strong>{' '}
                🍯
              </span>
            ) : (
              <span className="text-stone-800 dark:text-stone-200">
                Faltan{' '}
                <strong className="text-amber-700 dark:text-amber-400 font-bold">
                  ${amountForFreeDelivery.toFixed(2)}
                </strong>{' '}
                para{' '}
                <strong className="text-amber-600 dark:text-amber-400 font-bold">
                  Delivery Gratis
                </strong>{' '}
                🍯
              </span>
            )}
          </div>
        </div>

        {/* Badge porcentaje o estado conciso */}
        <div className="shrink-0">
          <span
            className={`text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border ${
              isFreeDelivery
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700'
                : 'bg-amber-100 text-amber-900 border-amber-300/80 dark:bg-amber-900/60 dark:text-amber-200 dark:border-amber-700'
            }`}
          >
            {isFreeDelivery ? '¡Listo!' : subtotal === 0 ? '$20 USD' : `${Math.round(percentage)}%`}
          </span>
        </div>
      </div>

      {/* Barra de progreso animada */}
      <div className="w-full bg-stone-200/80 dark:bg-stone-800 rounded-full h-2 sm:h-2.5 overflow-hidden p-0.5 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full relative ${
            isFreeDelivery
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600'
          }`}
        >
          <div className="absolute inset-0 bg-white/25 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
