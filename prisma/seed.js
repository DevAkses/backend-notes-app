const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.note.createMany({
    data: [
      { title: 'First Note', body: 'This is the body of the first note' },
      { title: 'Second Note', body: 'This is the body of the second note' },
    ],
  });

  console.log('Data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
