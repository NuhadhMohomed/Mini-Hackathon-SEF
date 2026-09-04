import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import {
  MOCK_PRODUCTS,
  PRODUCT_CATEGORIES,
} from '@/features/products/services/productMockData';
import ProductFilters from '@/features/products/components/ProductFilters';
import ProductGrid from '@/features/products/components/ProductGrid';
import { Badge } from '@/components/ui/badge';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // 1. Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Availability filter
    if (availabilityFilter === 'in-stock') {
      result = result.filter((p) => p.available && p.remainingAllotment > 0);
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.flourProvenance?.toLowerCase().includes(q) ||
          p.categoryLabel?.toLowerCase().includes(q)
      );
    }

    // 4. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then prioritize in-stock
        const aStock = a.available && a.remainingAllotment > 0 ? 1 : 0;
        const bStock = b.available && b.remainingAllotment > 0 ? 1 : 0;
        return bStock - aStock;
      });
    }

    return result;
  }, [selectedCategory, availabilityFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setAvailabilityFilter('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  const handleAddToCart = (product) => {
    // Visual feedback placeholder (Cart state will be implemented in the Cart phase)
    console.log('Product selected for cart:', product.name);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Landmark & Breadcrumb Header */}
      <div className="space-y-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
          <span className="text-foreground font-medium">Weekly Bake Menu</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/70 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="warning" dot={true} className="text-[11px] font-semibold">
                Batch #84 Active
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                Porchside Pickup: Friday Nov 15
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
              Weekly Hearth Menu &amp; Pre-Orders
            </h1>
            <p className="text-sm sm:text-base text-secondary-foreground leading-relaxed">
              Every loaf is naturally leavened with our heritage wild starter, shaped by hand from stone-milled flours, and baked directly on hearth stone ovens.
            </p>
          </div>

          {/* Quick Sensory Commitment Badges */}
          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 text-xs text-muted-foreground bg-muted/40 p-3.5 rounded-xl border border-border/60">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary shrink-0" />
              <span>Hearth Baked at 240°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>36-Hour Wild Fermentation</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Zero Industrial Additives</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filters & Search */}
      <ProductFilters
        categories={PRODUCT_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        availabilityFilter={availabilityFilter}
        onAvailabilityChange={setAvailabilityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalResults={filteredProducts.length}
      />

      {/* 3. Product Catalog Grid */}
      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
