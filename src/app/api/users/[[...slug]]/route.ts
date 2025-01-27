import { type NextRequest, NextResponse } from 'next/server';
import { createUser, getUserById, getUsers } from './model';
import { revalidateTag } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (slug && slug[0]) {
    const id = slug[0];
    const user = await getUserById(Number(id));

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found',
        data: [],
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: user,
    });
  }

  const users = await getUsers();

  if (Array.isArray(users) && users.length === 0) {
    return NextResponse.json({
      status: 404,
      message: 'Users not found',
      data: [],
    });
  }

  return NextResponse.json({
    status: 200,
    message: 'Success',
    data: users,
  });
}

export async function POST(request: NextRequest) {
  const dataRequest = await request.json();

  const user = await createUser(dataRequest);

  if (!user) {
    return NextResponse.json({
      status: 500,
      message: 'Error creating user',
      data: [],
    });
  }

  revalidateTag('user');

  return NextResponse.json({
    status: 200,
    message: 'Data not provided',
    data: user,
  });
}
