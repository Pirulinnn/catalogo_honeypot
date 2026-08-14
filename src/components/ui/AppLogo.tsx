'use client';

import React from 'react';
import Link from 'next/link';

interface AppLogoProps {
    className?: string;
    showText?: boolean;
}

export default function AppLogo({ className = '', showText = true }: AppLogoProps) {
    return (
        <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-amber group-hover:scale-105 transition-transform duration-200">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M12 2L15.09 5.26L19.5 4.5L18.74 8.91L22 12L18.74 15.09L19.5 19.5L15.09 18.74L12 22L8.91 18.74L4.5 19.5L5.26 15.09L2 12L5.26 8.91L4.5 4.5L8.91 5.26L12 2Z" />
                </svg>
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        Honeypot
                    </span>
                    <span className="text-[10px] tracking-widest uppercase font-medium text-amber-600 -mt-1">
                        Miel Pura
                    </span>
                </div>
            )}
        </Link>
    );
}
