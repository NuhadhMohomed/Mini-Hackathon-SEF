import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Wheat,
  Clock,
  Flame,
  ShieldAlert,
  ChevronRight,
  ArrowLeft,
  Check,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/features/products/services/productMockData';
import QuantityControl from '@/components/common/QuantityControl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/features/cart/hooks/useCart';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const { addToCart, openCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Reset state when switching between products
  useEffect(() => {
    setQuantity(1);
    setAddedNotice(false);
  }, [id]);

  // 1. Invalid Product State (Graceful fallback)
  if (!product) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
          <Wheat className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Loaf Not in This Hearth Run
          </h1>
          <p className="text-sm text-secondary-foreground">
            We couldn’t find an artisan offering with ID <span className="font-mono text-primary font-medium">"{id}"</span> in our current weekly bake menu. It may have been scheduled for a different batch.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/products">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Weekly Menu</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = product.available && product.remainingAllotment > 0;
  const isLowStock = isAvailable && product.remainingAllotment <= 4;
  const maxAllowedQuantity = Math.max(1, product.remainingAllotment || 1);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 4000);
  };

  const lineSubtotal = (product.price * quantity).toFixed(2);

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <Link to="/products" className="hover:text-primary transition-colors">
          Weekly Bake Menu
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <span className="text-foreground font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main 2-Column Sensory Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual Imagery & Baker's Note */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`h-full w-full object-cover ${
                !isAvailable ? 'grayscale-[35%] opacity-85' : ''
              }`}
            />

            {/* Availability Badge Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
              {isAvailable ? (
                <Badge
                  variant={isLowStock ? 'warning' : 'success'}
                  dot={true}
                  className="shadow-sm font-semibold text-xs px-3 py-1 backdrop-blur-md pointer-events-auto"
                >
                  {isLowStock
                    ? `Only ${product.remainingAllotment} loaves left in batch`
                    : `Batch Open · ${product.remainingAllotment} of ${product.totalBatchCap} remaining`}
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  dot={true}
                  className="shadow-sm font-semibold text-xs px-3 py-1 backdrop-blur-md pointer-events-auto"
                >
                  Sold Out for Batch #84
                </Badge>
              )}

              <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-secondary-foreground shadow-sm backdrop-blur-xs border border-border/60 pointer-events-auto">
                {product.categoryLabel || product.category}
              </span>
            </div>
          </div>

          {/* Baker's Hearth Note Card */}
          {product.bakerNotes && (
            <Card className="border-border/70 bg-surface-container-low/60 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span>Baker’s Hearth &amp; Slicing Note</span>
              </div>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                {product.bakerNotes}
              </p>
            </Card>
          )}
        </div>

        {/* Right Column: Artisan Details, Metrics & Order Action */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>{product.weight}</span>
              {product.weight && <span>•</span>}
              <span className="uppercase text-primary font-semibold tracking-wider">
                {product.categoryLabel}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm sm:text-base text-secondary-foreground italic leading-relaxed">
                "{product.tagline}"
              </p>
            )}

            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                per {product.weight ? product.weight : 'unit'} · pre-order allocation
              </span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
              The Artisan Story
            </h2>
            <p className="text-sm sm:text-base text-secondary-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Bakery Metrics Grid (JetBrains Mono) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.hydration && product.hydration !== 'N/A' && (
              <div className="rounded-xl border border-border/80 bg-card p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Wheat className="w-3.5 h-3.5 text-primary" />
                  <span>Hydration</span>
                </div>
                <p className="font-mono text-lg font-semibold text-foreground">
                  {product.hydration}
                </p>
              </div>
            )}

            <div className="rounded-xl border border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Proof Time</span>
              </div>
              <p className="font-mono text-xs sm:text-sm font-semibold text-foreground truncate">
                {product.fermentation || 'Slow Hearth Proof'}
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Flame className="w-3.5 h-3.5 text-primary" />
                <span>Batch Cap</span>
              </div>
              <p className="font-mono text-lg font-semibold text-foreground">
                {product.totalBatchCap} <span className="text-xs font-normal text-muted-foreground">units</span>
              </p>
            </div>
          </div>

          {/* Flour Provenance & Terroir */}
          {product.flourProvenance && (
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Wheat className="w-4 h-4 text-primary shrink-0" />
                <span>Grain Provenance &amp; Mill</span>
              </div>
              <p className="text-xs sm:text-sm text-secondary-foreground">
                {product.flourProvenance}
              </p>
            </div>
          )}

          {/* Allergen Information (Not relying on color alone) */}
          {product.allergens && product.allergens.length > 0 && (
            <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <ShieldAlert className="w-4 h-4 text-warning shrink-0" />
                <span>Allergen Transparency</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.allergens.map((allergen, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground border border-border/50"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Crafted in a micro-bakery that handles flour, dairy, eggs, seeds, and tree nuts.
              </p>
            </div>
          )}

          {/* Reservation Action Box */}
          <Card className="rounded-xl border-2 border-primary/20 bg-surface-container-lowest p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider block">
                  Select Quantity
                </span>
                <span className="text-xs text-muted-foreground">
                  {isAvailable
                    ? `Up to ${maxAllowedQuantity} allowed for this drop`
                    : 'Allotment filled'}
                </span>
              </div>

              {isAvailable ? (
                <QuantityControl
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={maxAllowedQuantity}
                  disabled={!isAvailable}
                  size="default"
                />
              ) : (
                <span className="text-xs font-semibold text-destructive uppercase">
                  Unavailable
                </span>
              )}
            </div>

            <Separator />

            {/* Subtotal & Confirmation CTA */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-secondary-foreground">
                  Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'}):
                </span>
                <span className="font-mono text-2xl font-bold text-primary">
                  ${lineSubtotal}
                </span>
              </div>

              {isAvailable ? (
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full gap-2 text-base font-semibold min-h-[48px] shadow-sm active:scale-[0.99]"
                  aria-label={`Reserve ${quantity} ${product.name} for $${lineSubtotal}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Reserve &amp; Add to Bag • ${lineSubtotal}</span>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  disabled
                  className="w-full gap-2 text-sm text-muted-foreground cursor-not-allowed opacity-60 min-h-[48px]"
                >
                  <span>Batch #84 Capacity Reached</span>
                </Button>
              )}

              {/* Added Feedback Notice */}
              {addedNotice && (
                <div
                  role="status"
                  className="rounded-lg bg-success-bg text-success-text border border-success/30 p-3 flex items-center justify-between gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>
                      Added <strong>{quantity} × {product.name}</strong> to your batch reservation.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={openCart}
                      className="underline font-semibold hover:opacity-80 cursor-pointer"
                    >
                      View Basket
                    </button>
                    <span>•</span>
                    <Link to="/products" className="underline font-semibold hover:opacity-80">
                      Browse more
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                <Calendar className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                <span>Porchside Pickup: Friday Nov 15 (08:30 – 11:30 AM) at 42 Orchard Lane</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
