'use client';

import React, { useState, useMemo } from 'react';
import { products, categories, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import CategoryFilter from '@/components/CategoryFilter';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

export default function ProductCatalog() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('price-low');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesCategory =
                    selectedCategory === 'all' || product.category === selectedCategory;

                const q = searchQuery.trim().toLowerCase();
                const matchesSearch =
                    !q ||
                    product.name.toLowerCase().includes(q) ||
                    product.description.toLowerCase().includes(q) ||
                    product.origin.toLowerCase().includes(q);

                return matchesCategory && matchesSearch;
            })
            .sort((a, b) => {
                if (sortBy === 'price-high') return b.price - a.price;
                return a.price - b.price; // default: price-low
            });
    }, [selectedCategory, searchQuery, sortBy]);

    const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '';

    return (
        <section className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* Catalog Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-2 text-amber-800 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-200 px-3.5 py-1 rounded-full text-xs font-semibold">
                        <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
                        <span>Cosecha 100% Pura Artesanal</span>
                    </div>

                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                        Catálogo de Productos
                    </h1>

                    <p className="text-muted-foreground text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
                        Descubre nuestra selección de mieles puras, superalimentos de la colmena, snacks saludables y presentaciones al mayor.
                    </p>

                    {/* BCV Official Rate Informative Badge */}
                    <div className="flex items-center justify-center pt-1">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium shadow-xs">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span>Precios en USD • Pagos en Bs. calculados a <strong>tasa oficial BCV del día</strong></span>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Controls Container */}
                <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 sm:mb-10 shadow-rustic space-y-4">
                    {/* Top Row: Search Input & Sort Selector */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                        {/* 1. Search Bar */}
                        <div className="relative flex-1 max-w-full sm:max-w-md">
                            <Search
                                size={18}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Buscar mieles, polen, snacks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-9 py-2.5 bg-muted/60 border border-input rounded-xl sm:rounded-2xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Sort Selector */}
                        <div className="flex items-center gap-2 justify-end shrink-0">
                            <SlidersHorizontal size={15} className="text-muted-foreground shrink-0" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label="Ordenar productos por"
                                className="bg-muted/60 border border-input rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                            >
                                <option value="price-low">Precio: Menor a Mayor</option>
                                <option value="price-high">Precio: Mayor a Menor</option>
                            </select>
                        </div>
                    </div>

                    {/* 2. Barra de Categorías (Píldoras deslizables inmediatamente debajo del buscador) */}
                    <div className="border-t border-border/60 pt-3">
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            onSelectCategory={(catId) => setSelectedCategory(catId)}
                        />
                    </div>

                    {/* Active Filter Counter & Reset */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                        <span>
                            Mostrando <strong className="text-foreground">{filteredProducts.length}</strong> de {products.length} productos
                        </span>
                        {isFiltered && (
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                    setSortBy('price-low');
                                }}
                                className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                            >
                                <X size={13} />
                                <span>Limpiar filtros</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* 3. Products Grid / Empty States */}
                {selectedCategory === 'snacks' ? (
                    <div className="py-20 sm:py-28 text-center space-y-4 bg-card/60 rounded-3xl border border-dashed border-amber-500/30 max-w-lg mx-auto px-6 shadow-rustic">
                        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                            <Sparkles size={32} />
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                            Próximamente nuevos productos
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                            Estamos preparando nuevos y deliciosos productos en esta categoría. ¡Muy pronto estarán disponibles!
                        </p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-16 sm:py-20 text-center space-y-4 bg-muted/30 rounded-3xl border border-dashed border-border max-w-md mx-auto px-4">
                        <p className="text-4xl">🍯</p>
                        <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                            No encontramos productos
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            No hay resultados para tu búsqueda o filtro actual. Intenta cambiar de categoría o usar otros términos.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl transition-all"
                        >
                            Ver todos los productos
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelectProduct={(p) => setSelectedProduct(p)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}
