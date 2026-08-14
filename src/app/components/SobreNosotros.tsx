'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { Heart, Sun, Feather, Check } from 'lucide-react';

export default function SobreNosotros() {
    return (
        <section id="nosotros" className="py-20 md:py-28 bg-muted/40 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Images Showcase */}
                    <div className="relative grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-border">
                                <AppImage
                                    src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80"
                                    alt="Apicultura artesanal"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-border">
                                <AppImage
                                    src="https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&q=80"
                                    alt="Extracción limpia de miel"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Narrative & Features */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-amber-800 bg-amber-100/80 px-3.5 py-1 rounded-full text-xs font-semibold">
                            <Heart size={14} className="text-amber-600" />
                            <span>Tradición y Amor por la Naturaleza</span>
                        </div>

                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                            Apicultura sostenible que honra la pureza de cada gota
                        </h2>

                        <p className="text-muted-foreground leading-relaxed">
                            En Honeypot, creemos que la mejor miel es la que la naturaleza diseñó, sin adulterar. Nuestras colmenas se encuentran en reservas libres de pesticidas en Puebla, Jalisco y Oaxaca, garantizando que cada tarro conserve el aroma y los fitonutrientes originales.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-3 p-3.5 bg-background rounded-2xl border border-border shadow-sm">
                                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                                    <Sun size={18} />
                                </div>
                                <div>
                                    <h4 className="font-display font-semibold text-sm text-foreground">Cosecha de Temporada</h4>
                                    <p className="text-xs text-muted-foreground">Respetamos los ciclos naturales de floración sin forzar a la colmena.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 bg-background rounded-2xl border border-border shadow-sm">
                                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                                    <Feather size={18} />
                                </div>
                                <div>
                                    <h4 className="font-display font-semibold text-sm text-foreground">Proceso 100% Artesanal</h4>
                                    <p className="text-xs text-muted-foreground">Desoperculado manual y centrifugado en frío para mantener propóleos y polen.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border text-center">
                            <div>
                                <p className="font-display text-2xl font-bold text-amber-600">100%</p>
                                <p className="text-xs text-muted-foreground font-medium">Pura & Cruda</p>
                            </div>
                            <div>
                                <p className="font-display text-2xl font-bold text-amber-600">0%</p>
                                <p className="text-xs text-muted-foreground font-medium">Aditivos o Azúcar</p>
                            </div>
                            <div>
                                <p className="font-display text-2xl font-bold text-amber-600">40+</p>
                                <p className="text-xs text-muted-foreground font-medium">Especies Florales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
