import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const settings = await updateSettings(body);
  return NextResponse.json({ success: true, settings });
}
