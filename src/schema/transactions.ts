import { z } from 'zod';

const transactionSchema = z.object({
  userId: z.number().min(1),
  description: z.string().min(2).max(50),
  amount: z.number().min(1000).max(1000000),
  category: z.enum(['INCOME', 'EXPENSE']),
  date: z.date(),
});

export default transactionSchema;
