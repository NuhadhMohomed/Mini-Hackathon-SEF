import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, ArrowLeft, Wheat, ArrowRight } from 'lucide-react';
import { useCart } from '@/features/cart/hooks/useCart';
import CartItem from '@/features/cart/components/CartItem';
import CartSummary from '@/features/cart/components/CartSummary';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    packagingFee,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <Link to="/products" className="hover:text-primary transition-colors">
          Weekly Bake Menu
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <span className="text-foreground font-medium">Batch Reservation</span>
      </nav>

      {/* 2. Page Landmark Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Your Batch Reservation
          </h1>
          <p className="text-sm text-secondary-foreground mt-1">
            Review your pre-order allotment for the Friday Nov 15 porchside drop.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors self-start sm:self-auto"
          >
            Clear entire basket
          </button>
        )}
      </div>

      {/* 3. Main Content: Empty State vs. 2-Column Cart Layout */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 sm:p-16 text-center space-y-5 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
            <Wheat className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Your Basket is Currently Empty
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              No hearth loaves or confections have been reserved yet. Explore our weekly sourdough bake menu to reserve before batch quotas fill.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/products">
              <Button className="gap-2 font-semibold">
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Weekly Bake Menu</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="font-serif text-base font-semibold text-foreground">
                  Reserved Items ({itemCount})
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  Allotment Guaranteed for 20 mins
                </span>
              </div>

              <div className="divide-y divide-border/60">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    compact={false}
                  />
                ))}
              </div>
            </div>

            {/* Back to Products CTA */}
            <div className="flex items-center justify-between">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Loaves to This Batch</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Checkout */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CartSummary
              subtotal={subtotal}
              packagingFee={packagingFee}
              total={total}
              itemCount={itemCount}
              onCheckout={handleCheckout}
              isDrawer={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
