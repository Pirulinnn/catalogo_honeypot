'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Droplets, Sparkles, CheckCircle2, Award } from 'lucide-react';
import HoneyDripDivider from '@/components/HoneyDripDivider';

// ─── Assets Configurables ───
const HONEY_DETAIL_IMAGE = '/assets/images/miel_foto.jpg'; // Imagen existente del tarro/cuchara

export default function SobreNosotros() {
  return (
    <section
      id="nosotros"
      className="relative z-10 w-full py-16 sm:py-24 px-4 sm:px-8 bg-amber-50/40 text-stone-900 overflow-hidden"
    >
      {/* Divisor superior de Miel fluido para transición perfecta con el Hero */}
      <HoneyDripDivider className="absolute top-0 left-0 w-full -translate-y-[1px] z-20" />

      {/* Ambientación y resplandor sutil de fondo */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto pt-6 sm:pt-8">
        {/* ─── Grid Principal Responsivo (Mobile: Columna única fluida / Desktop: 12 columnas) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 lg:items-center">
          {/* ─── Columna Izquierda (Desktop: 5 columnas / Mobile: Visual Hero Compacto) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              {/* Marco Decorativo y Contenedor de la Imagen */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden border border-amber-200/80 bg-amber-100 shadow-2xl shadow-amber-900/10">
                <Image
                  src={HONEY_DETAIL_IMAGE}
                  alt="Miel 100% pura y artesanal Honey Pot cosechada en Guanare Portuguesa Venezuela"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradiente protector para el badge flotante */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

                {/* Badge Flotante: "Hecho en Venezuela" */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 bg-stone-900/85 backdrop-blur-md text-stone-100 p-3 sm:p-3.5 rounded-2xl border border-amber-500/30 shadow-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
                        Hecho en Venezuela
                      </p>
                      <p className="text-[10px] sm:text-xs text-stone-300">
                        Cosecha pura en Portuguesa
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/20 text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    100% Pura
                  </span>
                </div>
              </div>

              {/* Detalle flotante decorativo tras la imagen */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/10 to-amber-300/20 rounded-3xl -z-10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* ─── Columna Derecha (Desktop: 7 columnas / Mobile: Narrativa y Badges) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* 1. Badge Superior de Origen */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold tracking-wide uppercase mb-4 self-start shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Origen &amp; Tradición</span>
            </div>

            {/* 2. Título de Impacto Editorial */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight mb-4 tracking-tight">
              El Néctar Dorado de Venezuela | Miel Pura de Guanare
            </h2>

            {/* 3. Bloque de Origen (Párrafo 1 con palabras clave resaltadas) */}
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              <strong className="font-semibold text-stone-900">Honey Pot</strong>, el néctar dorado
              de <strong className="font-semibold text-stone-900">Venezuela</strong>, tiene sus
              raíces en{' '}
              <span className="font-semibold text-amber-950 bg-amber-200/50 px-1.5 py-0.5 rounded-md border border-amber-300/50">
                Guanare, Suruguapo Estado Portuguesa
              </span>
              .
            </p>

            {/* 4. Grid de 2 Micro-Tarjetas (Badges visuales sin fotos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {/* Tarjeta A: Guanare, Suruguapo */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200/70 shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 text-sm leading-tight">
                    Guanare, Suruguapo
                  </p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">Portuguesa, VE</p>
                </div>
              </div>

              {/* Tarjeta B: 100% Auténtica */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200/70 shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-700 shrink-0">
                  <Droplets className="w-5 h-5 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 text-sm leading-tight">
                    100% Auténtica
                  </p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    Sin procesos industriales
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Cita / Cierre (Párrafos 2 y 3) */}
            <div className="border-l-2 border-amber-500 pl-4 my-2 py-2 pr-3 bg-amber-500/5 rounded-r-2xl space-y-2">
              <p className="italic text-stone-800 text-sm sm:text-[15px] leading-relaxed">
                &ldquo;Nuestra miel captura la esencia única de esta región, donde la riqueza de la
                naturaleza se destila en cada gota.&rdquo;
              </p>
              <p className="text-stone-700 text-xs sm:text-sm font-medium leading-relaxed">
                Descubre la auténtica dulzura de{' '}
                <span className="font-semibold text-stone-900">Honey Pot</span>, una marca que
                refleja el verdadero sabor venezolano.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
