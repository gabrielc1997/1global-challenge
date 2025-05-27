import { z } from 'zod';

export const backOfficeUserSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  avatar: z.string().url('Invalid URL'),
});

export type BackOfficeUserFormData = z.infer<typeof backOfficeUserSchema>;
