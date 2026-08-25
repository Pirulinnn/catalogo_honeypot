'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    MessageCircle,
    User,
    Phone,
    CreditCard,
    Clock,
    FileText,
    Check,
    AlertCircle,
    Loader2,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import { CartItem } from '@/store/cartStore';
import type { LocationData } from './LocationPicker';

// Dynamically import LocationPicker (Leaflet) with SSR disabled for Next.js / Cloudflare Pages
const LocationPicker = dynamic(() => import('./LocationPicker'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-48 rounded-2xl bg-muted/70 animate-pulse flex flex-col items-center justify-center border border-border gap-2">
            <Loader2 size={22} className="animate-spin text-amber-600" />
            <span className="text-xs text-muted-foreground font-medium">Cargando mapa interactivo...</span>
        </div>
    ),
});

export const STORE_WHATSAPP = '587665595';

const TIME_SLOTS = [
    'Mañana (9:00 AM - 1:00 PM)',
    'Tarde (2:00 PM - 6:00 PM)',
    'Lo antes posible',
] as const;

const PAYMENT_OPTIONS = [
    { id: 'Pago Móvil', label: 'Pago Móvil', icon: '📱' },
    { id: 'Efectivo', label: 'Efectivo', icon: '💵' },
] as const;

const LOCAL_STORAGE_KEY = 'honeypot_checkout_customer';

export interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    total: number;
}

export default function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
    // 7 Required / Optional Form Fields
    const [name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState<LocationData | null>({
        lat: 10.4806,
        lng: -66.9036,
        mapUrl: 'https://maps.google.com/?q=10.480600,-66.903600',
    });
    const [timeSlot, setTimeSlot] = useState<string>('Lo antes posible');
    const [notes, setNotes] = useState('');
    const [paymentMethods, setPaymentMethods] = useState<string[]>(['Pago Móvil']);

    // Validation & touched state
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Read stored user profile from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.name) setName(parsed.name);
                if (parsed.idNumber) setIdNumber(parsed.idNumber);
                if (parsed.phone) setPhone(parsed.phone);
            }
        } catch (err) {
            console.error('Error loading saved customer profile:', err);
        }
    }, []);

    // Toggle payment method selection (supports multiple)
    const togglePaymentMethod = (method: string) => {
        setPaymentMethods((prev) => {
            if (prev.includes(method)) {
                if (prev.length === 1) {
                    return prev; // keep at least 1 or allow toggle with validation
                }
                return prev.filter((m) => m !== method);
            } else {
                return [...prev, method];
            }
        });
    };

    // Validate form
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = 'El nombre y apellido son obligatorios';
        }
        if (!idNumber.trim()) {
            newErrors.idNumber = 'La cédula de identidad es obligatoria';
        }
        if (!phone.trim()) {
            newErrors.phone = 'El teléfono de contacto es obligatorio';
        }
        if (!location || !location.lat || !location.lng) {
            newErrors.location = 'Debes fijar la ubicación en el mapa';
        }
        if (!timeSlot) {
            newErrors.timeSlot = 'Selecciona una franja horaria';
        }
        if (paymentMethods.length === 0) {
            newErrors.paymentMethods = 'Selecciona al menos una forma de pago';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendOrder = () => {
        setTouched(true);
        if (!validate()) {
            return;
        }

        // Save recurrent fields to localStorage
        try {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({
                    name: name.trim(),
                    idNumber: idNumber.trim(),
                    phone: phone.trim(),
                })
            );
        } catch (err) {
            console.error('Error persisting customer data:', err);
        }

        // Build cleanly formatted WhatsApp message
        const itemsList = items
            .map(
                (item) =>
                    `• *${item.name}* (${item.weight}) x${item.quantity} = $${(
                        item.price * item.quantity
                    ).toLocaleString('en-US')} USD`
            )
            .join('\n');

        const messageLines = [
            '*¡NUEVO PEDIDO - HONEYPOT!* ',
            '',
            '*RESUMEN DEL PEDIDO:*',
            itemsList,
            '',
            `*TOTAL A PAGAR:* $${total.toLocaleString('en-US')} USD`,
            '',
            '*DATOS DEL CLIENTE*',
            `• *Nombre y Apellido:* ${name.trim()}`,
            `• *Cédula de Identidad:* ${idNumber.trim()}`,
            `• *Teléfono de Contacto:* ${phone.trim()}`,
            '',
            '*DETALLES DE ENTREGA*:',
            `• *Ubicación GPS (Google Maps):* ${location?.mapUrl || 'No especificada'}`,
            `• *Franja Horaria:* ${timeSlot}`,
            notes.trim() ? `• *Notas de Entrega:* ${notes.trim()}` : '• *Notas de Entrega:* Ninguna',
            '',
            '*FORMA(S) DE PAGO SELECCIONADA(S):*',
            `• ${paymentMethods.join(', ')}`,
            '',
            '*Nota de pago:* Los pagos en Bs. se reciben a la tasa oficial BCV vigente a la tasa del día.',
            '',
            '_Enviado desde el catálogo web de Honeypot. ¡Muchas gracias!_',
        ];

        const fullMessage = encodeURIComponent(messageLines.join('\n'));
        const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${fullMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const inputClass =
        'w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-muted-foreground shadow-sm';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 modal-overlay"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative bg-background rounded-3xl shadow-2xl w-full max-w-xl p-5 sm:p-7 z-10 my-auto max-h-[92vh] flex flex-col border border-border"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                                    <MessageCircle size={22} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                                            Finalizar Pedido
                                        </h3>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                                            <Sparkles size={10} /> WhatsApp
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Completa tus datos para coordinar el despacho
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                                aria-label="Cerrar modal"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="overflow-y-auto pr-1 py-4 space-y-5 flex-1">
                            {/* Order Summary Pill */}
                            <div className="bg-muted/80 border border-border/80 rounded-2xl p-4 space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    <span>Resumen de Compra</span>
                                    <span className="text-amber-700 dark:text-amber-400 font-medium lowercase">
                                        {items.length} {items.length === 1 ? 'producto' : 'productos'}
                                    </span>
                                </div>
                                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-xs sm:text-sm">
                                            <span className="text-foreground truncate mr-2">
                                                <span className="font-semibold text-primary">{item.quantity}x</span> {item.name}{' '}
                                                <span className="text-muted-foreground text-xs">({item.weight})</span>
                                            </span>
                                            <span className="font-medium text-foreground shrink-0">
                                                ${(item.price * item.quantity).toLocaleString('en-US')} USD
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-border pt-2 flex justify-between items-baseline font-bold">
                                    <span className="text-sm text-foreground">Total a Pagar</span>
                                    <span className="text-primary text-base sm:text-lg">
                                        ${total.toLocaleString('en-US')} USD
                                    </span>
                                </div>
                            </div>

                            {/* Section 1: Datos Personales */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-1.5">
                                    <User size={15} className="text-amber-600" />
                                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                                        1. Datos de Contacto
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Nombre */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                            Nombre y Apellido *
                                        </label>
                                        <div className="relative">
                                            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                type="text"
                                                placeholder="Ej. María Pérez"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                                                }}
                                                className={`${inputClass} pl-9 ${
                                                    touched && errors.name ? 'border-rose-500 focus:ring-rose-500' : ''
                                                }`}
                                            />
                                        </div>
                                        {touched && errors.name && (
                                            <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                                                <AlertCircle size={11} /> {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Cédula */}
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                            Cédula de Identidad *
                                        </label>
                                        <div className="relative">
                                            <ShieldCheck size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="Ej. V-12345678"
                                                value={idNumber}
                                                onChange={(e) => {
                                                    setIdNumber(e.target.value);
                                                    if (errors.idNumber) setErrors((prev) => ({ ...prev, idNumber: '' }));
                                                }}
                                                className={`${inputClass} pl-9 ${
                                                    touched && errors.idNumber ? 'border-rose-500 focus:ring-rose-500' : ''
                                                }`}
                                            />
                                        </div>
                                        {touched && errors.idNumber && (
                                            <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                                                <AlertCircle size={11} /> {errors.idNumber}
                                            </p>
                                        )}
                                    </div>

                                    {/* Teléfono */}
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                            Teléfono de Contacto *
                                        </label>
                                        <div className="relative">
                                            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                type="tel"
                                                placeholder="Ej. 0412 1234567"
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                                                }}
                                                className={`${inputClass} pl-9 ${
                                                    touched && errors.phone ? 'border-rose-500 focus:ring-rose-500' : ''
                                                }`}
                                            />
                                        </div>
                                        {touched && errors.phone && (
                                            <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                                                <AlertCircle size={11} /> {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Ubicación Interactiva (Leaflet + GPS) */}
                            <div className="space-y-2 pt-1 border-t border-border">
                                <LocationPicker
                                    value={location}
                                    onChange={(loc) => {
                                        setLocation(loc);
                                        if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                                    }}
                                    error={touched ? errors.location : undefined}
                                />
                            </div>

                            {/* Section 3: Franja Horaria (Píldoras) */}
                            <div className="space-y-2 pt-1 border-t border-border">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Clock size={14} className="text-amber-600" />
                                    <span>Franja Horaria de Entrega *</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {TIME_SLOTS.map((slot) => {
                                        const isSelected = timeSlot === slot;
                                        return (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => {
                                                    setTimeSlot(slot);
                                                    if (errors.timeSlot) setErrors((prev) => ({ ...prev, timeSlot: '' }));
                                                }}
                                                className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                                    isSelected
                                                        ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20 font-semibold'
                                                        : 'bg-background hover:bg-muted text-foreground border-input'
                                                }`}
                                            >
                                                {isSelected && <Check size={12} strokeWidth={3} />}
                                                <span>{slot}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {touched && errors.timeSlot && (
                                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                                        <AlertCircle size={11} /> {errors.timeSlot}
                                    </p>
                                )}
                            </div>

                            {/* Section 4: Forma de Pago (Múltiple) */}
                            <div className="space-y-2 pt-1 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                        <CreditCard size={14} className="text-amber-600" />
                                        <span>Forma de Pago *</span>
                                    </label>
                                    <span className="text-[11px] text-muted-foreground">(Selecciona 1 o ambas)</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {PAYMENT_OPTIONS.map((opt) => {
                                        const isSelected = paymentMethods.includes(opt.id);
                                        return (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => {
                                                    togglePaymentMethod(opt.id);
                                                    if (errors.paymentMethods) {
                                                        setErrors((prev) => ({ ...prev, paymentMethods: '' }));
                                                    }
                                                }}
                                                className={`p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                                                    isSelected
                                                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-sm'
                                                        : 'bg-background hover:bg-muted text-foreground border-input'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">{opt.icon}</span>
                                                    <span>{opt.label}</span>
                                                </div>
                                                <div
                                                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                                        isSelected
                                                            ? 'bg-amber-500 border-amber-500 text-white'
                                                            : 'border-muted-foreground/40 bg-background'
                                                    }`}
                                                >
                                                    {isSelected && <Check size={11} strokeWidth={3} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Aclaratoria de tasa al seleccionar Pago Móvil */}
                                {paymentMethods.includes('Pago Móvil') && (
                                    <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-stone-900/60 border border-amber-500/20 text-amber-950 dark:text-stone-300 text-xs leading-relaxed flex items-start gap-2">
                                        <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-[11px]">
                                            Para pagos en Bolívares (Pago Móvil / Transferencia), el monto exacto se calcula a la <strong>tasa oficial del BCV vigente a la tasa del día</strong>.
                                        </p>
                                    </div>
                                )}

                                {touched && errors.paymentMethods && (
                                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                                        <AlertCircle size={11} /> {errors.paymentMethods}
                                    </p>
                                )}
                            </div>

                            {/* Section 5: Notas de Entrega (Opcional) */}
                            <div className="space-y-1.5 pt-1 border-t border-border">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <FileText size={14} className="text-amber-600" />
                                    <span>Notas de Entrega (Opcional)</span>
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Ej. Edificio A, piso 3, dejar con vigilancia o tocar timbre..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-4 border-t border-border shrink-0 space-y-2">
                            <button
                                type="button"
                                onClick={handleSendOrder}
                                className="whatsapp-btn w-full font-bold shadow-lg shadow-emerald-600/20 text-sm sm:text-base py-3.5 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Image
                                    src="/assets/images/whatsapp_logo.svg"
                                    alt="WhatsApp"
                                    width={22}
                                    height={22}
                                    className="w-5 h-5 shrink-0"
                                />
                                <span>Enviar Pedido por WhatsApp</span>
                            </button>

                            <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1">
                                <span>Destino:</span>
                                <span className="font-semibold text-foreground">+58 766 5595</span>
                                <span>• Te responderemos de inmediato</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
