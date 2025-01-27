import { NextRequest, NextResponse } from 'next/server';
import { createTransaction, getTransactionById } from './model';
import { revalidateTag } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (slug && slug[0]) {
    const id = slug[0];
    const transactions = await getTransactionById(Number(id));

    if (!transactions) {
      return NextResponse.json({
        status: 404,
        message: `Transactions user id ${id} not found`,
        data: [],
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: transactions,
    });
  }

  return NextResponse.json(
    {
      status: 404,
      message: 'User id not found',
    },
    { status: 404 }
  );
}

export async function POST(request: NextRequest) {
  const dataRequest = await request.json();

  const transaction = await createTransaction(dataRequest);

  if (!transaction) {
    return NextResponse.json({
      status: 500,
      message: 'Error creating transaction',
    });
  }

  revalidateTag('transactions');

  return NextResponse.json({
    status: 200,
    message: 'Data received',
    data: dataRequest,
  });
}
