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
  HeartHandshake,
  Utensils,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/features/products/services/productService';
import { MOCK_PRODUCTS } from '@/features/products/services/productMockData';
import ProductCard from '@/features/products/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const { data: products = MOCK_PRODUCTS } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
    staleTime: 1000 * 60 * 2,
  });

  const featuredProducts = products.filter((p) => p.featured || p.available).slice(0, 4);

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
            <span>Explore All {products.length} Bakes</span>
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

      {/* 4. ABOUT THE MILL & GRAIN PROVENANCE */}
      <section id="about" className="scroll-mt-20 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/70 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[11px] font-semibold uppercase tracking-wider">
                Grain Provenance &amp; Mill
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                Skagit Valley · Washington State
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              About the Mill: Stone-Ground with Intention
            </h2>
            <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
              We partner exclusively with independent regenerative farms and regional stone-mills like Cairnspring Mills and Bluebird Grain Farms. Never bleached, bromated, or industrially expedited.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold bg-secondary px-3 py-1.5 rounded-xl self-start sm:self-end">
            <Wheat className="w-4 h-4" />
            <span>100% Certified Organic &amp; Non-GMO</span>
          </div>
        </div>

        {/* 3 Sensory Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 space-y-4 hover:border-primary/40 transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
              <Wheat className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Slow Stone Grinding
              </h3>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                Industrial roller mills strip away the germ and outer bran. Our regional partners grind whole grain berries between slow-rotating French granite stones at temperatures under 35°C, preserving essential fatty acids, vitamins, and sweet nutty aromatics.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cairnspring Yecora Rojo &amp; Trailblazer</span>
            </div>
          </Card>

          {/* Pillar 2 */}
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 space-y-4 hover:border-primary/40 transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Regenerative Soil Partners
              </h3>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                We know every farmer who grows our wheat. Our grain growers practice rotational cover cropping, low-disturbance soil care, and zero synthetic nitrogen fertilizer—restoring regional topsoil health while producing grain with remarkable mineral richness.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bluebird Grain Farms &amp; Skagit Valley</span>
            </div>
          </Card>

          {/* Pillar 3 */}
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 space-y-4 hover:border-primary/40 transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
              <Flame className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                36-Hour Wild Levain Ferment
              </h3>
              <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                Living flour needs time. We culture our doughs exclusively with our century-old orchard sourdough starter over a 36-hour cold proof. This allows wild lactobacilli to pre-digest gluten proteins and unlock the complex caramel tones in the hearth stone bake.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Zero Commercial Yeasts or Additives</span>
            </div>
          </Card>
        </div>

        {/* Provenance Stat Strip */}
        <div className="rounded-2xl border border-border/70 bg-surface-container-low/60 p-6 flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="space-y-1">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-primary">100%</span>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Stone-Ground Heritage Grain
            </p>
          </div>
          <div className="h-8 w-px bg-border/80 hidden sm:block" />
          <div className="space-y-1">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-primary">&lt; 35°C</span>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Cold Burr Mill Temp
            </p>
          </div>
          <div className="h-8 w-px bg-border/80 hidden sm:block" />
          <div className="space-y-1">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-primary">36 Hrs</span>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Slow Cold Fermentation
            </p>
          </div>
          <div className="h-8 w-px bg-border/80 hidden sm:block" />
          <div className="space-y-1">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-primary">0%</span>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Bleach, Bromate, or Additives
            </p>
          </div>
        </div>
      </section>

      {/* 5. BAKEHOUSE NOTE FROM HEAD BAKER */}
      <section id="bakers-note" className="scroll-mt-20 space-y-8">
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-surface-container-low/50 to-card p-8 sm:p-12 shadow-sm space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/70">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="warning" dot={true} className="text-[11px] font-semibold">
                  From the Hearthstone
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  Julian Hayes · Head Baker &amp; Founder
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                A Note from the Bakehouse Hearth
              </h2>
              <p className="text-xs sm:text-sm text-secondary-foreground">
                Reflections on slow baking, living levain, and how to honor the loaf in your home.
              </p>
            </div>

            {/* Baker Seal Avatar */}
            <div className="flex items-center gap-3 p-2 bg-background/80 rounded-xl border border-border/70 self-start sm:self-auto">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-serif font-bold text-sm flex items-center justify-center shrink-0">
                JH
              </div>
              <div className="text-left text-xs">
                <p className="font-semibold text-foreground">Julian Hayes</p>
                <p className="text-[10px] text-muted-foreground font-mono">Head Baker · Orchard Lane</p>
              </div>
            </div>
          </div>

          {/* Letter Body */}
          <div className="prose prose-stone max-w-none text-secondary-foreground space-y-4 text-xs sm:text-sm sm:leading-relaxed font-sans">
            <p>
              Every Thursday night as the orchard outside cools down, our bakehouse begins to stir. The levain has reached peak activity—airy, fragrant with green apple and wild floral acidity, and ready to be gently folded into freshly milled Cairnspring wheat.
            </p>
            <p>
              By 4:00 AM Friday, the volcanic stone hearth is roaring at 240°C. Each loaf is turned out of its willow banneton, hand-scored with a curved lame, and loaded directly onto the stone with a burst of steam. What emerges an hour later is bread in its oldest and truest form: dark mahogany blisters, deeply caramelized ear, and a tender, custardy crumb that stays moist for days.
            </p>
            <p>
              Because we bake strictly to order, the loaf in your reserved cubby was pulled from the stone just hours before your pickup window. Here is how we recommend caring for it once you take it home:
            </p>
          </div>

          {/* Baker's Care Ritual - 3 Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>1. Let It Settle First</span>
              </div>
              <p className="text-xs text-secondary-foreground leading-relaxed">
                Resist cutting into your loaf while warm from the locker. Sourdough completes its internal gelatinization as it cools. Wait 90 minutes for the crumb to set into clean, chewy slices.
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Utensils className="w-4 h-4 text-primary shrink-0" />
                <span>2. Breathable Storage Only</span>
              </div>
              <p className="text-xs text-secondary-foreground leading-relaxed">
                Store your cut loaf face-down on a wooden butcher block or wrapped in our breathable linen bag. Never store in plastic or the refrigerator, which speeds starch retrogradation and ruins the crust.
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Flame className="w-4 h-4 text-primary shrink-0" />
                <span>3. Revive the Crust</span>
              </div>
              <p className="text-xs text-secondary-foreground leading-relaxed">
                On days 3 through 5, splash the whole loaf or slice with a mist of cold water and bake at 200°C (400°F) for 6–8 minutes. The blistered crust will instantly crackle like fresh from the hearth.
              </p>
            </div>
          </div>

          {/* Baker Sign-off */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-serif text-sm font-semibold text-foreground italic">
                “Eat with salted butter, good olive oil, or simply tear with your hands.”
              </p>
              <p className="text-muted-foreground mt-0.5">
                — Julian &amp; the Crumb &amp; Bloom Hearth Team
              </p>
            </div>

            <Link to="/products">
              <Button size="sm" className="gap-2 font-semibold">
                <span>Reserve Batch #84 Loaves</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
