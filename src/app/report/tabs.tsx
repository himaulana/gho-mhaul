'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/Fragment/Table';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Transaction {
  id: number;
  date: Date;
  nominal: number;
  description?: string;
}

interface UserType {
  id: number;
  name: string;
  saldo: number;
  input: Transaction[];
  output: Transaction[];
}

interface InitialType {
  users: UserType[];
  data: UserType;
}

export default function TabsComponent({ initial }: { initial: InitialType }) {
  const [data, setData] = useState<UserType>(initial.data);
  const [idUser, setIdUser] = useState<number>(initial.data.id);

  useEffect(() => {
    const fetchData = async () => {
      if (idUser) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/saldo?id=${idUser}`
        );
        const { data } = await response.json();
        setData(data);
      }
    };

    fetchData();
  }, [idUser]);

  return (
    <div className="flex flex-col space-y-6">
      <Tabs defaultValue="output" className="w-full">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
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

          <div className="w-full md:w-[180px]">
            <SelectUser users={initial.users} onSelect={setIdUser} />
          </div>
        </div>

        <TabsContent value="output">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Pengeluaran
            </h2>
            <DataTable columns={columns} data={data.output} />
          </Card>
        </TabsContent>

        <TabsContent value="input">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Pemasukan
            </h2>
            <DataTable columns={columns} data={data.input} />
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

const SelectUser = ({
  users,
  onSelect,
}: {
  users: UserType[];
  onSelect: (id: number) => void;
}) => {
  return (
    <Select onValueChange={(value) => onSelect(Number(value))}>
      <SelectTrigger className="w-full bg-gray-50 border-none rounded-md">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
