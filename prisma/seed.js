import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const emailsData = [
        {
            subject: 'Email Subject',
            content: 'This is a sample email.',
            published: true,
        },
        {
            subject: 'Second Email Subject',
            content: 'This is also a sample email.',
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

  await prisma.email.createMany({
    data: emailsData,
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