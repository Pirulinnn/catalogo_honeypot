'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/products' },
    { name: 'Sobre Nosotros', href: '/#nosotros' },
    { name: 'Beneficios', href: '/#beneficios' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('#')[0]) || pathname === href;
  };

  return (
    <>
      {/* Espaciador para evitar solapamiento tras el header fijo (solo en páginas secundarias) */}
      {pathname !== '/' && (
        <div className={`transition-all duration-300 ${scrolled ? 'h-20' : 'h-24'}`} />
      )}

      <header
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6"
        style={{ paddingTop: scrolled ? '0.6rem' : '1.2rem' }}
      >
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`
                        max-w-5xl mx-auto
                        transition-all duration-500 ease-out
                        ${scrolled ? 'rounded-2xl' : 'rounded-3xl'}
                        border border-amber-600/40
                        overflow-hidden
                    `}
          style={{
            backgroundImage: `url('/assets/images/wood_texture.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#381402', // Fallback rico a caoba oscuro
            boxShadow: scrolled
              ? '0 10px 40px rgba(45, 15, 2, 0.65), 0 2px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,230,180,0.15)'
              : '0 16px 50px rgba(45, 15, 2, 0.55), 0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,230,180,0.2)',
          }}
        >
          {/* Filtro amaderado cálido */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)',
            }}
          />

          {/* Biselado interior brillante */}
          <div
            className="absolute inset-0 pointer-events-none rounded-inherit"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(255,230,170,0.2), inset 0 -1px 3px rgba(0,0,0,0.4)',
            }}
          />

          {/* Contenido Principal de la Isla */}
          <div
            className={`
                            relative z-10
                            flex items-center justify-between gap-4
                            transition-all duration-300
                            ${scrolled ? 'px-4 sm:px-6 py-2.5' : 'px-5 sm:px-8 py-3.5'}
                        `}
          >
            {/* ─── Izquierda: Logo ─── */}
            <Link href="/" className="inline-flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-amber-950 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.6)] transition-all duration-300 overflow-hidden p-1">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Honey Pot - Miel 100% Pura Logo"
                  fill
                  className="object-contain p-1 drop-shadow-sm"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-extrabold tracking-tight text-white group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">
                  Honey pot
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-amber-300/90 drop-shadow-sm mt-0.5">
                  Miel Pura
                </span>
              </div>
            </Link>

            {/* ─── Centro: Navegación Principal (Desktop) ─── */}
            <nav className="hidden md:flex items-center gap-1.5 bg-amber-950/60 p-1.5 rounded-2xl border border-amber-600/30 backdrop-blur-sm shadow-inner">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                                            relative px-4 py-2 rounded-xl text-sm font-bold
                                            transition-all duration-300 ease-out
                                            ${
                                              active
                                                ? 'text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md shadow-amber-500/30 scale-[1.02]'
                                                : 'text-amber-100 hover:text-white hover:bg-amber-800/60 hover:scale-105 active:scale-95'
                                            }
                                        `}
                  >
                    <span className="relative z-10 drop-shadow-xs">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ─── Derecha: Acciones (Carrito + Botón CTA) ─── */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {/* Botón Carrito */}
              <button
                onClick={openCart}
                className="
                                    relative p-2.5 rounded-xl
                                    bg-gradient-to-br from-amber-900/80 to-amber-950/90
                                    hover:from-amber-800 hover:to-amber-900
                                    text-amber-200 hover:text-white
                                    border border-amber-500/40 hover:border-amber-300
                                    shadow-md shadow-amber-950/60
                                    hover:shadow-[0_0_16px_rgba(245,158,11,0.35)]
                                    hover:scale-105 active:scale-95
                                    transition-all duration-300 cursor-pointer
                                "
                aria-label="Abrir carrito"
              >
                <ShoppingBag size={20} className="drop-shadow-sm" />
                {isMounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="
                                            absolute -top-1.5 -right-1.5
                                            bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500
                                            text-amber-950 text-[11px] font-black
                                            w-5 h-5 rounded-full
                                            flex items-center justify-center
                                            shadow-lg shadow-amber-500/50
                                            ring-2 ring-amber-950
                                        "
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Botón Menú Móvil */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="
                                    md:hidden p-2.5 rounded-xl
                                    bg-amber-900/60 hover:bg-amber-800/80
                                    text-amber-100 hover:text-white
                                    border border-amber-500/30 hover:border-amber-400
                                    hover:scale-105 active:scale-95
                                    transition-all duration-200 cursor-pointer
                                "
                aria-label="Menú principal"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ─── Menú Desplegable Móvil ─── */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden relative z-10"
              >
                <div className="border-t border-amber-600/30 px-4 pt-3 pb-5 space-y-2 bg-amber-950/50 backdrop-blur-md">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                                                        flex items-center justify-between
                                                        px-4 py-3 rounded-xl
                                                        text-base font-bold
                                                        transition-all duration-200
                                                        ${
                                                          active
                                                            ? 'text-amber-950 bg-gradient-to-r from-amber-300 to-amber-500 shadow-md'
                                                            : 'text-amber-100 hover:text-white hover:bg-amber-800/50 border border-transparent hover:border-amber-500/30'
                                                        }
                                                    `}
                        >
                          <span>{link.name}</span>
                          <ChevronRight
                            size={18}
                            className={active ? 'text-amber-950' : 'text-amber-400/60'}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}
