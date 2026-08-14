'use client';

import React from 'react';
import { ShieldCheck, HeartPulse, Zap, Sparkles, Flame, Smile } from 'lucide-react';

export default function BeneficiosSection() {
    const benefits = [
        {
            icon: ShieldCheck,
            title: 'Poder Antibacteriano Natural',
            description: 'Contiene peróxido de hidrógeno natural y fitonutrientes que ayudan a combatir gérmenes e infecciones.',
        },
        {
            icon: HeartPulse,
            title: 'Rica en Antioxidantes',
            description: 'Abundante en flavonoides y ácidos orgánicos que combaten los radicales libres y el envejecimiento celular.',
        },
        {
            icon: Zap,
            title: 'Energía Limpia y Sostenida',
            description: 'Los azúcares naturales no refinados proveen energía inmediata y duradera sin picos de glucosa abruptos.',
        },
        {
            icon: Sparkles,
            title: 'Refuerzo Inmunológico',
            description: 'Consumir miel pura local ayuda al organismo a desarrollar inmunidad natural frente a alérgenos de temporada.',
        },
        {
            icon: Flame,
            title: 'Alivio para la Garganta',
            description: 'Recubre y calma naturalmente las vías respiratorias irritadas, siendo un excelente remedio ante la tos.',
        },
        {
            icon: Smile,
            title: 'Favorece la Digestión',
            description: 'Actúa como prebiótico natural, alimentando las bacterias benéficas de la flora intestinal.',
        },
    ];

    return (
        <section id="beneficios" className="py-20 md:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 text-amber-800 bg-amber-100/80 px-3.5 py-1 rounded-full text-xs font-semibold">
                        <Sparkles size={14} className="text-amber-600" />
                        <span>Bienestar Holístico</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                        Razones para incorporar miel 100% pura a tu rutina diaria
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                        A diferencia del azúcar procesado, la miel artesanal es un superalimento vivo cargado de enzimas, minerales y compuestos bioactivos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={idx}
                                className="p-7 rounded-3xl bg-card border border-border/80 shadow-rustic hover:shadow-rustic-hover transition-all duration-300 space-y-4 group hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon size={24} />
                                </div>
                                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
