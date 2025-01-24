'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form as FormUI,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  description: z.string().min(2).max(50),
  nominal: z.string().min(4).max(50),
});

export default function Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      nominal: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/saldo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        nominal: Number(values.nominal),
        date: new Date(),
        status: 'topup',
        id: 1,
      }),
    });

    if (response.ok) {
      console.log('Data berhasil disimpan:', await response.json());
    } else {
      console.error('Gagal menyimpan data');
    }
  }

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nominal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nominal</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormUI>
  );
}
