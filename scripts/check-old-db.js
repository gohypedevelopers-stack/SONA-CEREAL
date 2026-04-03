
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_vU1xbCgLOIV5@ep-flat-leaf-a44onxnm-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
    }
  }
});

async function main() {
  const userCount = await prisma.user.count();
  const submissionCount = await prisma.submission.count();
  const slabCount = await prisma.slab.count();
  console.log(`Old DB User Count: ${userCount}`);
  console.log(`Old DB Submission Count: ${submissionCount}`);
  console.log(`Old DB Slab Count: ${slabCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
