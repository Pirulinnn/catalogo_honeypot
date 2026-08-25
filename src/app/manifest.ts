import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Honey Pot | Miel 100% Pura y Artesanal',
    short_name: 'Honey Pot',
    description:
      'Miel cruda y artesanal cosechada en Guanare, Portuguesa. Envíos directos en Caracas y a nivel nacional.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0a09',
    theme_color: '#d97706',
    icons: [
      {
        src: '/assets/images/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/assets/images/app_logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
