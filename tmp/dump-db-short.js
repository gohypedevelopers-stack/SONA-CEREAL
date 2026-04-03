const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { phone: true, name: true } });
  const submissions = await prisma.submission.findMany({ select: { phone: true, status: true, capacity: true } });
  const slabs = await prisma.slab.findMany({ select: { target: true, level: true } });

  console.log('--- USERS ---');
  users.forEach(u => console.log(`${u.name}: ${u.phone}`));
  console.log('--- SUBMISSIONS ---');
  submissions.forEach(s => console.log(`${s.phone} | Status: ${s.status} | Qty: ${s.capacity}`));
  console.log('--- SLABS ---');
  slabs.forEach(sl => console.log(`${sl.level}: ${sl.target} QTL`));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
