'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Report = {
  id: number;
  date: Date;
  nominal: number;
  description?: string;
};

export const columns: ColumnDef<Report>[] = [
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
    header: 'Pukul',
    accessorKey: 'time',
    cell: ({ row }) => {
      const dateValue: Date = row.getValue('date');
      return dateValue
        ? new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(new Date(dateValue))
        : '-';
    },
  },
  {
    header: 'Nominal',
    accessorKey: 'nominal',
    cell: ({ row }) => {
      const nominalValue: number = row.getValue('nominal');
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
