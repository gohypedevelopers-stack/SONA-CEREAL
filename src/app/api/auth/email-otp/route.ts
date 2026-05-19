import { NextResponse } from 'next/server';
import {
  createVerificationCode,
  getLatestVerificationCode,
  getUserByEmail,
  markVerificationCodeVerified
} from '@/lib/data';
import { generateOtpCode, hashSecret, isValidEmail, verifySecret } from '@/lib/auth';
import { sendOtpEmail } from '@/lib/mailer';

const REGISTER_PURPOSE = 'register';
const LOGIN_PURPOSE = 'login';
const OTP_TTL_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  const { email, purpose } = await req.json();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPurpose = purpose === LOGIN_PURPOSE ? LOGIN_PURPOSE : REGISTER_PURPOSE;

  if (!isValidEmail(normalizedEmail)) {
    return NextResponse.json({ success: false, message: 'Enter a valid email address.' }, { status: 400 });
  }

  const existing = await getUserByEmail(normalizedEmail);
  if (normalizedPurpose === REGISTER_PURPOSE && existing) {
    return NextResponse.json({ success: false, message: 'This email is already registered.', code: 'EMAIL_EXISTS' }, { status: 409 });
  }
  if (normalizedPurpose === LOGIN_PURPOSE && !existing) {
    return NextResponse.json({ success: false, message: 'This email is not registered.', code: 'EMAIL_NOT_FOUND' }, { status: 404 });
  }

  const otp = generateOtpCode();
  await createVerificationCode({
    email: normalizedEmail,
    purpose: normalizedPurpose,
    codeHash: await hashSecret(otp),
    expiresAt: new Date(Date.now() + OTP_TTL_MS)
  });

  const result = await sendOtpEmail(normalizedEmail, otp);
  return NextResponse.json({
    success: true,
    message: result.mocked ? 'OTP generated in mock mode. Check server logs.' : 'OTP sent to your email.'
  });
}

export async function PUT(req: Request) {
  const { email, otp, purpose } = await req.json();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedOtp = String(otp || '').trim();
  const normalizedPurpose = purpose === LOGIN_PURPOSE ? LOGIN_PURPOSE : REGISTER_PURPOSE;

  if (!isValidEmail(normalizedEmail) || normalizedOtp.length !== 6) {
    return NextResponse.json({ success: false, message: 'Valid email and 6-digit OTP are required.' }, { status: 400 });
  }

  const verification = await getLatestVerificationCode(normalizedEmail, normalizedPurpose);
  if (!verification) {
    return NextResponse.json({ success: false, message: 'Request a new OTP first.' }, { status: 404 });
  }

  if (verification.verifiedAt) {
    return NextResponse.json({ success: true, message: 'Email already verified.' });
  }

  if (verification.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ success: false, message: 'OTP expired. Request a new one.' }, { status: 400 });
  }

  const matches = await verifySecret(normalizedOtp, verification.codeHash);
  if (!matches) {
    return NextResponse.json({ success: false, message: 'Invalid OTP.' }, { status: 400 });
  }

  await markVerificationCodeVerified(verification.id);
  const user = await getUserByEmail(normalizedEmail);

  return NextResponse.json({
    success: true,
    message: normalizedPurpose === LOGIN_PURPOSE ? 'Login verified successfully.' : 'Email verified successfully.',
    user: user
      ? {
          phone: user.phone,
          email: user.email,
          name: user.name,
          authMethod: user.authMethod
        }
      : null
  });
}
