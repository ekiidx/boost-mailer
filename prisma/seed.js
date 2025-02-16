import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const emailsData = [
        {
            senderName: 'John Smith',
            senderEmail: 'john@smith.com',
            recipientName: 'Me',
            recipientEmail: 'boost@vuedesign.co',
            subject: 'Email Subject',
            content: 'This is a sample email.',
            isRead: false,
            isSent: false,
            isStarred: false,
            isArchived: false,
            isDeleted: false,
            isDraft: false,
            date: new Date('2025-07-10T09:00:00Z'),
            published: true
        },
        {
            senderName: 'Jack Black',
            senderEmail: 'jack@black.com',
            recipientName: 'Me',
            recipientEmail: 'boost@vuedesign.co',
            subject: 'Second Email Subject',
            content: 'This is also a sample email.',
            isSent: false,
            isRead: true,
            isStarred: false,
            isArchived: false,
            isDeleted: false,
            isDraft: false,
            date: new Date('2025-07-15T13:45:00Z'),
            published: true
        },
         {
            senderName: 'Me',
            senderEmail: 'boost@vuedesign.co',
            recipientName: 'Jack Black',
            recipientEmail: 'jack@black.com',
            subject: 'Second Email Subject',
            content: 'This is also a sample email.',
            isRead: false,
            isSent: true,
            isStarred: false,
            isArchived: false,
            isDeleted: false,
            isDraft: false,
            date: new Date('2025-09-15T13:45:00Z'),
            published: true
        },
          {
            senderName: 'James Morgan',
            senderEmail: 'james@teamrocket.com',
            recipientName: 'Me',
            recipientEmail: 'boost@vuedesign.co',
            subject: 'Second Email Subject',
            content: 'Prepare for trouble! And make it double!',
            isRead: true,
            isSent: false,
            isStarred: false,
            isArchived: false,
            isDeleted: true,
            isDraft: false,
            date: new Date('2025-11-15T13:45:00Z'),
            published: true
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