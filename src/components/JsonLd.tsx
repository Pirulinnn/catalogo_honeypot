import React from 'react';
import { products } from '@/data/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://honeypotve.com';

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Desambiguación de Entidad y Comercio Online
      {
        '@type': ['Store', 'OnlineStore', 'Organization'],
        '@id': `${siteUrl}/#organization`,
        name: 'Honey Pot',
        alternateName: [
          'honeypotve',
          'Honey Pot Venezuela',
          'HoneyPot',
          'Agropecuaria Honey Pot C.A',
        ],
        legalName: 'Agropecuaria Honey Pot C.A',
        taxID: 'J-508633660',
        description:
          'Productor y distribuidor de miel 100% pura y cruda, polen floral y propóleo cosechados de forma artesanal en Guanare, Estado Portuguesa, con despacho y delivery en Caracas y toda Venezuela.',
        url: siteUrl,
        logo: `${siteUrl}/assets/images/logo.svg`,
        image: `${siteUrl}/assets/images/og_honeypot.jpg`,
        telephone: '+584127665595',
        email: 'honeypot.ve@gmail.com',
        priceRange: '$$',
        currenciesAccepted: 'USD, VES',
        paymentAccepted: 'Cash, Pago Móvil, Zelle, Transferencia Bancaria',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Caracas / Guanare',
          addressLocality: 'Caracas',
          addressRegion: 'Distrito Capital / Portuguesa',
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
        sameAs: [
          'https://www.instagram.com/honeypot.ve',
          'https://www.tiktok.com/@honeypot.ve',
        ],
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'VE',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },

      // 2. Definición del Sitio Web
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Honey Pot Venezuela',
        description:
          'Miel 100% Pura y Artesanal de Guanare, Portuguesa con entrega en Caracas y toda Venezuela.',
        inLanguage: 'es-VE',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },

      // 3. Catálogo de Productos con Marcado Individual
      ...products.map((p) => ({
        '@type': 'Product',
        '@id': `${siteUrl}/products#product-${p.id}`,
        name: `${p.name} (${p.weight}) - Honey Pot`,
        image: p.image.startsWith('http') ? p.image : `${siteUrl}${p.image}`,
        description: p.description,
        sku: `HP-${p.category.toUpperCase()}-${p.id}`,
        category: p.category,
        brand: {
          '@type': 'Brand',
          name: 'Honey Pot',
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'Venezuela',
        },
        offers: {
          '@type': 'Offer',
          url: `${siteUrl}/products`,
          priceCurrency: 'USD',
          price: p.price,
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            '@id': `${siteUrl}/#organization`,
          },
          priceValidUntil: '2027-12-31',
        },
      })),

      // 4. FAQPage Estratégico para Rich Snippets
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cómo garantizan que la miel de Honey Pot es 100% pura y cruda?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nuestra miel es cosechada artesanalmente en Guanare, Estado Portuguesa. No pasa por procesos de pasteurización, calentamiento industrial ni mezclas con jarabes o aditivos, manteniendo intactas todas sus enzimas, polen y propiedades bioactivas naturales.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Hacen entregas y delivery de miel en Caracas y envíos a toda Venezuela?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí, disponemos de servicio de delivery directo y programado en toda Caracas, además de despachos a nivel nacional a través de empresas de encomienda autorizadas.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuáles son las opciones de pago y cómo se calcula el precio en Bolívares?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Aceptamos pagos en divisas (efectivo, Zelle) y en Bolívares mediante Pago Móvil o transferencia bancaria, calculados exactamente a la tasa oficial del Banco Central de Venezuela (BCV) del día.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Venden miel pura y productos de la colmena al mayor para negocios?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí, disponemos de formatos mayoristas en cajas x12 y x24 unidades, galones de 7kg y cubetas de 25kg con precios preferenciales para panaderías, cafeterías, tiendas naturistas y cervecerías artesanales.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
