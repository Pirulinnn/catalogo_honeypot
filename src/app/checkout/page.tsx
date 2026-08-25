'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  User,
  ShieldCheck,
  Phone,
  Clock,
  FileText,
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  MessageCircle,
  Truck,
  Sparkles,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Zap,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import AppImage from '@/components/ui/AppImage';
import Image from 'next/image';
import type { LocationData } from '@/components/LocationPicker';

// Dynamically import LocationPicker with Leaflet (SSR disabled for Cloudflare Pages / Next.js)
const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-52 rounded-2xl bg-muted/70 animate-pulse flex flex-col items-center justify-center border border-border gap-2">
      <Loader2 size={24} className="animate-spin text-amber-600" />
      <span className="text-xs text-muted-foreground font-medium">
        Cargando mapa interactivo...
      </span>
    </div>
  ),
});

const STORE_WHATSAPP = '+584127665595';
const LOCAL_STORAGE_KEY = 'honeypot_checkout_customer';

// Helper to calculate current local ISO datetime string for min attribute (YYYY-MM-DDTHH:mm)
const getMinDateTime = () => {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

// Formatter for human-readable scheduled delivery (e.g. Jueves 20/08 a las 3:30 PM)
const formatScheduledDateTime = (dtStr: string) => {
  if (!dtStr) return '';
  try {
    const [datePart, timePart] = dtStr.split('T');
    if (!datePart || !timePart) return dtStr;
    const [year, month, day] = datePart.split('-');
    const [h, m] = timePart.split(':');

    const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = days[dateObj.getDay()] || '';

    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${dayName} ${day}/${month} a las ${h12}:${m} ${ampm}`;
  } catch {
    return dtStr;
  }
};

const PAYMENT_OPTIONS = [
  {
    id: 'Pago Móvil',
    label: 'Pago Móvil',
    icon: '/assets/images/pago-movil.svg',
    desc: 'Pago móvil interbancario en Bs.',
  },
  {
    id: 'Transferencia',
    label: 'Transferencia',
    icon: '/assets/images/icon_transference.svg',
    desc: 'Transferencia bancaria directa en Bs.',
  },
  {
    id: 'Efectivo',
    label: 'Efectivo',
    icon: '/assets/images/efectivo.svg',
    desc: 'Divisas USD o bolívares en mano',
  },
] as const;

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  // Hydration check to prevent SSR mismatches with persisted zustand/localStorage
  const [isHydrated, setIsHydrated] = useState(false);

  // 7 Required / Optional Fields
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<LocationData | null>({
    lat: 10.4806,
    lng: -66.9036,
    mapUrl: 'https://maps.google.com/?q=10.480600,-66.903600',
  });
  const [deliveryType, setDeliveryType] = useState<'inmediata' | 'programada'>('inmediata');
  const [scheduledDateTime, setScheduledDateTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<string[]>(['Pago Móvil']);

  // Validation state
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = getTotalPrice();

  // Check if scheduled date/time is invalid for disabling submit button
  const isScheduledInvalid =
    deliveryType === 'programada' && (!scheduledDateTime || scheduledDateTime < getMinDateTime());

  // Handle datetime-local changes with real-time validation
  const handleDateTimeChange = (val: string) => {
    const currentMin = getMinDateTime();
    setScheduledDateTime(val);
    if (val && val < currentMin) {
      setErrors((prev) => ({
        ...prev,
        scheduledDateTime: 'Por favor selecciona una fecha y hora futura válida',
      }));
    } else if (errors.scheduledDateTime) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.scheduledDateTime;
        return next;
      });
    }
  };

  // Read stored profile on mount
  useEffect(() => {
    setIsHydrated(true);
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

  // Payment methods multi-select toggle
  const togglePaymentMethod = (method: string) => {
    setPaymentMethods((prev) => {
      if (prev.includes(method)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((m) => m !== method);
      } else {
        return [...prev, method];
      }
    });
    if (errors.paymentMethods) {
      setErrors((prev) => ({ ...prev, paymentMethods: '' }));
    }
  };

  // Form validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre y apellido';
    }
    if (!idNumber.trim()) {
      newErrors.idNumber = 'Ingresa tu cédula de identidad';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Ingresa un número telefónico de contacto';
    }
    if (!location || !location.lat || !location.lng) {
      newErrors.location = 'Debes fijar la ubicación de entrega en el mapa';
    }
    if (deliveryType === 'programada') {
      const currentMin = getMinDateTime();
      if (!scheduledDateTime) {
        newErrors.scheduledDateTime = 'Por favor selecciona la fecha y hora de entrega';
      } else if (scheduledDateTime < currentMin) {
        newErrors.scheduledDateTime = 'Por favor selecciona una fecha y hora futura válida';
      }
    }
    if (paymentMethods.length === 0) {
      newErrors.paymentMethods = 'Selecciona al menos un método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Confirm order & trigger formatted WhatsApp message
  const handleConfirmOrder = () => {
    setTouched(true);
    if (!validate()) {
      // Scroll to the first error if needed
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Save recurrent details to localStorage
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
      console.error('Error saving customer data:', err);
    }

    // Build cleanly structured WhatsApp message with emojis
    const itemsList = items
      .map(
        (item) =>
          `• *${item.name}* (${item.weight}) x${item.quantity} = $${(
            item.price * item.quantity
          ).toLocaleString('en-US')} USD`
      )
      .join('\n');

    const deliveryDetail =
      deliveryType === 'inmediata'
        ? '*Tipo de entrega:* Inmediata (Lo antes posible)'
        : `*Entrega programada:* ${formatScheduledDateTime(scheduledDateTime)}`;

    const messageLines = [
      '*¡NUEVO PEDIDO!*',
      '',
      '*RESUMEN DE LA COMPRA:*',
      itemsList,
      '',
      `*TOTAL A PAGAR:* $${totalPrice.toLocaleString('en-US')} USD`,
      '',
      '*DATOS DEL CLIENTE:*',
      `• *Nombre y Apellido:* ${name.trim()}`,
      `• *Cédula de Identidad:* ${idNumber.trim()}`,
      `• *Teléfono de Contacto:* ${phone.trim()}`,
      '',
      '*DETALLES DE ENTREGA:*',
      `• *Ubicación GPS (Google Maps):* ${location?.mapUrl || 'No especificada'}`,
      `• ${deliveryDetail}`,
      notes.trim() ? `• *Notas de Entrega:* ${notes.trim()}` : '• *Notas de Entrega:* Ninguna',
      '',
      '*FORMA(S) DE PAGO:*',
      `• ${paymentMethods.join(', ')}`,
      '',
      '*Nota de pago:* Los pagos en Bs. se reciben a la tasa oficial BCV vigente a la tasa del día.',
      '',
      '*Pedido generado desde el portal oficial de Honeypot. ¡Quedo a la espera de su confirmación!*',
    ];

    const cleanDestination = STORE_WHATSAPP.replace(/\D/g, '');
    const fullMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${cleanDestination}?text=${fullMessage}`;

    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  const inputClass =
    'w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-muted-foreground shadow-sm';

  // Avoid hydration layout flickers
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 honeycomb-bg">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-amber-600" />
          <p className="text-sm font-medium text-muted-foreground">Cargando checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background honeycomb-bg text-foreground pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl border border-border flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/40 transition-all">
              <ArrowLeft
                size={16}
                className="text-muted-foreground group-hover:text-amber-600 transition-colors"
              />
            </div>
            <span>Volver al catálogo</span>
          </Link>

          <Link href="/" className="inline-flex items-center">
            <Image
              src="/assets/images/logo.svg"
              alt="Honeypot"
              width={40}
              height={40}
              style={{ width: '40px', height: 'auto', borderRadius: '30%' }}
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="hidden sm:inline font-medium">Checkout Seguro</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Empty Cart State */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto my-12 bg-card rounded-3xl border border-border p-8 text-center shadow-xl space-y-5"
          >
            <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag size={40} />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                Tu carrito está vacío
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                Para continuar al checkout, primero añade nuestras deliciosas mieles 100% puras a tu
                pedido.
              </p>
            </div>
            <Link
              href="/products"
              className="whatsapp-btn w-full font-bold shadow-lg shadow-amber-600/20 text-sm py-3.5 inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: '#d97706' }}
            >
              <Sparkles size={18} />
              <span>Explorar Catálogo de Mieles</span>
            </Link>
          </motion.div>
        ) : (
          /* Active Checkout Layout */
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/80">
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
                  Finalizar Pedido
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Ingresa los datos para coordinar tu despacho directamente por WhatsApp
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 self-start sm:self-auto">
                <MessageCircle size={14} />
                <span>Atención vía WhatsApp</span>
              </div>
            </div>

            {/* Responsive Grid: Left 7 cols, Right 5 cols */}
            <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form & Map Details (7 columns) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Card 1: Datos Personales */}
                <section className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
                      <User size={18} />
                    </div>
                    <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
                      1. Datos del Cliente
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Nombre y Apellido *
                      </label>
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="text"
                          placeholder="Ej: María Rodríguez"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                          }}
                          className={`${inputClass} pl-10 ${
                            touched && errors.name ? 'border-rose-500 focus:ring-rose-500' : ''
                          }`}
                        />
                      </div>
                      {touched && errors.name && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Cédula */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Cédula de Identidad *
                      </label>
                      <div className="relative">
                        <ShieldCheck
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="Ej: V-18456789"
                          value={idNumber}
                          onChange={(e) => {
                            setIdNumber(e.target.value);
                            if (errors.idNumber) setErrors((prev) => ({ ...prev, idNumber: '' }));
                          }}
                          className={`${inputClass} pl-10 ${
                            touched && errors.idNumber ? 'border-rose-500 focus:ring-rose-500' : ''
                          }`}
                        />
                      </div>
                      {touched && errors.idNumber && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.idNumber}
                        </p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Teléfono de Contacto *
                      </label>
                      <div className="relative">
                        <Phone
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="tel"
                          placeholder="Ej: 0412 1234567"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                          }}
                          className={`${inputClass} pl-10 ${
                            touched && errors.phone ? 'border-rose-500 focus:ring-rose-500' : ''
                          }`}
                        />
                      </div>
                      {touched && errors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Card 2: Ubicación de Entrega (Mapa Interactivo + Nominatim + GPS) */}
                <section className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
                        2. Ubicación de Entrega
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Busca tu zona o arrastra el Pin para indicar el punto exacto de despacho
                      </p>
                    </div>
                  </div>

                  <LocationPicker
                    value={location}
                    onChange={(loc) => {
                      setLocation(loc);
                      if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                    }}
                    error={touched ? errors.location : undefined}
                  />
                </section>

                {/* Card 3: Modalidad de Entrega */}
                <section className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
                      <Clock size={18} />
                    </div>
                    <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
                      3. Modalidad de Entrega
                    </h2>
                  </div>

                  {/* Option Selector: Inmediata vs Programada */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryType('inmediata');
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.scheduledDateTime;
                          return copy;
                        });
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        deliveryType === 'inmediata'
                          ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md shadow-amber-500/20 font-bold'
                          : 'bg-background hover:bg-muted text-foreground border-input'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-600/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Zap
                          size={18}
                          className={
                            deliveryType === 'inmediata' ? 'text-stone-950' : 'text-amber-500'
                          }
                        />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <span>Entrega inmediata</span>
                          {deliveryType === 'inmediata' && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div
                          className={`text-[11px] mt-0.5 ${deliveryType === 'inmediata' ? 'text-stone-900/80 font-normal' : 'text-muted-foreground'}`}
                        >
                          Lo antes posible (aprox. 30 min)
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('programada')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        deliveryType === 'programada'
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-sm font-semibold'
                          : 'bg-background hover:bg-muted text-foreground border-input'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar size={18} className="text-amber-500" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <span>Programar entrega</span>
                          {deliveryType === 'programada' && (
                            <Check
                              size={14}
                              strokeWidth={3}
                              className="text-amber-600 dark:text-amber-400"
                            />
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 font-normal">
                          Selecciona fecha y hora exacta
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Dynamic 'datetime-local' field */}
                  {deliveryType === 'programada' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="pt-2 space-y-3"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="scheduled-datetime"
                          className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"
                        >
                          <Calendar size={14} className="text-amber-500" />
                          <span>Fecha y hora de entrega deseada</span>
                        </label>
                        <input
                          id="scheduled-datetime"
                          type="datetime-local"
                          min={getMinDateTime()}
                          value={scheduledDateTime}
                          onChange={(e) => handleDateTimeChange(e.target.value)}
                          className={`w-full bg-background border ${
                            touched && errors.scheduledDateTime
                              ? 'border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-500'
                              : 'border-input hover:border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                          } rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-all shadow-sm`}
                        />
                        {touched && errors.scheduledDateTime && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle size={12} /> {errors.scheduledDateTime}
                          </p>
                        )}
                      </div>

                      {/* Preview badge when valid */}
                      {scheduledDateTime && !errors.scheduledDateTime && (
                        <div className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl px-3 py-2">
                          <Check size={14} strokeWidth={3} className="text-emerald-500" />
                          <span>
                            ⏰ Entrega programada:{' '}
                            <strong>{formatScheduledDateTime(scheduledDateTime)}</strong>
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </section>

                {/* Card 4: Notas de Entrega (Opcional) */}
                <section className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
                        4. Notas de Entrega (Opcional)
                      </h2>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Ej: Casa blanca de rejas negras, dejar en recepción o timbre 3B..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </section>
              </div>

              {/* Right Column: Order Summary & Payment (5 columns, Sticky) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 mt-6 lg:mt-0">
                {/* Order Summary Card */}
                <section className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-md space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={18} className="text-amber-600" />
                      <h3 className="font-display font-bold text-lg text-foreground">
                        Resumen del Pedido
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-muted-foreground hover:text-rose-600 transition-colors"
                    >
                      Vaciar
                    </button>
                  </div>

                  {/* Products List with Quantities */}
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2.5 rounded-2xl bg-muted/60 border border-border/60"
                      >
                        <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center p-1 shrink-0 overflow-hidden">
                          <AppImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-xs sm:text-sm text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-muted-foreground">{item.weight}</p>

                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center border border-border rounded-lg bg-background p-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 rounded flex items-center justify-center text-foreground hover:bg-muted"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 rounded flex items-center justify-center text-foreground hover:bg-muted"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <span className="font-display font-bold text-xs sm:text-sm text-primary">
                              ${(item.price * item.quantity).toLocaleString('en-US')} USD
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-rose-600 transition-colors p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Totals */}
                  <div className="space-y-2 pt-3 border-t border-border">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Subtotal productos</span>
                      <span>${totalPrice.toLocaleString('en-US')} USD</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Envío a domicilio</span>
                      <span className="text-emerald-600 font-medium">Coordinado por WhatsApp</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-bold text-foreground pt-2 border-t border-border">
                      <span>Total a Pagar</span>
                      <span className="text-primary text-xl font-black">
                        ${totalPrice.toLocaleString('en-US')} USD
                      </span>
                    </div>

                    {/* Nota aclaratoria de Tasa Oficial BCV */}
                    <div className="mt-3 p-3 rounded-xl bg-amber-500/10 dark:bg-stone-900/60 border border-amber-500/20 text-amber-950 dark:text-stone-300 text-xs leading-relaxed flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>
                        Para pagos en Bolívares (Pago Móvil / Transferencia), el monto exacto se
                        calcula a la{' '}
                        <strong>
                          tasa oficial del Banco Central de Venezuela (BCV) vigente a la tasa del
                          día
                        </strong>
                        .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Payment Methods Card */}
                <section className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-amber-600" />
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                        Forma de Pago
                      </h3>
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      (Selecciona 1 o varias)
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {PAYMENT_OPTIONS.map((opt) => {
                      const isSelected = paymentMethods.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => togglePaymentMethod(opt.id)}
                          className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-sm'
                              : 'bg-background hover:bg-muted text-foreground border-input'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={opt.icon}
                              alt={opt.label}
                              width={36}
                              height={36}
                              className="w-9 h-9 shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-xs sm:text-sm">{opt.label}</div>
                              <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-amber-500 border-amber-500 text-stone-950'
                                : 'border-muted-foreground/40 bg-background'
                            }`}
                          >
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Aclaratoria de tasa al seleccionar Pago Móvil o Transferencia */}
                  {(paymentMethods.includes('Pago Móvil') ||
                    paymentMethods.includes('Transferencia')) && (
                    <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-stone-900/60 border border-amber-500/20 text-amber-950 dark:text-stone-300 text-xs leading-relaxed flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>
                        Para pagos en Bolívares (Pago Móvil / Transferencia), el monto exacto se
                        calcula a la{' '}
                        <strong>
                          tasa oficial del Banco Central de Venezuela (BCV) vigente a la tasa del
                          día
                        </strong>
                        .
                      </p>
                    </div>
                  )}

                  {touched && errors.paymentMethods && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.paymentMethods}
                    </p>
                  )}
                </section>

                {/* WhatsApp CTA & Guarantee */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting || isScheduledInvalid}
                    className={`whatsapp-btn w-full font-bold shadow-xl shadow-emerald-600/25 text-sm sm:text-base py-4 ${
                      isSubmitting || isScheduledInvalid
                        ? 'opacity-60 cursor-not-allowed'
                        : 'cursor-pointer hover:brightness-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Generando Pedido...</span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/assets/images/whatsapp_logo.svg"
                          alt="WhatsApp"
                          width={24}
                          height={24}
                          className="w-6 h-6 shrink-0"
                        />
                        <span>Confirmar Pedido vía WhatsApp</span>
                      </>
                    )}
                  </button>

                  <div className="bg-muted/60 border border-border/80 rounded-2xl p-3.5 text-[11px] text-muted-foreground text-center space-y-1">
                    <p className="font-medium text-foreground">
                      📱 Destino oficial: <span className="font-bold">{STORE_WHATSAPP}</span>
                    </p>
                    <p>
                      Te responderemos al instante para confirmar la disponibilidad y coordinar la
                      entrega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
