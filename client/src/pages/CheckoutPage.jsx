import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Check,
  ChevronRight,
  ArrowLeft,
  Wheat,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/features/cart/hooks/useCart';
import ContactInfoStep from '@/features/checkout/components/ContactInfoStep';
import PickupSlotPicker from '@/features/checkout/components/PickupSlotPicker';
import CheckoutReview from '@/features/checkout/components/CheckoutReview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { saveCreatedOrder } from '@/features/orders/services/orderMockData';

export default function CheckoutPage() {
  const { items, itemCount, subtotal, packagingFee, total, clearCart } = useCart();
  const navigate = useNavigate();

  // 3-step state progression: 1 = Contact, 2 = Pickup Slot, 3 = Review
  const [currentStep, setCurrentStep] = useState(1);

  // Form selections state
  const [contactData, setContactData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [selectedSlotId, setSelectedSlotId] = useState('slot-dawn');
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Processing & completion state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // If cart is empty and no order has just been placed
  if (items.length === 0 && !confirmedOrder) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
          <Wheat className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Your Basket is Empty
          </h1>
          <p className="text-sm text-muted-foreground">
            You don’t have any hearth loaves reserved yet. Please choose your offerings from our weekly menu before checking out.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/products">
            <Button className="gap-2 font-semibold">
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Weekly Menu</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Step Handlers
  const handleContactNext = (data) => {
    setContactData(data);
    setCurrentStep(2);
  };

  const handleSlotNext = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleConfirmReservation = () => {
    setIsProcessing(true);

    // Simulate mock order reservation allocation
    setTimeout(() => {
      const randomId = Math.floor(1026 + Math.random() * 900);
      const orderNumber = `#ORD-${randomId}`;
      const pickupPin = Math.floor(1000 + Math.random() * 9000).toString();
      const cubbyNumber = `Porch Cubby ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(1 + Math.random() * 8)}`;

      const newOrder = {
        id: `ORD-${randomId}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        displayDate: 'Nov 14, 2026',
        status: 'Ready for Porch',
        statusVariant: 'success',
        isActive: true,
        type: 'active',
        pickupSlot: `${selectedSlot?.day || 'Friday Nov 15'} · ${selectedSlot?.timeWindow || '08:30 AM – 09:30 AM'}`,
        pickupLocation: 'Crumb & Bloom Porchside Locker, 42 Orchard Lane',
        pickupCode: `CRUMB-${pickupPin}`,
        cubbyNumber,
        accessPin: pickupPin,
        customer: {
          name: contactData.fullName,
          phone: contactData.phone,
          email: contactData.email || '',
          smsAlerts: true,
        },
        items: [...items],
        subtotal,
        packagingFee,
        total,
        notes: contactData.notes || '',
      };

      // Persist order in mock storage
      saveCreatedOrder(newOrder);

      // Clear shopping basket
      clearCart();
      setIsProcessing(false);

      // Navigate directly to dedicated Order Confirmation & Pickup Pass view
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1200);
  };

  // If order was just confirmed, render artisan pickup pass confirmation view
  if (confirmedOrder) {
    return (
      <div className="py-8 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-success-bg text-success-text border border-success/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-success stroke-[2]" />
          </div>
          <Badge variant="success" dot={true} className="text-xs px-3 py-1 font-semibold">
            Batch Allotment Confirmed
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Your Hearth Order is Reserved
          </h1>
          <p className="text-xs sm:text-sm text-secondary-foreground max-w-md mx-auto">
            Thank you, <strong>{confirmedOrder.customer.name}</strong>. An automated SMS has been sent to{' '}
            <span className="font-mono text-primary font-medium">{confirmedOrder.customer.phone}</span>.
          </p>
        </div>

        {/* Tactile Digital Porchside Pickup Pass Card */}
        <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-card p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
            <div>
              <span className="text-[11px] uppercase font-semibold text-muted-foreground tracking-wider block">
                Digital Porchside Pickup Pass
              </span>
              <span className="font-mono text-2xl font-bold text-primary">
                {confirmedOrder.orderNumber}
              </span>
            </div>
            <div className="flex flex-col sm:items-end">
              <span className="text-xs text-muted-foreground">Pickup Pin Code</span>
              <span className="font-mono text-xl font-bold text-foreground tracking-widest bg-secondary px-3 py-1 rounded-md">
                {confirmedOrder.accessPin}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold block">
                Reserved Slot &amp; Day
              </span>
              <p className="font-mono font-semibold text-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{confirmedOrder.pickupSlot}</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold block">
                Assigned Locker Cubby
              </span>
              <p className="font-mono font-semibold text-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{confirmedOrder.cubbyNumber}</span>
              </p>
            </div>
          </div>

          {/* Reserved Items Summary */}
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2 text-xs">
            <span className="font-semibold text-foreground uppercase tracking-wider text-[10px] block">
              Bake Items Allocated
            </span>
            <div className="space-y-1.5">
              {confirmedOrder.items.map((it) => (
                <div key={it.id} className="flex items-center justify-between">
                  <span>
                    {it.quantity}× {it.name}
                  </span>
                  <span className="font-mono font-medium text-foreground">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-border/40 flex items-center justify-between font-semibold text-foreground">
                <span>Total Reserved</span>
                <span className="font-mono text-sm text-primary">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed text-center">
            Present this pass or enter your 4-digit code on the touchscreen wall at 42 Orchard Lane.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/products">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Bake Menu</span>
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full sm:w-auto gap-2">
              <span>Return to Storefront</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Stepper metadata
  const steps = [
    { number: 1, title: 'Contact Details' },
    { number: 2, title: 'Pickup Window' },
    { number: 3, title: 'Review & Confirm' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <Link to="/cart" className="hover:text-primary transition-colors">
          Shopping Basket
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
        <span className="text-foreground font-medium">Porchside Reservation</span>
      </nav>

      {/* 2. Stepper Progress Bar */}
      <div className="border-b border-border/70 pb-6">
        <div className="max-w-xl mx-auto flex items-center justify-between relative">
          {/* Background Connecting Line */}
          <div className="absolute left-6 right-6 top-4 -translate-y-1/2 h-0.5 bg-border -z-0" />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-all ${
                    isCompleted
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-xs'
                      : 'border border-input bg-card text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
                </div>
                <span
                  className={`text-xs mt-2 font-medium hidden sm:inline ${
                    isCurrent
                      ? 'text-primary font-semibold'
                      : isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main Content: Stepper Steps on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Current Active Step */}
        <div className="lg:col-span-8 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
          {currentStep === 1 && (
            <ContactInfoStep
              initialData={contactData}
              onNext={handleContactNext}
            />
          )}

          {currentStep === 2 && (
            <PickupSlotPicker
              selectedSlotId={selectedSlotId}
              onSelectSlot={setSelectedSlotId}
              onNext={handleSlotNext}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <CheckoutReview
              contactData={contactData}
              slotData={selectedSlot}
              items={items}
              subtotal={subtotal}
              packagingFee={packagingFee}
              total={total}
              onBack={() => setCurrentStep(2)}
              onConfirmReservation={handleConfirmReservation}
              onEditContact={() => setCurrentStep(1)}
              onEditSlot={() => setCurrentStep(2)}
              isProcessing={isProcessing}
            />
          )}
        </div>

        {/* Right Column: Sticky Live Cart Summary Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <Card className="rounded-xl border border-border/80 bg-card p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="font-serif text-base font-semibold text-foreground">
                Batch Reservation
              </span>
              <span className="font-mono text-xs font-semibold bg-secondary px-2 py-0.5 rounded text-secondary-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Quick Item List */}
            <div className="divide-y divide-border/40 text-xs max-h-56 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-muted-foreground font-mono">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-foreground shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Line Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs">
              <div className="flex items-center justify-between text-secondary-foreground">
                <span>Items Subtotal:</span>
                <span className="font-mono text-foreground font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-secondary-foreground">
                <span>Porch Packaging Fee:</span>
                <span className="font-mono text-foreground font-medium">
                  ${packagingFee.toFixed(2)}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-border/60 text-sm">
                <span className="font-serif font-semibold text-foreground">Total:</span>
                <span className="font-mono text-xl font-bold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <Link
                to="/cart"
                className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>Edit items in cart</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
