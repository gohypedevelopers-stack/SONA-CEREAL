
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userCount = await prisma.user.count();
  const submissionCount = await prisma.submission.count();
  const slabCount = await prisma.slab.count();
  console.log(`User Count: ${userCount}`);
  console.log(`Submission Count: ${submissionCount}`);
  console.log(`Slab Count: ${slabCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
