'use client';

import { ColumnDef } from '@tanstack/react-table';

export type TransactionType = {
  id: number;
  date: Date;
  amount: number;
  description?: string;
};

export const columns: ColumnDef<TransactionType>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Tanggal',
    accessorKey: 'date',
    cell: ({ row }) => {
      const dateValue: Date = row.getValue('date');
      return dateValue
        ? new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(new Date(dateValue))
        : '-';
    },
  },
  {
    header: 'Jam',
    accessorKey: 'time',
    cell: ({ row }) => {
      const dateValue: Date = row.getValue('date');
      return dateValue
        ? new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date(dateValue))
        : '-';
    },
  },
  {
    header: 'Harga',
    accessorKey: 'amount',
    cell: ({ row }) => {
      const nominalValue: number = row.getValue('amount');
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(nominalValue);
    },
  },
  {
    header: 'Keterangan',
    accessorKey: 'description',
  },
];
