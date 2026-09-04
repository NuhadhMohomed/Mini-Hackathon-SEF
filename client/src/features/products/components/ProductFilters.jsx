import React from 'react';
import { Search, ArrowUpDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductFilters({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  availabilityFilter = 'all',
  onAvailabilityChange,
  sortBy = 'featured',
  onSortChange,
  searchQuery = '',
  onSearchChange,
  totalResults = 0,
}) {
  return (
    <div className="space-y-4 pb-2">
      {/* 1. Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <Button
              key={cat.id}
              type="button"
              variant={isActive ? 'pillActive' : 'pill'}
              size="pill"
              onClick={() => onSelectCategory?.(cat.id)}
              className="shrink-0 transition-all cursor-pointer"
              aria-pressed={isActive}
            >
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* 2. Controls Bar: Search, Availability Filter, and Sorting */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Real-time Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search sourdough, heritage grain, focaccia..."
            className="pl-9 pr-8 h-9 text-xs sm:text-sm bg-card rounded-lg border-input focus-visible:ring-primary/20"
            aria-label="Search baked goods"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Secondary Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Availability Toggle */}
          <div className="flex items-center rounded-lg border border-input bg-card p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onAvailabilityChange?.('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                availabilityFilter === 'all'
                  ? 'bg-secondary text-secondary-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => onAvailabilityChange?.('in-stock')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                availabilityFilter === 'in-stock'
                  ? 'bg-secondary text-secondary-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              In Stock Only
            </button>
          </div>

          {/* Sort Dropdown Selector */}
          <div className="relative inline-flex items-center">
            <label htmlFor="catalog-sort" className="sr-only">
              Sort offerings
            </label>
            <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-input bg-card text-xs text-foreground focus-within:ring-2 focus-within:ring-primary/20">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => onSortChange?.(e.target.value)}
                className="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-0.5">
        <span>
          Showing <strong className="font-mono font-medium text-foreground">{totalResults}</strong> handcrafted {totalResults === 1 ? 'item' : 'items'}
        </span>
        {(selectedCategory !== 'all' || availabilityFilter !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory?.('all');
              onAvailabilityChange?.('all');
              onSearchChange?.('');
            }}
            className="text-primary hover:underline text-xs font-medium inline-flex items-center gap-1"
          >
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
