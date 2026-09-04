import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wheat,
  Flame,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/features/products/services/productMockData';
import ProductCard from '@/features/products/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. SENSORY EDITORIAL HERO */}
      <section className="relative pt-4 sm:pt-8 space-y-8">
        <div className="max-w-3xl space-y-4">
          {/* Live Hearth Drop Status Badge */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge variant="warning" dot={true} className="text-xs px-3 py-1 font-semibold">
              Batch #84 Hearth Drop Open
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">
              Friday Nov 15 · <strong className="text-foreground">78%</strong> Pre-Reserved
            </span>
          </div>

          {/* Main Display Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.12]">
            Slow-ferment hearth bakes, stone-milled with intention.
          </h1>

          {/* Sensory Positioning Subtitle */}
          <p className="text-base sm:text-lg text-secondary-foreground leading-relaxed max-w-2xl font-sans">
            Every loaf is cold-fermented for 36 hours using Pacific Northwest heritage grains and our hundred-year wild levain. Pre-order your weekly share for porchside locker pickup at 42 Orchard Lane.
          </p>

          {/* Hero Call to Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link to="/products">
              <Button size="lg" className="w-full sm:w-auto gap-2.5 font-semibold px-8 min-h-[48px] text-base shadow-sm active:scale-[0.99]">
                <span>Order Online</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/my-orders">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 min-h-[48px] text-sm">
                <span>View My Pickup Passes</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Visual Imagery Feature */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-border/80 bg-muted/40 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80"
            alt="Handcrafted artisan sourdough loaf cooling on a wooden baker's table with stone-ground flour dusting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Bottom Floating Craft Annotations */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border/60 text-secondary-foreground shadow-xs">
              <Flame className="w-4 h-4 text-primary shrink-0" />
              <span>Baked directly on volcanic hearth stone at 240°C</span>
            </div>

            <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border/60 text-secondary-foreground shadow-xs font-mono">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Next Porch Pickup: Friday 08:30 – 11:30 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP PROCESS JOURNEY */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="outline" className="text-[11px] font-semibold uppercase tracking-wider">
            The Reservation Model
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            How the Hearth Reservation Works
          </h2>
          <p className="text-xs sm:text-sm text-secondary-foreground">
            We bake strictly to order, eliminating bakery waste while guaranteeing maximum crumb freshness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 01: Fermentation */}
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 space-y-4 hover:border-primary/30 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
                <Wheat className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="font-mono text-2xl font-bold text-muted-foreground/60">
                01
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Slow Fermentation
              </h3>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                We mill organic Skagit Valley heritage grain fresh each dawn. Doughs are leavened with wild orchard yeasts and undergo a 36-hour cold ferment to unlock deep flavor and optimal digestibility.
              </p>
            </div>
          </Card>

          {/* Step 02: Reserve Batch */}
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 space-y-4 hover:border-primary/30 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
                <Flame className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="font-mono text-2xl font-bold text-muted-foreground/60">
                02
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Reserve Your Batch
              </h3>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                Browse our weekly Friday hearth offerings online. Secure your sourdough boules, focaccias, and cardamom morning buns before the limited oven allotment fills.
              </p>
            </div>
          </Card>

          {/* Step 03: Porchside Pickup */}
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 space-y-4 hover:border-primary/30 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
                <MapPin className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="font-mono text-2xl font-bold text-muted-foreground/60">
                03
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Porchside Locker Pickup
              </h3>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                Collect your warm order from our temperature-controlled porch locker cubbies at 42 Orchard Lane using your digital pass and 4-digit PIN code at your scheduled arrival window.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. FEATURED WEEKLY BAKES */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/70 pb-5">
          <div className="space-y-1.5">
            <Badge variant="warning" dot={true} className="text-[11px] font-semibold">
              Batch #84 Highlights
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Featured Weekly Hearth Bakes
            </h2>
            <p className="text-xs sm:text-sm text-secondary-foreground">
              Selected heritage loaves and confections hand-shaped for this Friday’s bake.
            </p>
          </div>

          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Explore All {MOCK_PRODUCTS.length} Bakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid Reusing ProductCard.jsx */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/products">
            <Button size="lg" variant="outline" className="gap-2 font-semibold px-8">
              <span>View Full Weekly Hearth Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. HERITAGE PROVENANCE PROMISE */}
      <section className="rounded-2xl border border-border/80 bg-surface-container-low/60 p-8 sm:p-12 space-y-6 text-center max-w-4xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
          <Sparkles className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Our Stone-Ground Commitment
          </h2>
          <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
            We partner exclusively with independent regenerative farms and regional stone-mills like Cairnspring Mills and Bluebird Grain Farms. Never bleached, bromated, or industrially expedited.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground font-mono pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" /> 100% Unbleached Grain
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" /> 36-Hr Wild Ferment
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" /> Zero Synthetic Dough Conditioners
          </span>
        </div>
      </section>
    </div>
  );
}
