import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ReadinessTable({ auditRows = [] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Ingredient Requirement Audit
        </h3>
        <span className="text-xs text-muted-foreground font-mono">
          {auditRows.length} Ingredients Calculated
        </span>
      </div>

      <div className="space-y-3">
        {auditRows.map((row, idx) => {
          const isAvailable = row.status === 'Available';
          return (
            <Card key={idx} tactile className="p-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif text-base font-semibold text-foreground">
                    {row.ingredient}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mt-0.5">
                    <span>
                      Required: <strong className="text-foreground">{row.required.toLocaleString()} {row.unit}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Available: <strong className="text-foreground">{row.available.toLocaleString()} {row.unit}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!isAvailable ? (
                    <span className="font-mono text-xs font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded">
                      Shortage: -{row.shortage.toLocaleString()} {row.unit}
                    </span>
                  ) : (
                    <span className="font-mono text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded">
                      Sufficient Stock
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      isAvailable
                        ? 'bg-[#E8EFE9] text-[#2D4733]'
                        : 'bg-[#FDE8E8] text-[#7F1D1D]'
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53]" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-[#B91C1C] animate-pulse" />
                        <span>Insufficient</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
