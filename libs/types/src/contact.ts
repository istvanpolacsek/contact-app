import { z } from 'zod';

export const contactSchema = z.object({
  id: z.number(),
  name: z.string().min(3, 'Name is required'),
  phoneNumber: z.string().optional(),
  email: z.email('Invalid email').optional().or(z.literal('')),
  profilePictureUrl: z.url('Invalid URL').optional().or(z.literal('')),
  isDefault: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Contact = z.infer<typeof contactSchema>;

export type ContactInput = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
