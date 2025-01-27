import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-gradient-to-b from-blue-50 to-white min-h-screen`}
      >
        <Navbar session={session} />
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
