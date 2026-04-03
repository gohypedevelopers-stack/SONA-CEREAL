const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const submissions = await prisma.submission.findMany();
  const slabs = await prisma.slab.findMany();

  console.log('--- USERS ---');
  console.log(JSON.stringify(users, null, 2));
  console.log('--- SUBMISSIONS ---');
  console.log(JSON.stringify(submissions, null, 2));
  console.log('--- SLABS ---');
  console.log(JSON.stringify(slabs, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
