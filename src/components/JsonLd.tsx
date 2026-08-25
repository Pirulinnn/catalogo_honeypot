import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://catalogo-honeypot.pages.dev';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'LocalBusiness'],
    name: 'Honey Pot',
    alternateName: 'Honey Pot Venezuela',
    legalName: 'Agropecuaria Honey Pot C.A',
    taxID: 'J-508633660',
    description:
      'Tienda de miel artesanal pura cosechada en Guanare con distribución en Caracas y Venezuela.',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.svg`,
    image: `${SITE_URL}/assets/images/og_honeypot.jpg`,
    telephone: '+584127665595',
    email: 'honeypot.ve@gmail.com',
    priceRange: '$$',
    currenciesAccepted: 'USD, VES',
    paymentAccepted: 'Cash, Pago Móvil, Zelle, Transferencia Bancaria',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Caracas',
      addressLocality: 'Caracas',
      addressRegion: 'Distrito Capital',
      addressCountry: 'VE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.4806,
      longitude: -66.9036,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Caracas',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Guanare, Portuguesa',
      },
      {
        '@type': 'Country',
        name: 'Venezuela',
      },
    ],
    sameAs: ['https://www.instagram.com/honeypot.ve', 'https://www.tiktok.com/@honeypot.ve'],
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'VE',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 7,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
