import { z } from 'zod';

export const contactInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters)')
    .max(100, 'Name cannot exceed 100 characters'),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number is required for porch locker SMS alerts')
    .regex(/^[0-9+()\-.\s]{7,20}$/, 'Please enter a valid telephone number format'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  notes: z
    .string()
    .trim()
    .max(300, 'Special instructions cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),
});

export const MOCK_PICKUP_SLOTS = [
  {
    id: 'slot-dawn',
    day: 'Friday, Nov 15',
    timeWindow: '08:30 AM – 09:30 AM',
    badge: 'Dawn Hearth Drop',
    available: true,
    capacityNote: '4 of 12 locker cubbies reserved',
  },
  {
    id: 'slot-morning',
    day: 'Friday, Nov 15',
    timeWindow: '09:30 AM – 10:30 AM',
    badge: 'Prime Morning',
    available: true,
    capacityNote: '8 of 12 locker cubbies reserved',
  },
  {
    id: 'slot-midday',
    day: 'Friday, Nov 15',
    timeWindow: '10:30 AM – 11:30 AM',
    badge: 'Mid-Morning',
    available: true,
    capacityNote: '11 of 12 locker cubbies reserved · Low Availability',
  },
  {
    id: 'slot-noon',
    day: 'Friday, Nov 15',
    timeWindow: '11:30 AM – 12:30 PM',
    badge: 'Noon Window',
    available: false,
    capacityNote: 'All 12 cubbies allocated · Slot Closed',
  },
];
