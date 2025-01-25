'use client';

import { LoginForm } from '@/components/Fragment/Form/Login';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from 'next-auth/react';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }).min(2).max(50),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' })
    .max(50),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values
  ) => {
    console.log(values);
    await signIn('credentials', {
      ...values,
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="/"
          className="flex items-center gap-2 self-center font-medium flex-col"
        >
          <header className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/images/icon.png"
              alt="Gho Mhaul Logo"
              width={100}
              height={100}
            />
          </header>
          Gho Mhaul
        </a>
        <LoginForm form={form} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
