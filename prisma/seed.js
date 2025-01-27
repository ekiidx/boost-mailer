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
    ];

     const clientsData = [
        {
            name: 'John Smith',
            email: 'john@smith.com',
        },
        {
            name: 'Jack Black',
            email: 'jack@black.com',
        }
    ];

  await prisma.post.createMany({
    data: postsData,
    skipDuplicates: true,
  });

  await prisma.client.createMany({
    data: clientsData,
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