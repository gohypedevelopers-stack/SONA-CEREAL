import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';

export async function POST(req: Request) {
  const { phone } = await req.json();
  // In a real app, send actual OTP via SMS
  console.log(`Sending mock OTP 1234 to ${phone}`);
  return NextResponse.json({ success: true, message: 'OTP sent' });
}

export async function PUT(req: Request) {
  const { phone, otp } = await req.json();
  if (otp === '1234') {
    const users = await getUsers();
    const user = users.find((u: any) => u.phone === phone);
    return NextResponse.json({ success: true, user: user || { phone } });
  }
  return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
}
