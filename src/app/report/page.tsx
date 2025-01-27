import TransacationForm from '@/components/Fragment/Form/Transaction';
import TabsComponent from './tabs';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { TransactionType } from '@/types/transactions';

export const metadata: Metadata = {
  title: 'Report | Gho Mhaul',
  description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
};

async function getTransactions() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/1`,
    {
      next: {
        tags: ['transactions', 'user'],
      },
    }
  );
  const { data } = await response.json();

  const income: TransactionType[] = [];
  const expense: TransactionType[] = [];

  data.forEach((item: TransactionType) => {
    if (item.category === 'INCOME') {
      income.push(item);
    } else {
      expense.push(item);
    }
  });

  return { income, expense };
}

async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
  const { data } = await response.json();
  return data;
}

export default async function ReportPage() {
  const session = await getServerSession(authOptions);
  const transactions = await getTransactions();
  const users = await getUsers();

  const initial = {
    users: users,
    transactions,
  };

  return (
    <div className="w-full mx-auto py-6 px-4 md:w-3/4 mt-24 space-y-10">
      {session && <TransacationForm users={users} />}
      <TabsComponent initial={initial} />
    </div>
  );
}
