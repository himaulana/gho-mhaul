import { NextRequest, NextResponse } from 'next/server';
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
  id: number;
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

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = req.nextUrl;
  const { slug } = params;
  const id = searchParams.get('id');

  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'repository',
      'saldo.json'
    );
    const saldo: UserType[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (slug) {
      const users = saldo.map(({ id, name }) => ({ id, name }));

      return NextResponse.json({
        message: 'Success',
        data: users,
      });
    }

    if (id) {
      const user = saldo.find((item) => item.id === Number(id));

      if (user) {
        return NextResponse.json({
          message: 'Success',
          data: user,
        });
      }

      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to read file', error: error },
      { status: 500 }
    );
  }
}
