import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ReadinessSummaryBanner({ isReady = true, deficitCount = 0 }) {
  if (isReady) {
    return (
      <Card
        tactile
        className="p-4 border-l-4 border-l-[#4A6B53] bg-[#E8EFE9]/60 border border-[#C2D7C6] flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#4A6B53] text-white shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-[#2D4733]">
              Larder Stock Fully Verified — Clear to Bake
            </h3>
            <p className="text-xs text-[#2D4733]/80 font-sans">
              All grains, dairy, and botanicals are available above required order volumes.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2D4733] text-white">
          100% Ready
        </span>
      </Card>
    );
  }

  return (
    <Card
      tactile
      className="p-4 border-l-4 border-l-[#BA1A1A] bg-[#FDE8E8]/70 border border-[#F8B4B4] flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-full bg-[#BA1A1A] text-white shrink-0 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold text-[#7F1D1D]">
            Ingredient Deficit Alert — {deficitCount} Shortage{deficitCount !== 1 ? 's' : ''} Detected
          </h3>
          <p className="text-xs text-[#7F1D1D]/80 font-sans">
            One or more ingredients lack sufficient available stock to complete this order. Restock before starting proofing.
          </p>
        </div>
      </div>
      <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#BA1A1A] text-white font-mono">
        Deficit: {deficitCount}
      </span>
    </Card>
  );
}
