'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, MapPin, User, Phone } from 'lucide-react';
import { CartItem } from '@/store/cartStore';

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    total: number;
}

export default function WhatsAppModal({ isOpen, onClose, items, total }: WhatsAppModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSend = () => {
        const itemsList = items
            .map((i) => `• ${i.name} (${i.weight}) x${i.quantity} = $${(i.price * i.quantity).toLocaleString('en-US')} USD`)
            .join('\n');

        const message = encodeURIComponent(
            `¡Hola Honeypot! 🍯 Quiero realizar un pedido:\n\n${itemsList}\n\n*Total: $${total.toLocaleString('en-US')} USD*\n\nDatos de entrega:\nNombre: ${name}\nTeléfono: ${phone}\nDirección: ${address}`
        );

        window.open(`https://wa.me/5215500000000?text=${message}`, '_blank');
        onClose();
    };

    const inputClass =
        'w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all placeholder:text-muted-foreground';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 modal-overlay"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative bg-background rounded-3xl shadow-2xl w-full max-w-md p-6 z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                    <MessageCircle size={18} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-foreground">Finalizar Pedido</h3>
                                    <p className="text-xs text-muted-foreground">Vía WhatsApp</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-muted rounded-xl p-4 mb-5 space-y-1.5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Resumen del Pedido
                            </p>
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-foreground truncate mr-2">
                                        {item.name} x{item.quantity}
                                    </span>
                                    <span className="text-primary font-medium shrink-0">
                                        ${(item.price * item.quantity).toLocaleString('en-US')} USD
                                    </span>
                                </div>
                            ))}
                            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                                <span className="text-foreground">Total</span>
                                <span className="text-primary">${total.toLocaleString('en-US')} USD</span>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-3 mb-5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Datos de Entrega
                            </p>
                            <div className="relative">
                                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Tu nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`${inputClass} pl-9`}
                                />
                            </div>
                            <div className="relative">
                                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="tel"
                                    placeholder="Tu número de teléfono"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`${inputClass} pl-9`}
                                />
                            </div>
                            <div className="relative">
                                <MapPin size={15} className="absolute left-3 top-3.5 text-muted-foreground" />
                                <textarea
                                    placeholder="Dirección de entrega"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows={2}
                                    className={`${inputClass} pl-9 resize-none`}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={!name || !phone || !address}
                            className="whatsapp-btn w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <MessageCircle size={18} />
                            Enviar Pedido por WhatsApp
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}