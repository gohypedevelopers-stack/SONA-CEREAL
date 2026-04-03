import { NextResponse } from 'next/server';
import { saveUser, getUsers } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');

  if (!phone) {
    return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
  }

  const users = await getUsers();
  const user = users.find((u: any) => u.phone === phone);

  return NextResponse.json({
    exists: !!user,
    user: user ? { name: user.name, shopName: user.shopName, city: user.city } : null
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const shopName = formData.get('shopName') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;

    if (!phone || !name) {
      return NextResponse.json({ success: false, error: "Phone and Name are required" }, { status: 400 });
    }

    const timestamp = Date.now();
    let aadharFrontPath = '';
    let aadharBackPath = '';

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process files
    const aadharFront = formData.get('aadharFront') as File | null;
    if (aadharFront && aadharFront.size > 0) {
      const bytes = await aadharFront.arrayBuffer();
      aadharFrontPath = `/uploads/${timestamp}_front_${aadharFront.name.replace(/\s+/g, '_')}`;
      fs.writeFileSync(path.join(process.cwd(), 'public', aadharFrontPath), Buffer.from(bytes));
    }

    const aadharBack = formData.get('aadharBack') as File | null;
    if (aadharBack && aadharBack.size > 0) {
      const bytes = await aadharBack.arrayBuffer();
      aadharBackPath = `/uploads/${timestamp}_back_${aadharBack.name.replace(/\s+/g, '_')}`;
      fs.writeFileSync(path.join(process.cwd(), 'public', aadharBackPath), Buffer.from(bytes));
    }

    // Check if user already exists
    const users = await getUsers();
    const existing = users.find((u: any) => u.phone === phone);

    await saveUser({
      phone,
      name,
      shopName,
      city,
      aadharFront: aadharFrontPath || (existing ? existing.aadharFront : ''),
      aadharBack: aadharBackPath || (existing ? existing.aadharBack : ''),
      registeredAt: existing ? existing.registeredAt : new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Business Registered Successfully" });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
