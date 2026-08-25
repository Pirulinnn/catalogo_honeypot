'use client';

import React from 'react';
import { categories } from '@/data/products';

export interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  customCategories?: readonly { id: string; label: string }[] | { id: string; label: string }[];
  className?: string;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  customCategories = categories,
  className = '',
}: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtro por categorías de productos"
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 ${className}`}
    >
      {customCategories.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.id)}
            className={`
                            shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm
                            transition-all duration-200 cursor-pointer active:scale-95 select-none
                            ${
                              isActive
                                ? 'bg-amber-500 text-amber-950 font-bold shadow-sm border border-amber-400 ring-2 ring-amber-400/30'
                                : 'bg-amber-950/20 text-amber-900 dark:text-amber-100 hover:bg-amber-900/30 border border-amber-700/30 font-medium'
                            }
                        `}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
