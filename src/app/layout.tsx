import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: 'Honeypot — Miel 100% Pura y Artesanal',
    description: 'Honeypot ofrece mieles artesanales puras y 100% naturales, extraídas de forma sostenible en Venezuela para cuidar el medio ambiente y llevar a tu mesa un producto sin aditivos ni conservantes artificiales.',
    icons: {
        icon: [
            { url: '/assets/images/logo.svg', type: 'image/svg+xml' },
        ],
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
                {children}

                <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fhoneypot1835back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
                <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
        </html>
    );
}