'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { ShieldCheck, Award, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-secondary/40 border-t border-border pt-16 pb-12 text-foreground/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand & Story */}
                    <div className="space-y-4">
                        <AppLogo />
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Honeypot ofrece mieles artesanales 100% puras, extraídas en frío y cosechadas de forma artesanal.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                                <Award size={14} /> 100% Orgánica
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                                <ShieldCheck size={14} /> Calidad Garantizada
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold text-foreground mb-4">Nuestras Mieles</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/products?category=floral" className="hover:text-primary transition-colors">Miel Floral de Azahar</Link></li>
                            <li><Link href="/products?category=silvestre" className="hover:text-primary transition-colors">Miel Silvestre de Monte</Link></li>
                            <li><Link href="/products?category=premium" className="hover:text-primary transition-colors">Miel Premium de Manuka</Link></li>
                            <li><Link href="/products?category=infusionada" className="hover:text-primary transition-colors">Miel Infusionada con Canela</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-display font-semibold text-foreground mb-4">Secciones</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Catálogo Completo</Link></li>
                            <li><Link href="/#nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/#beneficios" className="hover:text-primary transition-colors">Beneficios para la Salud</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display font-semibold text-foreground mb-4">Contacto & Pedidos</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="text-primary shrink-0" />
                                <span>+52 1 55 0000 0000</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-primary shrink-0" />
                                <span>contacto@honeypot.mx</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <MapPin size={16} className="text-primary shrink-0" />
                                <span>Venezuela</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Honeypot México. Todos los derechos reservados.</p>
                    <p className="flex items-center gap-1">
                        Hecho con <Heart size={14} className="text-rose-500 fill-rose-500" /> para amantes de la miel pura.
                    </p>
                </div>
            </div>
        </footer>
    );
}
