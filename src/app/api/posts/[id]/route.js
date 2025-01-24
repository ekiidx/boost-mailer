import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const id = Number(params.id);

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const id = Number(params.id);
  const { title, content } = await request.json();

  try {
    const updated = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = Number(params.id);

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}