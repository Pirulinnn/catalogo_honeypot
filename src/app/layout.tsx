import React from 'react';
import type { Metadata, Viewport } from 'next';
import JsonLd from '@/components/JsonLd';
import '../styles/tailwind.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.honeypot.ve';
const OG_IMAGE_URL = '/assets/images/og_honeypot.jpg';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d97706',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Honey Pot | Miel 100% Pura y Artesanal en Venezuela',
    template: '%s | Honey Pot',
  },
  description:
    'Miel cruda y artesanal cosechada en Guanare, Portuguesa. Envíos directos en Caracas y a nivel nacional. Paga en Bs. a tasa oficial BCV del día o en divisas.',
  keywords: [
    'miel pura venezuela',
    'miel artesanal caracas',
    'miel cruda caracas',
    'comprar miel bcv',
    'honey pot venezuela',
    'miel de abeja natural',
    'miel guanare portuguesa',
    'miel pura caracas',
  ],
  authors: [{ name: 'Honey Pot' }],
  creator: 'Honey Pot',
  publisher: 'Honey Pot',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Honey Pot | Miel 100% Pura y Artesanal en Venezuela',
    description:
      'Descubre el néctar dorado de Venezuela. Miel cruda de Guanare directo a tu mesa en Caracas y todo el país.',
    url: SITE_URL,
    siteName: 'Honey Pot Venezuela',
    locale: 'es_VE',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Honey Pot - Miel Artesanal Venezolana',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honey Pot | Miel 100% Pura y Artesanal',
    description: 'Miel cruda cosechada en Portuguesa con envíos en Caracas y toda Venezuela.',
    images: [OG_IMAGE_URL],
  },
  icons: {
    icon: [{ url: '/assets/images/logo.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/assets/images/app_logo.png' }],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'geo.region': 'VE-A',
    'geo.placename': 'Caracas, Venezuela',
    'geo.position': '10.4806;-66.9036',
    ICBM: '10.4806, -66.9036',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <JsonLd />
        {children}

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fhoneypot1835back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
