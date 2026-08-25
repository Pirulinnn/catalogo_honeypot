'use client';

import React from 'react';
import ProductCatalog from '@/app/products/components/ProductCatalog';

/**
 * Catalog Component
 * Re-exports the main ProductCatalog component for use across the application.
 */
export default function Catalog() {
  return <ProductCatalog />;
}
