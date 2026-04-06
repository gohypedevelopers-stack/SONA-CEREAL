import { NextResponse } from 'next/server';
import { getSubmissions, updateSubmission, getUsers, saveSubmission } from '@/lib/data';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    if (!phone) return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });

    const sanitizedInput = phone.replace(/\D/g, '');
    const last10 = sanitizedInput.length >= 10 ? sanitizedInput.slice(-10) : sanitizedInput;

    // Broaden the search: try several formats to find the record
    const [user, userSubmissions] = await Promise.all([
      prisma.user.findFirst({
        where: {
          OR: [
            { phone: { contains: last10, mode: 'insensitive' } },
            { phone: { contains: sanitizedInput, mode: 'insensitive' } },
            { phone: phone }
          ]
        }
      }),
      (prisma.submission as any).findMany({
        where: {
          OR: [
            { phone: { contains: last10, mode: 'insensitive' } },
            { phone: { contains: sanitizedInput, mode: 'insensitive' } },
            { phone: phone }
          ]
        },
        orderBy: { timestamp: 'desc' }
      })
    ]);

    // If still not found and input is long, try one more time with just the digits
    let finalUser = user;
    let finalSubs = userSubmissions;

    if (!finalSubs?.length && sanitizedInput.length > 5) {
      const [retryUser, retrySubs] = await Promise.all([
        prisma.user.findFirst({ where: { phone: { contains: sanitizedInput.slice(-8), mode: 'insensitive' } } }),
        (prisma.submission as any).findMany({ where: { phone: { contains: sanitizedInput.slice(-8), mode: 'insensitive' } }, orderBy: { timestamp: 'desc' } })
      ]);
      if (retrySubs?.length) {
        finalUser = retryUser;
        finalSubs = retrySubs;
      }
    }

    return NextResponse.json({
      user: finalUser || { name: 'Retailer' },
      submissions: finalSubs || []
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
