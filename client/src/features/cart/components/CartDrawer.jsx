import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Wheat } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    packagingFee,
    total,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleGoToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Basket Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-md bg-background h-full shadow-2xl flex flex-col border-l border-border animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/80 bg-surface-container-low/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Your Basket
            </h2>
            <span className="inline-flex items-center bg-secondary px-2 py-0.5 rounded-full text-xs font-mono font-semibold text-secondary-foreground">
              {itemCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close basket drawer"
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Items or Warm Empty State */}
        <div className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-border/60">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-secondary text-primary flex items-center justify-center">
                <Wheat className="w-7 h-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Your Basket is Empty
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Our Friday hearth drop is open for pre-orders. Choose your sourdough loaves and pastries before batch allotments fill.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  closeCart();
                  navigate('/products');
                }}
                className="gap-2 text-xs font-semibold"
              >
                <span>Browse Weekly Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Cart Summary & Actions */}
        {items.length > 0 && (
          <div className="border-t border-border/80 p-5 bg-card/90 backdrop-blur-sm space-y-3">
            <CartSummary
              subtotal={subtotal}
              packagingFee={packagingFee}
              total={total}
              itemCount={itemCount}
              onCheckout={handleGoToCheckout}
              isDrawer={true}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={handleGoToCart}
              className="w-full text-xs font-medium"
            >
              View Full Basket Page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
