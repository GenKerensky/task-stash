import { z } from 'zod';

export const Account = z.object({
  email: z.string().email(),
  publicKey: z.string(),
  privateKey: z.string().optional(),
  salt: z.string().optional(),
  updatedAt: z.date(),
});
