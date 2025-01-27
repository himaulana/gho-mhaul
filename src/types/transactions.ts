export interface TransactionType {
  id: number;
  date: Date;
  amount: number;
  description: string;
  category: 'INCOME' | 'EXPENSE';
  userId?: number;
}
