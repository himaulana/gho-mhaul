interface Transaction {
  date: string;
  nominal: number;
}

interface OutputTransaction extends Transaction {
  description: string;
}

interface UserType {
  id: string;
  name: string;
  saldo: number;
  input: Transaction[];
  output: OutputTransaction[];
}

const User: UserType[] = [
  {
    id: '1',
    name: 'Michael Harryanto',
    saldo: 100000,
    input: [
      {
        date: '2021-10-10',
        nominal: 100000,
      },
    ],
    output: [
      {
        description: 'Beli Makanan',
        date: '2021-10-10',
        nominal: 100000,
      },
    ],
  },
];

export default User;
