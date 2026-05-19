import { NextResponse } from 'next/server';
import { getUserByIdentifier } from '@/lib/data';
import { verifySecret } from '@/lib/auth';

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  const normalizedIdentifier = String(identifier || '').trim().toLowerCase();
  const normalizedPassword = String(password || '');

  if (!normalizedIdentifier || !normalizedPassword) {
    return NextResponse.json({ success: false, message: 'Identifier and password are required.' }, { status: 400 });
  }

  const user = await getUserByIdentifier(normalizedIdentifier);
  if (!user || !user.passwordHash) {
    return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
  }

  const validPassword = await verifySecret(normalizedPassword, user.passwordHash);
  if (!validPassword) {
    return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user: {
      phone: user.phone,
      email: user.email,
      name: user.name,
      authMethod: user.authMethod
    }
  });
}
