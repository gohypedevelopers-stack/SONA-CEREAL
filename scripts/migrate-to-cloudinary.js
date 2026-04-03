
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;

// Set your Cloudinary URL here before running
// cloudinary.config({ cloudinary_url: "YOUR_URL" });

const prisma = new PrismaClient();

async function migrateImages() {
  const slabs = await prisma.slab.findMany();
  console.log(`Found ${slabs.length} slabs to check.`);

  for (const slab of slabs) {
    let updated = false;
    let updateData = {};

    // Check Gift A Image
    if (slab.giftAImg && slab.giftAImg.startsWith('data:image')) {
      console.log(`Uploading Gift A for Slab ${slab.level} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(slab.giftAImg, { folder: 'slabs' });
      updateData.giftAImg = result.secure_url;
      updated = true;
    }

    // Check Gift B Image
    if (slab.giftBImg && slab.giftBImg.startsWith('data:image')) {
      console.log(`Uploading Gift B for Slab ${slab.level} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(slab.giftBImg, { folder: 'slabs' });
      updateData.giftBImg = result.secure_url;
      updated = true;
    }

    if (updated) {
      await prisma.slab.update({
        where: { id: slab.id },
        data: updateData
      });
      console.log(`Updated Slab ${slab.level} with Cloudinary URLs.`);
    }
  }

  console.log("Image migration complete!");
}

migrateImages()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
