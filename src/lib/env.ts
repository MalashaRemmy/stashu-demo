// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_ENABLE_DEBUG: z.enum(['true', 'false']).default('false'),
});

export const env = envSchema.parse(import.meta.env);