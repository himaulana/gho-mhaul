import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTransaction() {
  try {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  } catch (error) {
    console.log('Failed to get transaction: ', error);
    return [];
  }
}

export async function getTransactionById(id: number) {
  return await prisma.transaction.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

interface CreateTransaction {
  date: Date;
  amount: number;
  description: string;
  category: 'INCOME' | 'EXPENSE';
  userId: number;
}

export async function createTransaction(data: CreateTransaction) {
  if (!data.userId) {
    throw new Error('userId is required');
  }

  if (data.category === 'INCOME') {
    await prisma.user.update({
      where: { id: data.userId },
      data: {
        balance: {
          increment: data.amount,
        },
      },
    });
  } else {
    await prisma.user.update({
      where: { id: data.userId },
      data: {
        balance: {
          decrement: data.amount,
        },
      },
    });
  }

  return prisma.transaction.create({ data });
}
