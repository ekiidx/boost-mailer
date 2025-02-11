import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const emails = await prisma.email.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(emails);
}