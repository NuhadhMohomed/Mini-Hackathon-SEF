import React from 'react';
import { Edit, CheckCircle, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function InventoryTable({ items = [], onUpdateStock }) {
  return (
    <div className="space-y-4">
      {/* DESKTOP TABLE VIEW (≥ 640px) */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead className="text-right">Available Stock</TableHead>
              <TableHead className="text-right">Minimum Stock</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const isOk = item.available >= item.minimumStock;
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <span className="font-semibold text-foreground font-title-sm">
                      {item.ingredient}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-bold text-foreground">
                    {item.available.toLocaleString()} {item.unit}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-muted-foreground">
                    {item.minimumStock.toLocaleString()} {item.unit}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isOk
                          ? 'bg-[#E8EFE9] text-[#2D4733]'
                          : 'bg-[#FEF3E2] text-[#8A4A00]'
                      }`}
                    >
                      {isOk ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-[#4A6B53]" />
                          <span>OK</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
                          <span>LOW</span>
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 gap-1.5"
                      onClick={() => onUpdateStock && onUpdateStock(item)}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Update Stock</span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE STACKED CARDS VIEW (< 640px) */}
      <div className="sm:hidden space-y-3">
        {items.map((item) => {
          const isOk = item.available >= item.minimumStock;
          return (
            <Card key={item.id} tactile className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {item.ingredient}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                    isOk ? 'bg-[#E8EFE9] text-[#2D4733]' : 'bg-[#FEF3E2] text-[#8A4A00]'
                  }`}
                >
                  {isOk ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-[#4A6B53]" />
                      <span>OK</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>LOW</span>
                    </>
                  )}
                </span>
              </div>

              <div className="bg-surface-container-low p-2.5 rounded-lg space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-bold text-foreground">
                    {item.available.toLocaleString()} {item.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Stock:</span>
                  <span className="font-bold text-foreground">
                    {item.minimumStock.toLocaleString()} {item.unit}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs gap-1.5"
                onClick={() => onUpdateStock && onUpdateStock(item)}
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Update Stock</span>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
