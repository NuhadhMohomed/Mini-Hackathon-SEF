import React from 'react';
import { Wheat, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductGrid({ products = [], onAddToCart, onResetFilters }) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center space-y-4 my-6 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
          <Wheat className="w-6 h-6 stroke-[1.75]" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif text-lg font-semibold text-foreground">
            No Baked Goods Found
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            We couldn’t find any offerings matching your selected filters or search terms. Try adjusting your category or availability criteria.
          </p>
        </div>
        {onResetFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="gap-1.5 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
