import { NextResponse } from 'next/server';
import { getSlabs, saveSlab, deleteSlab } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slabs = await getSlabs();
    return NextResponse.json(Array.isArray(slabs) ? slabs : []);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slab = await saveSlab(body);
    return NextResponse.json(slab);
  } catch (error: any) {
    console.error('API Error saving slab:', error);
    return NextResponse.json({ error: error.message || 'Failed to save slab' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await deleteSlab(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete slab' }, { status: 500 });
  }
}
