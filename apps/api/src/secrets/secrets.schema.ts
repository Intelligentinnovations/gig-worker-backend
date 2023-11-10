import { z } from 'zod';

export const schema = {
  PORT: z.coerce.number().optional(),
  DATABASE_URL: z.string()
} as const;

export const objectSchema = z.object(schema);
