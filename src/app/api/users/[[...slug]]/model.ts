import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log('Failed to get users: ', error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error(`User dengan ID ${id} tidak ditemukan`);
    }

    return user;
  } catch (error) {
    console.error('Error saat mengambil user:', error);
    throw new Error('Gagal mengambil data user');
  }
}

interface CreateUser {
  name: string;
  email: string;
  balance: number;
}

export async function createUser(data: CreateUser) {
  return await prisma.user.create({ data });
}
