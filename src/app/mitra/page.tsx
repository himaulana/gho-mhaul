import UserForm from '@/components/Fragment/Form/User';
import { DataTable } from '@/components/Fragment/Table';
import { Metadata } from 'next';
import { columns } from './columns';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export const metadata: Metadata = {
  title: 'Mitra | Gho Mhaul',
  description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
};

async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    next: {
      tags: ['transactions', 'user'],
    },
  });
  const { data } = await response.json();

  return data;
}

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  const users = await getUsers();
  return (
    <div className="w-full mx-auto py-6 px-4 md:w-3/4 mt-24 space-y-10">
      {session && <UserForm />}
      <DataTable columns={columns} data={users} />
    </div>
  );
}
