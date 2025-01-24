import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { title, content } = body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}