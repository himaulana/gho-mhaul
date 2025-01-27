'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/Fragment/Table';
import Select from '@/components/Element/Select';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { TransactionType } from '@/types/transactions';
import { UserType } from '@/types/users';

export interface InitialType {
  users: UserType[];
  transactions: {
    income: TransactionType[];
    expense: TransactionType[];
  };
}

export default function TabsComponent({ initial }: { initial: InitialType }) {
  const [data, setData] = useState(initial.transactions);
  const [userId, setUserId] = useState<number>(initial.users[0]?.id);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${userId}`
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

        setData({ income, expense });
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col space-y-6">
      <Tabs defaultValue="output" className="w-full">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-8 md:space-y-0 md:space-x-4 mb-6">
          <TabsList className="flex space-x-4 w-full md:w-auto">
            <TabsTrigger
              value="output"
              className="text-gray-800 font-semibold hover:text-gray-900"
            >
              Pengeluaran
            </TabsTrigger>
            <TabsTrigger
              value="input"
              className="text-gray-800 font-semibold hover:text-gray-900"
            >
              Pemasukan
            </TabsTrigger>
          </TabsList>

          <div className="w-full md:w-[200px]">
            <Select
              data={initial.users}
              keyName="id"
              valueName="name"
              defaultValue={userId}
              onSelect={(value) => setUserId(Number(value))}
            />
          </div>
        </div>

        <TabsContent value="output">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Pengeluaran
            </h2>
            <DataTable columns={columns} data={data.expense} />
          </Card>
        </TabsContent>

        <TabsContent value="input">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Pemasukan
            </h2>
            <DataTable columns={columns} data={data.income} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      {children}
    </div>
  );
};
