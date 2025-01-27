'use client';

import { UserType } from '@/types/users';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<UserType>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Saldo',
    accessorKey: 'balance',
    cell: ({ row }) => {
      const nominalValue: number = row.getValue('balance');
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
