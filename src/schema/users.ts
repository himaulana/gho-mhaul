import { z } from 'zod';

const userSchema = z.object({
  email: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  balance: z.number().min(1000).max(1000000),
});

export default userSchema;
