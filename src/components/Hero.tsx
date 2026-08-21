'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Variables y Rutas de Assets
const HERO_BG_IMAGE = '/assets/images/background_hero.jpg'; // Foto real de los productos (fondo)
const PRODUCT_IMAGE = '/assets/images/image_bottle_honey.jpg'; // Foto nítida del frasco
const TITLE_IMAGE = '/assets/images/name_store.png'; // Nombre de la tienda estilizado sin fondo

export default function Hero() {
    const handleScrollToCatalog = () => {
        const catalogElement = document.getElementById('catalogo');
        if (catalogElement) {
            catalogElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/#catalogo';
        }
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-visible bg-stone-950 pt-28 pb-16 px-3 sm:px-6">
            {/* ─── 1. Capa Aislada para Imagen de Fondo Desenfocada ─── */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                <Image
                    src={HERO_BG_IMAGE}
                    alt="Fondo Natural Honeypot"
                    fill
                    priority
                    className="object-cover object-center filter blur-md scale-105 opacity-55 z-0"
                />

                {/* Capa de fusión inferior con el SVG de la siguiente sección (#d97706 amber-600) */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 md:h-44 bg-gradient-to-t from-[#d97706] via-[#d97706]/70 to-transparent z-[1] pointer-events-none"
                />
            </div>

            {/* ─── 2. Tarjeta Contenedora Principal (p-0 en móvil para toque extremo a extremo) ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-5xl rounded-[32px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-stone-900/30 backdrop-blur-sm p-0 sm:p-6 md:p-8 shadow-2xl"
            >
                {/* ─── Estructura y Distribución (Desktop & Mobile) ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
                    {/* Lado Izquierdo / Superior: Foto de la Botella (Ancho Completo Superior) */}
                    <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-full sm:min-h-[460px] rounded-t-[32px] sm:rounded-2xl overflow-hidden bg-[#e5a823] shadow-inner">
                        <Image
                            src={PRODUCT_IMAGE}
                            alt="Frasco de Miel Pura Honeypot"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Lado Derecho / Inferior: Panel de Texto Translúcido (Inset + Overlap en Móvil) */}
                    <div className="relative z-20 -mt-20 sm:mt-0 w-[92%] sm:w-full mx-auto mb-4 sm:mb-0 rounded-3xl sm:rounded-2xl bg-stone-950/70 backdrop-blur-md border border-white/10 p-5 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center gap-4 sm:gap-6 shadow-[0_-12px_35px_rgba(0,0,0,0.5)]">
                        {/* Logo / Título Estilizado Expansivo y Fluido */}
                        <div className="relative w-full max-w-[92%] sm:max-w-[95%] h-24 sm:h-32 md:h-36 mx-auto flex items-center justify-center my-1">
                            <Image
                                src={TITLE_IMAGE}
                                alt="HONEYPOT"
                                fill
                                priority
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                                className="object-contain drop-shadow-md select-none"
                            />
                        </div>

                        {/* Lema Oficial */}
                        <p className="text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-xs sm:max-w-sm mx-auto">
                            Miel 100% pura y artesanal, recolectada sin procesos industriales. Descubre el verdadero sabor de la colmena a tu mesa en cada gota.
                        </p>

                        {/* Botón CTA ("Ver productos") */}
                        <button
                            type="button"
                            onClick={handleScrollToCatalog}
                            className="bg-stone-950/90 hover:bg-amber-500 text-stone-100 hover:text-stone-950 border border-amber-500/40 rounded-full py-3 sm:py-3.5 px-8 sm:px-10 font-semibold text-sm transition-all duration-300 shadow-lg w-full sm:w-fit cursor-pointer mx-auto flex items-center justify-center gap-2"
                        >
                            <span>Ver productos</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
