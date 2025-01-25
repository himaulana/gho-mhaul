import TabsComponent from './tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report | Gho Mhaul',
  description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
};

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/saldo?id=1`
  );
  const { data } = await response.json();
  return data;
}

async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/saldo/users`
  );
  const { data } = await response.json();
  return data;
}

export default async function ReportPage() {
  const data = await getData();
  const users = await getUsers();
  const initial = {
    users: users,
    data: data,
  };
  return (
    <div className="w-full mx-auto py-6 px-4 md:w-3/4 mt-24">
      <TabsComponent initial={initial} />
    </div>
  );
}
