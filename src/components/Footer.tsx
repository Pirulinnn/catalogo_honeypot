'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Mail, ExternalLink } from 'lucide-react';

/* ─── Constants ─── */
const FOOTER_BG_IMAGE = '/assets/images/footer_image.jpg';
const LOGO_SRC = '/assets/images/logo.svg';
const STORE_NAME_SRC = '/assets/images/name_store.png';
const WHATSAPP_NUMBER = '+584127665595';
const INSTAGRAM_LINK = 'https://www.instagram.com/honeypot.ve';
const TIKTOK_LINK = 'https://www.tiktok.com/@honeypot.ve';
const CONTACT_EMAIL = 'honeypot.ve@gmail.com';
const COMPANY_NAME = 'Agropecuaria Honey Pot C.A';
const COMPANY_RIF = 'J-508633660';

/* ─── Navigation links ─── */
const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/products' },
  { label: 'Sobre Nosotros', href: '/#nosotros' },
  { label: 'Beneficios', href: '/#beneficios' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

/* ─── Social links ─── */
const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: INSTAGRAM_LINK,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: TIKTOK_LINK,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: <Mail className="w-4 h-4" />,
  },
] as const;

/* ─── Honey Drip SVG Divider ─── */
function HoneyDripDivider() {
  return (
    <div
      className="w-full overflow-hidden leading-none relative z-10 -mb-[1px] pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-10 sm:h-16 md:h-20 block"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wavy base */}
        <path
          d="M0,40 C100,80 200,10 300,50 C400,90 500,20 600,60 C700,100 800,30 900,55 C1000,80 1100,35 1200,50 L1200,120 L0,120 Z"
          className="fill-stone-950"
        />
        {/* Honey drip drops */}
        <ellipse cx="150" cy="52" rx="12" ry="18" className="fill-stone-950" />
        <ellipse cx="420" cy="60" rx="10" ry="22" className="fill-stone-950" />
        <ellipse cx="680" cy="55" rx="14" ry="25" className="fill-stone-950" />
        <ellipse cx="950" cy="48" rx="11" ry="20" className="fill-stone-950" />
        {/* Smaller drips for organic feel */}
        <ellipse cx="80" cy="46" rx="6" ry="10" className="fill-stone-950" />
        <ellipse cx="280" cy="38" rx="7" ry="12" className="fill-stone-950" />
        <ellipse cx="550" cy="42" rx="8" ry="14" className="fill-stone-950" />
        <ellipse cx="820" cy="35" rx="6" ry="11" className="fill-stone-950" />
        <ellipse cx="1080" cy="44" rx="9" ry="15" className="fill-stone-950" />
      </svg>
    </div>
  );
}

/* ─── Footer Component ─── */
export default function Footer() {
  return (
    <div className="relative w-full">
      {/* Honey Drip Divider — conexión fluida sin bordes ni líneas */}
      <HoneyDripDivider />

      <footer className="relative overflow-hidden bg-stone-950 text-stone-200">
        {/* Background Image Layer — Nítida, sin efecto borroso */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0 pointer-events-none"
          style={{ backgroundImage: `url('${FOOTER_BG_IMAGE}')` }}
        />

        {/* Gradiente Superior de Fusión — Mismo color del SVG (stone-950) para eliminar cualquier línea divisoria */}
        <div className="absolute inset-x-0 top-0 h-44 sm:h-64 bg-gradient-to-b from-stone-950 via-stone-950/80 to-transparent z-[1] pointer-events-none" />

        {/* Gradiente Inferior y Sombra para Legibilidad */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-stone-950/40 z-[1] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* ── Col 1: Brand & Identity ── */}
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3.5 group">
                {/* Isotipo Logo */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center p-1.5 shadow-md shadow-amber-500/25 group-hover:scale-105 group-hover:shadow-amber-500/40 transition-all duration-300 shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={LOGO_SRC}
                      alt="Honey Pot - Miel 100% Pura de Abeja Logo"
                      fill
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Nombre de la Tienda (Prominente y de mayor tamaño) */}
                <div className="relative h-12 sm:h-14 md:h-16 w-48 sm:w-60 md:w-72 flex items-center">
                  <Image
                    src={STORE_NAME_SRC}
                    alt="Honey Pot Venezuela - Miel Artesanal Pura"
                    fill
                    className="object-contain object-left brightness-110 group-hover:brightness-125 transition-all duration-300"
                  />
                </div>
              </Link>

              {/* Razón Social */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs font-medium">
                <span>{COMPANY_NAME}</span>
              </div>

              <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
                Miel 100% pura y artesanal cosechada en Guanare, Portuguesa. Envíos y entregas en Caracas y toda Venezuela.
              </p>

              {/* Location & Fiscal info */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <MapPin size={13} className="text-amber-400" />
                  </div>
                  <span>Guanare, Portuguesa • Caracas, VE</span>
                </div>
                <span className="text-stone-700">•</span>
                <span className="font-mono text-stone-300 bg-stone-900/90 border border-stone-800/90 px-2 py-0.5 rounded text-[11px]">
                  RIF: {COMPANY_RIF}
                </span>
              </div>
            </div>

            {/* ── Col 2: Quick Navigation ── */}
            <div>
              <h4 className="font-display font-bold text-stone-100 text-sm uppercase tracking-wider mb-5">
                Secciones
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Social & Contact ── */}
            <div>
              <h4 className="font-display font-bold text-stone-100 text-sm uppercase tracking-wider mb-5">
                Conéctate con nosotros
              </h4>
              <p className="text-sm text-stone-400 mb-5 leading-relaxed">
                Síguenos en nuestras redes para recetas, tips y promociones exclusivas.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="
                                            group relative inline-flex items-center gap-2 px-4 py-2.5
                                            rounded-full text-xs font-semibold
                                            bg-amber-500/10 border border-amber-500/30 text-stone-300
                                            hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500
                                            hover:shadow-lg hover:shadow-amber-500/20
                                            transition-all duration-300
                                        "
                  >
                    {social.icon}
                    <span>{social.label}</span>
                    <ExternalLink
                      size={10}
                      className="opacity-0 group-hover:opacity-60 transition-opacity"
                    />
                  </a>
                ))}
              </div>

              {/* Email callout */}
              <div className="mt-5 text-xs text-stone-500">
                <span className="text-stone-400 font-medium">Correo:</span>{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-amber-500/80 hover:text-amber-400 underline underline-offset-2 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* ── Legal Bar ── */}
          <div className="border-t border-stone-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
              <p className="flex items-center gap-1.5">
                © {new Date().getFullYear()}{' '}
                <span className="text-stone-300 font-medium">{COMPANY_NAME}</span>. Todos los
                derechos reservados.
                <Heart size={12} className="text-rose-500/70 fill-rose-500/70 shrink-0" />
              </p>
              <span className="hidden sm:inline text-stone-700">•</span>
              <span className="font-mono text-stone-400">RIF: {COMPANY_RIF}</span>
            </div>
            <p className="text-stone-500 text-[11px]">Miel 100% pura • Hecho en Venezuela</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
