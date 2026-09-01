import React from 'react';
import type { Metadata, Viewport } from 'next';
import JsonLd from '@/components/JsonLd';
import '../styles/tailwind.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://honeypotve.com';
const OG_IMAGE_URL = '/assets/images/og_honeypot.jpg';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d97706',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Honey Pot | Miel 100% Pura y Artesanal en Caracas y Venezuela',
    template: '%s | Honey Pot',
  },
  description:
    'Miel cruda 100% pura y artesanal cosechada en Guanare, Portuguesa. Envíos y delivery en Caracas y toda Venezuela. Miel de abeja, polen floral y propóleo al detal y al mayor con pago en USD y Bs a tasa BCV.',
  keywords: [
    'honey pot',
    'honeypotve',
    'honey pot venezuela',
    'miel pura caracas',
    'miel pura venezuela',
    'miel artesanal caracas',
    'miel cruda caracas',
    'miel de abeja natural',
    'miel guanare portuguesa',
    'comprar miel bcv',
    'polen floral caracas',
    'propoleo al 30 venezuela',
    'miel al mayor caracas',
  ],
  authors: [{ name: 'Honey Pot' }],
  creator: 'Honey Pot',
  publisher: 'Agropecuaria Honey Pot C.A',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Honey Pot | Miel 100% Pura y Artesanal en Caracas y Venezuela',
    description:
      'Miel cruda 100% pura cosechada en Guanare, Portuguesa. Descubre nuestro catálogo con envíos en Caracas y a nivel nacional.',
    url: siteUrl,
    siteName: 'Honey Pot Venezuela',
    locale: 'es_VE',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Honey Pot - Miel 100% Pura y Artesanal de Guanare, Portuguesa',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honey Pot | Miel 100% Pura y Artesanal en Caracas y Venezuela',
    description:
      'Miel cruda 100% pura y artesanal de Guanare, Portuguesa. Envíos en Caracas y toda Venezuela.',
    images: [OG_IMAGE_URL],
  },
  icons: {
    icon: [{ url: '/assets/images/logo.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/assets/images/app_logo.png' }],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'geo.region': 'VE-A, VE-M',
    'geo.placename': 'Caracas, Venezuela / Guanare, Portuguesa',
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
      </body>
    </html>
  );
}
