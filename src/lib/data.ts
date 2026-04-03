import { prisma } from './prisma';

/**
 * User helpers
 */
export async function getUserByPhone(phone: string) {
  return await prisma.user.findUnique({
    where: { phone }
  });
}

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function saveUser(data: any) {
  return await prisma.user.upsert({
    where: { phone: data.phone },
    update: data,
    create: data
  });
}

/**
 * Submission helpers
 */
export async function createSubmission(data: any) {
  return await prisma.submission.create({
    data
  });
}

export async function saveSubmission(data: any) {
  return await prisma.submission.create({
    data
  });
}

export async function getSubmissionsByPhone(phone: string) {
  return await (prisma.submission as any).findMany({
    where: { phone },
    orderBy: { timestamp: 'desc' }
  });
}

export async function getSubmissions() {
  return await prisma.submission.findMany({
    orderBy: { timestamp: 'desc' }
  });
}

export async function getAllSubmissions() {
  return await prisma.submission.findMany({
    orderBy: { timestamp: 'desc' }
  });
}

export async function updateSubmission(id: string, data: any) {
  const updateData = typeof data === 'string' ? { status: data } : data;
  return await prisma.submission.update({
    where: { id },
    data: updateData
  });
}

export async function updateSubmissionStatus(id: string, status: string) {
  return await prisma.submission.update({
    where: { id },
    data: { status }
  });
}

export async function claimGift(id: string, gift: string) {
  return await prisma.submission.update({
    where: { id },
    data: { 
      claimedGift: gift,
      status: 'claimed'
    }
  });
}

/**
 * Slab helpers
 */
export async function getSlabs() {
  return (prisma as any).slab.findMany({
    orderBy: { target: 'asc' }
  });
}

export async function saveSlab(data: any) {
  const { id, ...rest } = data;
  if (id && id !== 'new') {
    return (prisma as any).slab.update({
      where: { id },
      data: rest
    });
  }
  return (prisma as any).slab.create({
    data: rest
  });
}

export async function deleteSlab(id: string) {
  return (prisma as any).slab.delete({ where: { id } });
}

/**
 * Settings helpers
 */
export async function getSettings() {
  let settings = await (prisma as any).settings.findUnique({ where: { id: 'global' } });
  if (!settings) {
    settings = await (prisma as any).settings.create({
      data: { id: 'global', rewardsDistributed: false }
    });
  }
  return settings;
}

export async function updateSettings(data: any) {
  return (prisma as any).settings.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  });
}
