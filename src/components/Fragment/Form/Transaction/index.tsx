'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form as FormUI,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Select from '@/components/Element/Select';
import Calendar from '@/components/Element/Calendar';

import transactionSchema from '@/schema/transactions';
import { UserType } from '@/types/users';
import { useRouter } from 'next/navigation';

export default function TransacationForm({ users }: { users: UserType[] }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      amount: 0,
      category: 'INCOME',
      userId: users.length > 0 ? users[0].id : 0,
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        date: new Date(),
      }),
    });
    if (response.ok) {
      form.reset();
      router.refresh();
    } else {
      router.push('/');
    }
  }

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
      <FormUI {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/3">
                  <FormLabel>Pilih User</FormLabel>
                  <FormControl>
                    <Select
                      data={users}
                      keyName="id"
                      valueName="name"
                      defaultValue={field.value}
                      onSelect={(value) =>
                        form.setValue('userId', Number(value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                const category = [
                  { id: 'INCOME', name: 'Pemasukan' },
                  { id: 'EXPENSE', name: 'Pengeluaran' },
                ];

                return (
                  <FormItem className="w-full sm:w-1/3">
                    <FormLabel>Pilih Category</FormLabel>
                    <FormControl>
                      <Select
                        data={category}
                        keyName="id"
                        valueName="name"
                        defaultValue={field.value}
                        onSelect={(value) =>
                          form.setValue(
                            'category',
                            value as 'INCOME' | 'EXPENSE'
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/3">
                  <FormLabel>Pilih Tanggal</FormLabel>
                  <FormControl>
                    <Calendar
                      label="Pilih Tanggal"
                      value={field.value || new Date()}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan deskripsi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nominal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nominal"
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </div>
        </form>
      </FormUI>
    </div>
  );
}
