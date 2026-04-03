
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSubmissions() {
  const subs = await prisma.submission.findMany();
  console.log(`Found ${subs.length} submissions.`);

  for (const sub of subs) {
    console.log(`Sub ID: ${sub.id}`);
    console.log(`  aadharFront length: ${sub.aadharFront ? sub.aadharFront.length : 0}`);
    console.log(`  aadharBack length: ${sub.aadharBack ? sub.aadharBack.length : 0}`);
    if (sub.aadharFront && sub.aadharFront.startsWith('data:image')) {
      console.log(`  ** FOUND BASE64 in aadharFront !! **`);
    }
  }
}

checkSubmissions()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
