
const { PrismaClient } = require('@prisma/client');

const OLD_URL = "postgresql://neondb_owner:npg_vU1xbCgLOIV5@ep-flat-leaf-a44onxnm-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
const NEW_URL = "postgresql://neondb_owner:npg_Bbd3PFfktc0I@ep-late-snow-a1w2t2ji-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: OLD_URL
    }
  }
});

const newPrisma = new PrismaClient({
  datasources: {
    db: {
      url: NEW_URL
    }
  }
});

async function migrate() {
  console.log("Starting migration...");

  // 1. Migrate Slabs
  console.log("Migrating Slabs...");
  const slabs = await oldPrisma.slab.findMany();
  for (const slab of slabs) {
    await newPrisma.slab.upsert({
      where: { id: slab.id },
      update: slab,
      create: slab,
    });
  }
  console.log(`Migrated ${slabs.length} Slabs.`);

  // 2. Migrate Settings
  console.log("Migrating Settings...");
  const settings = await oldPrisma.settings.findMany();
  for (const setting of settings) {
    await newPrisma.settings.upsert({
      where: { id: setting.id },
      update: setting,
      create: setting,
    });
  }
  console.log(`Migrated ${settings.length} Settings.`);

  // 3. Migrate Users
  console.log("Migrating Users...");
  const users = await oldPrisma.user.findMany();
  for (const user of users) {
    await newPrisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
  console.log(`Migrated ${users.length} Users.`);

  // 4. Migrate Submissions
  console.log("Migrating Submissions...");
  const submissions = await oldPrisma.submission.findMany();
  for (const sub of submissions) {
    await newPrisma.submission.upsert({
      where: { id: sub.id },
      update: sub,
      create: sub,
    });
  }
  console.log(`Migrated ${submissions.length} Submissions.`);

  console.log("Migration finished successfully!");
}

migrate()
  .catch(e => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await oldPrisma.$disconnect();
    await newPrisma.$disconnect();
  });
