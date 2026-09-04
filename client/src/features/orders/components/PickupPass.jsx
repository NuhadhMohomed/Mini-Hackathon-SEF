import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PickupPass({ order }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopyCode = () => {
    if (order.accessPin || order.pickupCode) {
      navigator.clipboard?.writeText(order.accessPin || order.pickupCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Baker's Physical Tag Container */}
      <div className="relative rounded-2xl border-2 border-dashed border-primary/40 bg-card p-6 sm:p-8 shadow-sm overflow-hidden selection:bg-secondary">
        {/* Decorative Baker's Tag Hole / Notches */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-dashed border-primary/40 bg-background" />

        {/* 1. Header Wordmark & Pass Seal */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-2 pb-5 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-primary">
                Official Hearth Token
              </span>
              <Badge variant="success" dot={true} className="text-[10px] font-semibold py-0.5">
                {order.status || 'Ready for Porch'}
              </Badge>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
              Porchside Pickup Pass
            </h2>
            <p className="text-xs text-muted-foreground">
              Crumb &amp; Bloom Micro-Bakery · 42 Orchard Lane
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
              Order Reference
            </span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-primary">
              {order.orderNumber || `#${order.id}`}
            </span>
          </div>
        </div>

        {/* 2. High-Contrast Pickup PIN Box */}
        <div className="py-6 space-y-3">
          <div className="rounded-xl border border-input bg-surface-container-low/80 p-4 sm:p-6 text-center space-y-2">
            <span className="text-xs uppercase font-semibold text-secondary-foreground tracking-wider block">
              Locker Touchscreen 4-Digit Unlock Code
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-4xl sm:text-5xl font-bold text-foreground tracking-[0.25em] pl-3 py-1 select-all">
                {order.accessPin || '8492'}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label="Copy pickup code"
                className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors cursor-pointer"
                title="Copy unlock code"
              >
                {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {order.cubbyNumber || 'Porch Cubby B-4'} · Touchscreen locker wall at hearth entryway
            </p>
          </div>
        </div>

        {/* 3. Slot Schedule, Location & Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-border/70 text-xs sm:text-sm">
          <div className="space-y-1 rounded-xl bg-card border border-border/60 p-3.5">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
              Reserved Pickup Window
            </span>
            <p className="font-mono font-semibold text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{order.pickupSlot || 'Friday Nov 15 · 08:30 – 10:00 AM'}</span>
            </p>
            <p className="text-[11px] text-secondary-foreground">
              Loaves baked and bagged 30 minutes prior to window.
            </p>
          </div>

          <div className="space-y-1 rounded-xl bg-card border border-border/60 p-3.5">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
              Registered Patron
            </span>
            <p className="font-semibold text-foreground truncate">
              {order.customer?.name || 'Artisan Bread Lover'}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {order.customer?.phone}
            </p>
          </div>
        </div>

        {/* 4. Digital QR Code Scanning Area Placeholder */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center gap-5 justify-between">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Contactless Locker Scanner</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Hold this digital barcode up to the optical reader beneath the touchscreen to automatically spring your reserved locker open.
            </p>
            <span className="inline-block text-[10px] font-mono text-muted-foreground">
              TOKEN: {order.pickupCode || 'CRUMB-8492'}
            </span>
          </div>

          {/* Visual QR Code Placeholder (No foreign packages, crafted with SVG guides) */}
          <div
            className="w-32 h-32 shrink-0 rounded-xl border-2 border-border bg-white p-2.5 flex flex-col items-center justify-between shadow-xs relative"
            aria-label="QR Code placeholder for porch locker unlock"
          >
            {/* 4 Corner Finder Pattern SVGs */}
            <div className="w-full flex justify-between">
              <div className="w-6 h-6 border-2 border-foreground p-0.5 flex items-center justify-center">
                <div className="w-3 h-3 bg-foreground" />
              </div>
              <div className="w-6 h-6 border-2 border-foreground p-0.5 flex items-center justify-center">
                <div className="w-3 h-3 bg-foreground" />
              </div>
            </div>

            {/* Center Geometric Grid Representation */}
            <div className="flex flex-col items-center justify-center text-center">
              <QrCode className="w-8 h-8 text-foreground/80 stroke-[1.5]" />
              <span className="text-[8px] uppercase tracking-widest font-mono font-bold text-foreground pt-0.5">
                PASS SCAN
              </span>
            </div>

            {/* Bottom Finder Pattern */}
            <div className="w-full flex justify-start">
              <div className="w-6 h-6 border-2 border-foreground p-0.5 flex items-center justify-center">
                <div className="w-3 h-3 bg-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Physical Tag Perforation Graphic Line */}
        <div className="mt-6 pt-4 border-t border-dashed border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Porchside Pickup Locker Cubby Wall</span>
          <span className="font-mono">42 Orchard Lane</span>
        </div>
      </div>

      {/* Utility Action Buttons */}
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="gap-1.5 text-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Pass</span>
        </Button>
      </div>
    </div>
  );
}
