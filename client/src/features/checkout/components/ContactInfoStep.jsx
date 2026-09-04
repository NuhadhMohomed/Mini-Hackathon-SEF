import React, { useState } from 'react';
import { User, Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { contactInfoSchema } from '../schemas/checkoutSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ContactInfoStep({
  initialData = {},
  onNext,
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    notes: initialData.notes || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error upon typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = contactInfoSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-1">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
          1. Customer Contact Details
        </h2>
        <p className="text-xs sm:text-sm text-secondary-foreground">
          We notify you via SMS the moment your warm loaves are tagged and placed in your porch locker.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
          >
            Full Name <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className={`pl-9.5 h-11 text-sm bg-card rounded-lg ${
                errors.fullName
                  ? 'border-destructive focus-visible:ring-destructive/30'
                  : 'border-input focus-visible:ring-primary/20'
              }`}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
          </div>
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-destructive font-medium pt-0.5">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Mobile Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
          >
            Mobile Phone <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(555) 382-9104"
              className={`pl-9.5 h-11 text-sm bg-card rounded-lg ${
                errors.phone
                  ? 'border-destructive focus-visible:ring-destructive/30'
                  : 'border-input focus-visible:ring-primary/20'
              }`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
            />
          </div>
          {errors.phone ? (
            <p id="phone-error" className="text-xs text-destructive font-medium pt-0.5">
              {errors.phone}
            </p>
          ) : (
            <p id="phone-hint" className="text-[11px] text-muted-foreground">
              Required for automated 4-digit locker PIN and pickup readiness alerts.
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
          >
            Email Address <span className="text-muted-foreground text-[11px] font-normal lowercase">(optional receipt)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="eleanor@example.com"
              className={`pl-9.5 h-11 text-sm bg-card rounded-lg ${
                errors.email
                  ? 'border-destructive focus-visible:ring-destructive/30'
                  : 'border-input focus-visible:ring-primary/20'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive font-medium pt-0.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Special Instructions / Notes */}
        <div className="space-y-1.5">
          <label
            htmlFor="notes"
            className="block text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
          >
            Special Baker Instructions <span className="text-muted-foreground text-[11px] font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="e.g. Please double-wrap the country boule in linen, or allergy note..."
              className="w-full p-3 text-sm bg-card border border-input rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto gap-2 min-h-[44px] px-6 font-semibold shadow-sm"
        >
          <span>Continue to Porchside Pickup</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
