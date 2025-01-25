import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment | Gho Mhaul',
  description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
};

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold">Hello Friend`s</h1>
      <p className="text-lg text-gray-500 mt-2">
        This page is under development. Stay tuned!
      </p>
    </div>
  );
}
