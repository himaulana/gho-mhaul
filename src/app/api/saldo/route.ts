import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(
      process.cwd(),
      'src',
      'repository',
      'saldo.json'
    );

    const saldo = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    saldo.forEach((item: UserType) => {
      if (item.id == data.id) {
        if (data.status === 'topup') {
          item.input.push({
            date: data.date,
            nominal: data.nominal,
          });
          Number((item.saldo += data.nominal));
        } else {
          item.output.push({
            description: data.description,
            date: data.date,
            nominal: data.nominal,
          });
          Number((item.saldo -= data.nominal));
        }
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(saldo, null, 2));

    return NextResponse.json({ message: 'Success', data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error writing file' },
      { status: 500 }
    );
  }
}
