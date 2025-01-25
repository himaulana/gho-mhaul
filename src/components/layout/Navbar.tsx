'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Key, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const onHandleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex w-[90%] max-w-6xl items-center justify-between rounded-2xl bg-white/50 px-6 py-3 shadow-lg backdrop-blur-xl border border-slate-300/50">
        <ToogleMobileButton isOpen={isOpen} handleClick={onHandleClick} />
        <Logo />
        <DesktopMenu />
        <SignInButton />
      </nav>

      {/* Overlay untuk Menutup Dropdown Saat Diklik */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <MobileMenu isOpen={isOpen} handleClick={onHandleClick} />
    </>
  );
}

const Logo = () => {
  return (
    <div className="text-xl font-semibold tracking-wide text-slate-900 drop-shadow-md">
      Gho Mhaul
    </div>
  );
};

const SignInButton = () => {
  return (
    <Link href={'/signin'}>
      <Button className="flex items-center space-x-2 text-slate-900 bg-slate-200/70 backdrop-blur-md px-4 py-2 rounded-xl shadow-md hover:bg-slate-300 transition-all">
        <Key size={20} />
        <span className="hidden md:inline">Sign In</span>
      </Button>
    </Link>
  );
};

const ToogleMobileButton = ({
  isOpen,
  handleClick,
}: {
  isOpen: boolean;
  handleClick: () => void;
}) => {
  return (
    <button
      className="md:hidden p-2 rounded-lg text-slate-900 hover:bg-slate-300/50 transition-all active:scale-95"
      onClick={handleClick}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

const MobileMenu = ({
  isOpen,
  handleClick,
}: {
  isOpen: boolean;
  handleClick: () => void;
}) => {
  return (
    <div
      className={`fixed mt-8 top-[4.5rem] left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-white rounded-2xl shadow-lg border border-slate-300/50 transition-all duration-300 z-50 ${
        isOpen
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <ul className="flex flex-col space-y-3 p-6 text-slate-700 text-md font-medium">
        {[
          { name: 'Home', href: '/' },
          { name: 'Payment', href: '/payment' },
          { name: 'Report', href: '/report' },
        ].map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="block w-full text-center p-3 rounded-lg hover:bg-slate-100 transition-all"
              onClick={handleClick}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DesktopMenu = () => {
  return (
    <ul className="hidden md:flex space-x-8 text-slate-700 text-sm font-medium">
      {[
        { name: 'Home', href: '/' },
        { name: 'Payment', href: '/payment' },
        { name: 'Report', href: '/report' },
      ].map((item) => (
        <li key={item.name} className="group relative">
          <Link
            href={item.href}
            className="relative transition duration-300 ease-in-out text-slate-700 group-hover:text-slate-900 group-hover:scale-105 text-md"
          >
            {item.name}
            {/* Efek Underline Expand */}
            <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-slate-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>

            {/* Efek Sliding Underline */}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-slate-400 transition-all duration-300 group-hover:w-full"></span>

            {/* Efek Glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
