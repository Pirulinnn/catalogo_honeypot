'use client';

import React from 'react';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import AppImage from '@/components/ui/AppImage';
import { Star, ShoppingBag, Eye, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onSelectProduct?: (product: Product) => void;
}

export default function ProductCard({ product, onSelectProduct }: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight,
        });
    };

    return (
        <div
            onClick={() => onSelectProduct?.(product)}
            className="group relative bg-card rounded-3xl overflow-hidden border border-border shadow-rustic hover:shadow-rustic-hover transition-all duration-300 flex flex-col cursor-pointer"
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {product.badge && (
                    <span className="bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        {product.badge}
                    </span>
                )}
                <span className="bg-emerald-950/70 backdrop-blur-md text-emerald-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-emerald-500/30">
                    <ShieldCheck size={12} /> {product.purity}% Pura
                </span>
            </div>

            {/* Image Container */}
            <div className="relative aspect-square w-full bg-muted overflow-hidden">
                <AppImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        <Eye size={14} /> Ver Detalles
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                        <span className="capitalize font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                            {product.category}
                        </span>
                        <span className="font-medium">{product.weight}</span>
                    </div>

                    <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                    </p>
                </div>

                {/* Rating & Pricing */}
                <div className="pt-2 border-t border-border flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 mb-0.5">
                            <Star size={13} className="fill-amber-500 text-amber-500" />
                            <span>{product.rating}</span>
                            <span className="text-muted-foreground text-[10px]">({product.reviewCount})</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-display text-xl font-bold text-foreground">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                            <span className="text-[10px] text-muted-foreground font-medium">USD</span>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-amber hover:bg-primary/90 active:scale-95 transition-all duration-200"
                        title="Agregar al Carrito"
                    >
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
