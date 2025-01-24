import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function Posts() {
  const posts = await prisma.post.findMany();

  return (
    <main>
      <h1>Posts</h1>
      <Link href="/posts/create">New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.published ? 'Published' : 'Draft'}
            <Link href={`/post/${post.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}