import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Clock,
  ChevronRight,
  Wheat,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { getAllOrders } from '@/features/orders/services/orderMockData';
import { MOCK_PRODUCTS } from '@/features/products/services/productMockData';
import { useCart } from '@/features/cart/hooks/useCart';
import CustomerOrderCard from '@/features/orders/components/CustomerOrderCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'past'
  const [reorderStatus, setReorderStatus] = useState(null); // { successCount, skipped: [] }
  const { addToCart, openCart } = useCart();

  const allOrders = useMemo(() => getAllOrders(), []);

  const activeOrders = useMemo(() => {
    return allOrders.filter(
      (o) => o.isActive !== false && o.status !== 'Fulfilled' && o.status !== 'Cancelled'
    );
  }, [allOrders]);

  const pastOrders = useMemo(() => {
    return allOrders.filter(
      (o) => o.isActive === false || o.status === 'Fulfilled' || o.status === 'Cancelled'
    );
  }, [allOrders]);

  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

  // Handle Re-order Action using existing useCart()
  const handleReorder = (order) => {
    if (!order?.items || order.items.length === 0) return;

    let addedCount = 0;
    const skippedNames = [];

    order.items.forEach((item) => {
      // Find matching live product in catalog
      const product = MOCK_PRODUCTS.find(
        (p) => p.id === item.productId || p.name.toLowerCase() === item.name.toLowerCase()
      );

      if (product && product.available && product.remainingAllotment > 0) {
        const added = addToCart(product, item.quantity);
        if (added) {
          addedCount += item.quantity;
        } else {
          skippedNames.push(item.name);
        }
      } else {
        skippedNames.push(item.name);
      }
    });

    setReorderStatus({
      orderNumber: order.orderNumber,
      addedCount,
      skipped: skippedNames,
    });

    // Auto-dismiss or allow user to inspect
    setTimeout(() => {
      setReorderStatus(null);
    }, 6000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <span className="text-foreground font-medium">Customer Portal</span>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <span className="text-foreground font-medium">My Orders</span>
      </nav>

      {/* 2. Page Landmark Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/70 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-semibold">
              Patron Ledger
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              Crumb &amp; Bloom Porchside Reservation System
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Hearth Order History &amp; Passes
          </h1>
          <p className="text-xs sm:text-sm text-secondary-foreground max-w-xl leading-relaxed">
            Review your active digital pickup passes, locker access PINs, and past hearth drop allocations.
          </p>
        </div>

        <Link to="/products" className="shrink-0">
          <Button size="sm" className="gap-2 font-semibold shadow-sm">
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Weekly Menu</span>
          </Button>
        </Link>
      </div>

      {/* 3. Re-order Result Feedback Alert */}
      {reorderStatus && (
        <div
          role="status"
          className="rounded-xl border border-primary/30 bg-card p-4 shadow-sm space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Check className="w-4 h-4 text-success shrink-0" />
              <span>
                Added {reorderStatus.addedCount} items from {reorderStatus.orderNumber} to your basket!
              </span>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Open Basket
            </button>
          </div>

          {reorderStatus.skipped.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-amber-800 bg-warning-bg/70 p-2.5 rounded-lg border border-warning/30">
              <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Some items ({reorderStatus.skipped.join(', ')}) could not be added because their batch allotments are currently filled.
              </span>
            </div>
          )}
        </div>
      )}

      {/* 4. Tab Segmented Navigation */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'active'}
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 -mb-1 flex items-center gap-2 cursor-pointer ${
            activeTab === 'active'
              ? 'border-primary text-primary'
              : 'border-transparent text-secondary-foreground hover:text-foreground'
          }`}
        >
          <span>Active Pickups</span>
          <span className="inline-flex items-center bg-secondary px-2 py-0.5 rounded-full text-xs font-mono font-medium text-secondary-foreground">
            {activeOrders.length}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'past'}
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 -mb-1 flex items-center gap-2 cursor-pointer ${
            activeTab === 'past'
              ? 'border-primary text-primary'
              : 'border-transparent text-secondary-foreground hover:text-foreground'
          }`}
        >
          <span>Past Hearth Drops</span>
          <span className="inline-flex items-center bg-secondary px-2 py-0.5 rounded-full text-xs font-mono font-medium text-secondary-foreground">
            {pastOrders.length}
          </span>
        </button>
      </div>

      {/* 5. Orders List or Empty State */}
      {displayedOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 sm:p-16 text-center space-y-4 max-w-lg mx-auto my-6">
          <div className="w-14 h-14 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
            {activeTab === 'active' ? (
              <Clock className="w-7 h-7 stroke-[1.5]" />
            ) : (
              <Package className="w-7 h-7 stroke-[1.5]" />
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {activeTab === 'active'
                ? 'No Active Porch Pickups'
                : 'No Past Hearth Drops'}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {activeTab === 'active'
                ? 'You do not have any pending batch orders. Reserve freshly baked loaves from our upcoming Friday drop.'
                : 'Your completed order history will appear here after your loaves are collected from our porchside lockers.'}
            </p>
          </div>
          {activeTab === 'active' && (
            <div className="pt-2">
              <Link to="/products">
                <Button className="gap-2 font-semibold text-xs">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Reserve Sourdough Batch</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {displayedOrders.map((order) => (
            <CustomerOrderCard
              key={order.id}
              order={order}
              onReorder={handleReorder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
