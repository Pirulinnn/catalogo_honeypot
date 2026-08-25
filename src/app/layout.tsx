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
    default: 'Honey Pot | Miel 100% Pura y Artesanal',
    template: '%s | Honey Pot',
  },
  description:
    'Miel pura y artesanal cosechada en Guanare, Portuguesa. Envíos directos en Caracas y Venezuela.',
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
    title: 'Honey Pot | Miel 100% Pura y Artesanal',
    description:
      'Miel pura y artesanal de Guanare, Portuguesa. Descubre el néctar dorado de Venezuela.',
    url: siteUrl,
    siteName: 'Honey Pot Venezuela',
    locale: 'es_VE',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Honey Pot - Miel Artesanal',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honey Pot | Miel 100% Pura y Artesanal',
    description: 'Miel pura y artesanal de Guanare, Portuguesa.',
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
      </body>
    </html>
  );
}
