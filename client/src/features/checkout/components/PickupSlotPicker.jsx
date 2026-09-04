import React from 'react';
import { Clock, Calendar, Check, ArrowRight, ArrowLeft, MapPin, AlertCircle } from 'lucide-react';
import { MOCK_PICKUP_SLOTS } from '../schemas/checkoutSchema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PickupSlotPicker({
  selectedSlotId = '',
  onSelectSlot,
  onNext,
  onBack,
}) {
  const selectedSlot = MOCK_PICKUP_SLOTS.find((s) => s.id === selectedSlotId);
  const isValid = !!selectedSlot && selectedSlot.available;

  const handleContinue = (e) => {
    e.preventDefault();
    if (isValid) {
      onNext(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
          2. Select Porchside Pickup Slot
        </h2>
        <p className="text-xs sm:text-sm text-secondary-foreground">
          Pickups are staged in our temperature-controlled porch lockers at <strong>42 Orchard Lane</strong>. Choose your arrival window.
        </p>
      </div>

      {/* Location Landmark Banner */}
      <div className="rounded-xl border border-border/80 bg-surface-container-low/60 p-3.5 flex items-center gap-3 text-xs">
        <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <strong className="font-semibold text-foreground block">Crumb &amp; Bloom Porch Locker Cubbies</strong>
          <span className="text-secondary-foreground">42 Orchard Lane, Hearth Entryway · Touchscreen locker wall</span>
        </div>
      </div>

      {/* Radio Card Grid */}
      <fieldset className="space-y-3">
        <legend className="sr-only">Available porch pickup time slots</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {MOCK_PICKUP_SLOTS.map((slot) => {
            const isSelected = selectedSlotId === slot.id;
            const isAvailable = slot.available;

            return (
              <label
                key={slot.id}
                htmlFor={`slot-${slot.id}`}
                className={`relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  !isAvailable
                    ? 'border-border/50 bg-muted/40 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs'
                    : 'border-border/80 bg-card hover:border-primary/40 hover:bg-muted/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      id={`slot-${slot.id}`}
                      name="pickupSlot"
                      type="radio"
                      disabled={!isAvailable}
                      checked={isSelected}
                      onChange={() => onSelectSlot(slot.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input bg-card'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {slot.timeWindow}
                    </span>
                  </div>

                  <Badge
                    variant={isAvailable ? (isSelected ? 'default' : 'outline') : 'destructive'}
                    className="text-[10px] font-medium"
                  >
                    {slot.badge}
                  </Badge>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-sans">
                    <Calendar className="w-3 h-3 text-primary/70" />
                    <span>{slot.day}</span>
                  </span>

                  <span className="font-mono text-[11px]">
                    {slot.capacityNote}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto gap-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contact Info</span>
        </Button>

        <Button
          type="button"
          disabled={!isValid}
          onClick={handleContinue}
          className="w-full sm:w-auto gap-2 min-h-[44px] px-6 font-semibold shadow-sm"
        >
          <span>Continue to Order Review</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
