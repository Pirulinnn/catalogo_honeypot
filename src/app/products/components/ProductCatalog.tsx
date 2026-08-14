'use client';

import React, { useState, useMemo } from 'react';
import { products, categories, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ProductCatalog() {
    const [selectedCategory, setSelectedCategory] = useState<string>('todos');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('price-low');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesCategory =
                    selectedCategory === 'todos' || product.category === selectedCategory;
                const matchesSearch =
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.origin.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            })
            .sort((a, b) => {
                if (sortBy === 'price-high') return b.price - a.price;
                return a.price - b.price; // default: price-low
            });
    }, [selectedCategory, searchQuery, sortBy]);

    return (
        <section className="pt-32 pb-24 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Catalog Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full text-xs font-semibold">
                        <Sparkles size={14} className="text-amber-600" />
                        <span>Cosecha 100% Pura Artesanal</span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                        Catálogo de Mieles Puras
                    </h1>

                    <p className="text-muted-foreground text-base leading-relaxed">
                        Explora nuestra variedad de mieles florales, silvestres, infusionadas y de colección premium. Cada una con su perfil único de sabor, textura y notas botánicas.
                    </p>
                </div>

                {/* Filters & Search Controls */}
                <div className="bg-card border border-border rounded-3xl p-5 mb-10 shadow-rustic space-y-5">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar por flor o nombre..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-muted/60 border border-input rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                            />
                        </div>

                        {/* Category Buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                        selectedCategory === cat.id
                                            ? 'bg-primary text-primary-foreground shadow-amber scale-105'
                                            : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort Selector - 2 Opciones Únicamente */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                            <SlidersHorizontal size={16} className="text-muted-foreground shrink-0" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-muted/60 border border-input rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                            >
                                <option value="price-low">Precio: Menor a Mayor</option>
                                <option value="price-high">Precio: Mayor a Menor</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filter Count */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                        <span>
                            Mostrando <strong className="text-foreground">{filteredProducts.length}</strong> de {products.length} productos
                        </span>
                        {(selectedCategory !== 'todos' || searchQuery !== '') && (
                            <button
                                onClick={() => {
                                    setSelectedCategory('todos');
                                    setSearchQuery('');
                                    setSortBy('price-low');
                                }}
                                className="text-amber-700 font-semibold hover:underline"
                            >
                                Limpiar Filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="py-20 text-center space-y-4 bg-muted/30 rounded-3xl border border-dashed border-border max-w-md mx-auto">
                        <p className="text-3xl">🍯</p>
                        <h3 className="font-display font-semibold text-lg text-foreground">No encontramos coincidencia</h3>
                        <p className="text-xs text-muted-foreground">
                            Intenta cambiar la categoría o término de búsqueda.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}
