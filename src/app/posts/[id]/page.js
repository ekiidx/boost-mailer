import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function ShowPost({ params }) {
    const id = Number(params.id);

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if (!post) {
        return (
            <div style={{ padding: '2rem' }}>
                <h1>Post Not Found</h1>
                <Link href="/">Go Back</Link>
            </div>
        );
  }

  return (
    <main>
        <h1>{post.title}</h1>
        <p>{post.content || '(No content)'}</p>
        <p>Status: {post.published ? 'Published' : 'Draft'}</p>
    </main>
  );
}