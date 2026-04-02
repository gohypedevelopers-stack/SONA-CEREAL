import { prisma } from './prisma';

export const getUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const saveUser = async (user: any) => {
  return await prisma.user.upsert({
    where: { phone: user.phone },
    update: {
      name: user.name,
      shopName: user.shopName,
      city: user.city,
      aadharFront: user.aadharFront,
      aadharBack: user.aadharBack,
    },
    create: {
      phone: user.phone,
      name: user.name,
      shopName: user.shopName,
      city: user.city,
      aadharFront: user.aadharFront,
      aadharBack: user.aadharBack,
    },
  });
};

export const getSubmissions = async () => {
  const subs = await prisma.submission.findMany({
    include: { user: true },
    orderBy: { timestamp: 'desc' }
  });
  // Map to the format the admin panel expects
  return subs.map((s: any) => ({
    ...s,
    name: s.user?.name,
    shopName: s.user?.shopName,
    city: s.user?.city,
    phone: s.user?.phone
  }));
};

export const saveSubmission = async (data: any) => {
  const sanitizedInput = (data.phone || "").replace(/\D/g, '');
  
  // Find user by fuzzy phone matching
  const allUsers = await getUsers();
  const user = allUsers.find((u: any) => {
    const dbDigits = (u.phone || "").replace(/\D/g, '');
    return dbDigits.includes(sanitizedInput) || sanitizedInput.includes(dbDigits);
  });

  if (!user) {
    console.error("Submission failed: User not found for phone", data.phone);
    throw new Error(`Business not registered for phone: ${data.phone}. Please register first!`);
  }

  return await prisma.submission.create({
    data: {
      userId: user.id,
      invoiceNo: data.invoiceNo,
      invoiceDate: data.invoiceDate,
      capacity: data.capacity,
      aadharFront: user.aadharFront || '',
      aadharBack: user.aadharBack || '',
      status: 'pending'
    }
  });
};

export const updateSubmission = async (id: string, updates: any) => {
  return await prisma.submission.update({
    where: { id },
    data: updates
  });
};
