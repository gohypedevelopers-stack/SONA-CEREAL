import { NextResponse } from 'next/server';
import { saveUser, getUserByEmail, getUserByPhone, getLatestVerificationCode } from '@/lib/data';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { hashSecret, isStrongPassword, isValidEmail } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');
  const email = searchParams.get('email');

  if (!phone && !email) {
    return NextResponse.json({ error: 'Phone or email is required' }, { status: 400 });
  }

  const userByPhone = phone ? await getUserByPhone(phone) : null;
  const userByEmail = email ? await getUserByEmail(email.trim().toLowerCase()) : null;

  return NextResponse.json({
    exists: !!userByPhone || !!userByEmail,
    phoneExists: !!userByPhone,
    emailExists: !!userByEmail,
    user: userByPhone || userByEmail ? {
      name: (userByPhone || userByEmail)?.name,
      shopName: (userByPhone || userByEmail)?.shopName,
      city: (userByPhone || userByEmail)?.city
    } : null
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const shopName = formData.get('shopName') as string;
    const phone = formData.get('phone') as string;
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const city = formData.get('city') as string;
    const authMethod = (formData.get('authMethod') as string || 'password').trim();
    const password = (formData.get('password') as string || '').trim();

    if (!phone || !name || !shopName || !city) {
      return NextResponse.json({ success: false, error: "Name, shop name, phone, and city are required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "A valid email address is required" }, { status: 400 });
    }

    if (authMethod === 'password' && !isStrongPassword(password)) {
      return NextResponse.json({ success: false, error: "Password must be at least 8 characters and include letters and numbers." }, { status: 400 });
    }

    if (authMethod === 'email_otp') {
      const verification = await getLatestVerificationCode(email, 'register');
      if (!verification?.verifiedAt) {
        return NextResponse.json({ success: false, error: "Verify your email OTP before completing registration." }, { status: 400 });
      }
    }

    if (authMethod !== 'password' && authMethod !== 'email_otp') {
      return NextResponse.json({ success: false, error: "Invalid registration method" }, { status: 400 });
    }

    let aadharFrontPath = '';
    let aadharBackPath = '';

    // Process files
    const aadharFront = formData.get('aadharFront') as File | null;
    if (aadharFront && aadharFront.size > 0) {
      const buffer = Buffer.from(await aadharFront.arrayBuffer());
      const base64 = `data:${aadharFront.type};base64,${buffer.toString('base64')}`;
      const res = await uploadToCloudinary(base64, 'registration');
      if (res.success) {
        aadharFrontPath = res.url || "";
      }
    }

    const aadharBack = formData.get('aadharBack') as File | null;
    if (aadharBack && aadharBack.size > 0) {
      const buffer = Buffer.from(await aadharBack.arrayBuffer());
      const base64 = `data:${aadharBack.type};base64,${buffer.toString('base64')}`;
      const res = await uploadToCloudinary(base64, 'registration');
      if (res.success) {
        aadharBackPath = res.url || "";
      }
    }

    const existingByPhone = await getUserByPhone(phone);
    const existingByEmail = await getUserByEmail(email);

    if (existingByPhone) {
      return NextResponse.json({ success: false, error: "Phone number already registered.", code: "PHONE_EXISTS" }, { status: 409 });
    }

    if (existingByEmail) {
      return NextResponse.json({ success: false, error: "Email already registered.", code: "EMAIL_EXISTS" }, { status: 409 });
    }

    await saveUser({
      phone,
      email,
      name,
      shopName,
      city,
      passwordHash: authMethod === 'password' ? await hashSecret(password) : null,
      authMethod,
      emailVerified: authMethod === 'email_otp',
      aadharFront: aadharFrontPath,
      aadharBack: aadharBackPath,
      registeredAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Business Registered Successfully" });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
