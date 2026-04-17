import { z } from 'zod';

export const contactSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  phoneNumber: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  profilePictureUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Contact = z.infer<typeof contactSchema>;

export type ContactInput = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
