import { NextResponse } from 'next/server';
import { getUserByPhone } from '@/lib/data';

export async function POST(req: Request) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ success: false, message: 'Phone is required' }, { status: 400 });
  }

  console.log(`Sending mock OTP 1234 to ${phone}`);
  return NextResponse.json({ success: true, message: 'OTP sent' });
}

export async function PUT(req: Request) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json({ success: false, message: 'Phone and OTP are required' }, { status: 400 });
  }

  if (otp !== '1234') {
    return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
  }

  const user = await getUserByPhone(phone);
  return NextResponse.json({ success: true, user: user || { phone } });
}
