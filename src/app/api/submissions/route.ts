import { NextResponse } from 'next/server';
import { getSubmissions, updateSubmission, getUsers, saveSubmission } from '@/lib/data';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    if (!phone) return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });

    const submissions = await getSubmissions();
    const users = await getUsers();
    const sanitizedInput = phone.replace(/\D/g, '');

    const user = users.find((u: any) => {
      const dbDigits = (u.phone || "").replace(/\D/g, '');
      return dbDigits.includes(sanitizedInput) || sanitizedInput.includes(dbDigits);
    });
    const userSubmissions = submissions.filter((s: any) => {
      const subDigits = (s.phone || "").replace(/\D/g, '');
      return subDigits.includes(sanitizedInput) || sanitizedInput.includes(subDigits);
    });

    return NextResponse.json({
      user: user || { name: 'Retailer' },
      submissions: userSubmissions
    });
  } catch (error) {
    console.error("Retailer API error:", error);
    return NextResponse.json({
      user: { name: 'Retailer' },
      submissions: []
    });
  }
}

export async function POST(req: Request) {
  try {
    const { phone, invoiceNo, invoiceDate, capacity } = await req.json();

    if (!phone || !invoiceNo) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = Date.now();
    const submission = await saveSubmission({
      id: timestamp.toString(),
      phone,
      invoiceNo,
      invoiceDate,
      capacity,
      status: 'pending',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { id, claimedGift } = await req.json();
  const updated = await updateSubmission(id, { claimedGift, status: 'claimed' });
  if (updated) {
    return NextResponse.json({ success: true, submission: updated });
  }
  return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
}
