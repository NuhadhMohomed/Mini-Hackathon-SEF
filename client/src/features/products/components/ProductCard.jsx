import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Wheat, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/useCart';

export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const isAvailable = product.available && product.remainingAllotment > 0;
  const isLowStock = isAvailable && product.remainingAllotment <= 4;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart(product, 1);
    onAddToCart?.(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Card className="group overflow-hidden rounded-xl border border-border/80 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Visual Imagery Container with Aspect Ratio */}
        <Link
          to={`/products/${product.id}`}
          className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40 border-b border-border/50 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 ${
              !isAvailable ? 'grayscale-[40%] opacity-85' : ''
            }`}
          />

          {/* Top Floating Status Badges */}
          <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 pointer-events-none">
            {/* Availability Indicator (not relying on color alone) */}
            {isAvailable ? (
              <Badge
                variant={isLowStock ? 'warning' : 'success'}
                dot={true}
                className="shadow-sm font-medium backdrop-blur-sm pointer-events-auto"
              >
                {isLowStock ? `Only ${product.remainingAllotment} left` : 'Available'}
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                dot={true}
                className="shadow-sm font-medium backdrop-blur-sm pointer-events-auto"
              >
                Sold Out
              </Badge>
            )}

            {/* Category Chip */}
            <span className="inline-flex items-center rounded-full bg-card/90 px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground shadow-sm backdrop-blur-xs border border-border/50 pointer-events-auto">
              {product.categoryLabel || product.category}
            </span>
          </div>

          {/* Sold Out Watermark Overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
              <span className="rounded-lg bg-surface-container-high/95 px-3 py-1.5 text-xs font-semibold text-muted-foreground border border-border shadow-sm tracking-wide uppercase">
                Allotment Filled
              </span>
            </div>
          )}
        </Link>

        {/* Product Details Section */}
        <CardContent className="p-5 pb-2 space-y-2.5">
          {/* Provenance & Hydration Subtitle */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            {product.hydration && product.hydration !== 'N/A' && (
              <span className="font-mono font-medium text-primary">
                {product.hydration} Hydration
              </span>
            )}
            {product.hydration && product.hydration !== 'N/A' && (
              <span className="text-border-strong">•</span>
            )}
            <span className="truncate font-sans">
              {product.weight || product.fermentation}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground leading-snug">
            <Link
              to={`/products/${product.id}`}
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {product.name}
            </Link>
          </h3>

          {/* Tagline / Brief Description */}
          <p className="text-xs text-secondary-foreground/90 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Key Ingredient / Flour Note */}
          {product.flourProvenance && (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
              <Wheat className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span className="truncate">{product.flourProvenance}</span>
            </div>
          )}
        </CardContent>
      </div>

      {/* Card Action & Price Footer */}
      <CardFooter className="p-5 pt-3 border-t border-border/50 flex items-center justify-between gap-3 bg-muted/15">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
            Price
          </span>
          <span className="font-mono text-lg font-semibold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {isAvailable ? (
          <Button
            size="sm"
            onClick={handleAdd}
            className={`gap-1.5 font-medium rounded-lg shadow-sm transition-all duration-150 ${
              justAdded ? 'bg-success hover:bg-success text-white' : ''
            }`}
            aria-label={`Add ${product.name} to order for $${product.price.toFixed(2)}`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Reserved</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled
            className="gap-1.5 text-xs text-muted-foreground cursor-not-allowed opacity-60"
            aria-label={`${product.name} is sold out`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Batch Filled</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
