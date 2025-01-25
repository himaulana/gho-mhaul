import Image from 'next/image';
import { Check, CreditCard, BarChart2, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Home | Gho Mhaul',
  description: 'Platform pembayaran digital canggih untuk bisnis dan individu',
};

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen pt-8">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/icon.png"
              alt="Gho Mhaul Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Transformasi Digital Keuangan Anda
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gho Mhaul membantu Anda mengelola keuangan dengan cerdas, aman, dan
            mudah - semua dalam satu platform revolusioner.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={'/payment'}>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Mulai Sekarang
              </button>
            </Link>
            <Link href={'/report'}>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Pelajari Lebih Lanjut
              </button>
            </Link>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-300">
            <CreditCard className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-blue-900">
              Manajemen Transaksi Cerdas
            </h2>
            <p className="text-gray-600">
              Pantau, analisis, dan optimalkan setiap transaksi dengan teknologi
              canggih kami.
            </p>
            <div className="mt-4 space-y-2">
              {[
                'Real-time tracking',
                'Integrasi multi-platform',
                'Keamanan tingkat lanjut',
              ].map((feature) => (
                <div key={feature} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-300">
            <BarChart2 className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-blue-900">
              Laporan Keuangan Mendalam
            </h2>
            <p className="text-gray-600">
              Dapatkan wawasan komprehensif untuk mendorong pertumbuhan bisnis
              Anda.
            </p>
            <div className="mt-4 space-y-2">
              {['Visualisasi data', 'Prediksi keuangan', 'Export mudah'].map(
                (feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-300">
            <Globe className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-blue-900">
              Pembayaran Global
            </h2>
            <p className="text-gray-600">
              Terima pembayaran dari mana saja dengan dukungan multi-mata uang.
            </p>
            <div className="mt-4 space-y-2">
              {['Multi-mata uang', 'Biaya rendah', 'Konversi instan'].map(
                (feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-500 mt-16">
          © {new Date().getFullYear()} Gho Mhaul. Hak Cipta Dilindungi.
        </footer>
      </div>
    </main>
  );
}
