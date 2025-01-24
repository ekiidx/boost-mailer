import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    const postsData = [
        {
            title: 'Post Title',
            content: 'This is a sample post.',
            published: true,
        },
        {
            title: 'Second Post',
            content: 'This is also a sample post.',
            published: true,
        }
    ]

  await prisma.post.createMany({
    data: postsData,
    skipDuplicates: true,
  });

  console.log('✅ Seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });