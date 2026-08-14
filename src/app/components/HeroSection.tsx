'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, Droplets, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
    // Variantes de animación escalonada con Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
        },
    };

    return (
        <section className="relative w-full min-h-[100dvh] -mt-24 pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-16 lg:pb-24 overflow-hidden flex items-center justify-center">
            {/* ─── 1. Fondo Principal Limpio (Top Bleed 100% Cobertura) ─── */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                    src="/assets/images/background_hero.jpg"
                    alt="Fondo apicultura artesanal Honeypot"
                    fill
                    priority
                    className="object-cover object-center scale-105"
                />
            </div>

            {/* ─── Contenedor Principal de Contenido ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

                    {/* ─── Columna Izquierda: Texto y Call to Action ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6 text-left"
                    >
                        {/* Badge Orgánico */}
                        <motion.div variants={itemVariants} className="inline-block">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-950/70 border border-amber-500/40 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs lg:text-sm font-bold text-amber-200 shadow-xl shadow-amber-950/50">
                                <Sparkles size={14} className="text-amber-400 animate-pulse flex-shrink-0" />
                                <span>COSECHA ARTESANAL 2026 — 100% ORGÁNICA</span>
                            </div>
                        </motion.div>

                        {/* Título Principal */}
                        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
                            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#FFFBEC] tracking-tight uppercase leading-[0.95] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                                HONEYPOT
                            </h1>
                            <p className="font-display text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold text-amber-300 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
                                El sabor real de la naturaleza pura
                            </p>
                        </motion.div>

                        {/* Subtítulo / Frase Motivadora */}
                        <motion.p
                            variants={itemVariants}
                            className="text-sm sm:text-lg lg:text-xl text-amber-50 max-w-2xl leading-relaxed font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
                        >
                            Miel 100% pura y artesanal, recolectada sin procesos industriales. Descubre el verdadero sabor de la colmena a tu mesa en cada gota.
                        </motion.p>

                        {/* Botones Call to Action (CTA) */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 sm:items-center"
                        >
                            {/* Botón 1: Ver productos */}
                            <Link
                                href="/products"
                                className="
                                    inline-flex items-center justify-center gap-2.5
                                    bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
                                    hover:from-amber-300 hover:via-amber-400 hover:to-amber-500
                                    text-amber-950 font-extrabold text-base sm:text-lg
                                    px-7 py-3.5 sm:px-8 sm:py-4 rounded-full
                                    shadow-2xl shadow-amber-950/60
                                    hover:shadow-[0_0_30px_rgba(245,158,11,0.7)]
                                    hover:scale-105 active:scale-95
                                    transition-all duration-300
                                    border border-amber-300/80
                                "
                            >
                                <span>Ver productos</span>
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>

                            {/* Botón 2: Sobre nosotros */}
                            <Link
                                href="/#nosotros"
                                className="
                                    inline-flex items-center justify-center gap-2
                                    border-2 border-amber-300/90
                                    bg-amber-950/40 hover:bg-amber-950/60
                                    text-amber-50 hover:text-white font-bold text-base sm:text-lg
                                    px-7 py-3.5 sm:px-8 sm:py-4 rounded-full
                                    backdrop-blur-md
                                    hover:border-amber-200
                                    hover:scale-105 active:scale-95
                                    transition-all duration-300
                                    shadow-xl shadow-black/50
                                "
                            >
                                <span>Sobre nosotros</span>
                            </Link>
                        </motion.div>

                        {/* Distintivos de Calidad / Badges */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-amber-400/40 max-w-lg"
                        >
                            <div className="flex items-center gap-2">
                                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md flex-shrink-0">
                                    <ShieldCheck size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] sm:text-xs font-bold text-amber-50 drop-shadow">100% Pura</p>
                                    <p className="text-[9px] sm:text-[10px] text-amber-200/90 font-medium drop-shadow">Sin conservadores</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md flex-shrink-0">
                                    <Droplets size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] sm:text-xs font-bold text-amber-50 drop-shadow">En Frío</p>
                                    <p className="text-[9px] sm:text-[10px] text-amber-200/90 font-medium drop-shadow">Conserva enzimas</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md flex-shrink-0">
                                    <Award size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] sm:text-xs font-bold text-amber-50 drop-shadow">Ética</p>
                                    <p className="text-[9px] sm:text-[10px] text-amber-200/90 font-medium drop-shadow">Sostenible</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ─── Columna Derecha: Foto del Producto (Impacto Gigante en Móvil y Escritorio) ─── */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center mt-10 mb-6 lg:my-0"
                    >
                        <div className="relative w-full max-w-[420px] xs:max-w-[480px] sm:max-w-[560px] lg:max-w-none mx-auto flex items-center justify-center">
                            {/* Halo / Resplandor dorado gigante de fondo */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 lg:w-[36rem] lg:h-[36rem] xl:w-[42rem] xl:h-[42rem] rounded-full bg-gradient-to-tr from-amber-400/40 via-amber-300/30 to-transparent blur-2xl sm:blur-3xl pointer-events-none animate-pulse" />

                            {/* Imagen PNG Transparente Elevada y de Tamaño Gigante */}
                            <div className="relative w-full h-auto flex items-center justify-center">
                                <Image
                                    src="/assets/images/image_hero.png"
                                    alt="Miel Artesanal Honeypot Frascos"
                                    width={1000}
                                    height={1000}
                                    priority
                                    className="
                                        object-contain h-auto
                                        max-h-[480px] xs:max-h-[540px] sm:max-h-[620px] lg:max-h-[780px] xl:max-h-[900px]
                                        w-auto
                                        scale-125 xs:scale-130 sm:scale-135 lg:scale-150 xl:scale-165
                                        lg:translate-x-4 xl:translate-x-8
                                        transform-gpu
                                        drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]
                                        hover:scale-135 lg:hover:scale-160 xl:hover:scale-175
                                        transition-transform duration-500 ease-out
                                    "
                                />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
