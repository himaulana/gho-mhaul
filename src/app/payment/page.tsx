import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment | Gho Mhaul',
  description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
};

export default function PaymentPage() {
  return <h1>Hallo Maulana Anwar</h1>;
}
