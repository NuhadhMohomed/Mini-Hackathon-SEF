import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const INVENTORY_CATEGORIES = ['All', 'Flours & Grains', 'Fats & Dairy', 'Spices & Sweeteners'];

export default function InventoryFilter({
  searchQuery = '',
  onSearchChange,
  activeCategory = 'All',
  onCategoryChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Filter ingredients by name or unit..."
          className="pl-9 text-xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {INVENTORY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange && onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface-container text-secondary-foreground hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
