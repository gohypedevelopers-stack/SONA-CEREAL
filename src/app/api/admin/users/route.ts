import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/data';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await getUsers();
    const slabs = await prisma.slab.findMany({ orderBy: { target: 'asc' } });

    // Enrich users with stats
    const enrichedUsers = await Promise.all(users.map(async (user: any) => {
      const cleanPhone = user.phone.replace(/\D/g, '');
      const last10 = cleanPhone.slice(-10);

      const submissions = await prisma.submission.findMany({
        where: {
          OR: [
            { phone: user.phone },
            { phone: cleanPhone },
            { phone: { contains: last10 } }
          ]
        }
      });

      const acceptedSubs = submissions.filter(s => s.status === 'accepted' || s.status === 'claimed');
      const totalQty = acceptedSubs.reduce((acc, s) => acc + (parseFloat(s.capacity) || 0), 0);

      const claimedSub = submissions.find(s => s.claimedGift);
      const claimedGift = claimedSub ? claimedSub.claimedGift : null;
      
      // Determine auto slab
      let autoSlab: any = null;
      for (let i = slabs.length - 1; i >= 0; i--) {
        if (totalQty >= slabs[i].target) {
          autoSlab = slabs[i];
          break;
        }
      }

      // Determine final achieved slab (honor override)
      let finalSlab = autoSlab;
      if (user.overrideSlabId) {
        finalSlab = slabs.find(s => s.id === user.overrideSlabId) || autoSlab;
      }
      
      return {
        ...user,
        totalQty,
        claimedGift,
        autoSlabId: autoSlab ? autoSlab.id : null,
        autoSlabNo: autoSlab ? autoSlab.level : '—',
        slabId: finalSlab ? finalSlab.id : null,
        slabNo: finalSlab ? finalSlab.level : '—',
        slabName: finalSlab ? `${finalSlab.giftA}/${finalSlab.giftB}` : '—'
      };
    }));

    return NextResponse.json({ users: enrichedUsers, allSlabs: slabs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { phone, slabId } = await request.json();
    if (!phone) return NextResponse.json({ error: 'Phone number required' }, { status: 400 });

    await (prisma as any).user.update({
      where: { phone },
      data: { overrideSlabId: slabId === 'auto' ? null : slabId }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    if (!phone) {
      // GLOBAL RESET: Delete all submissions and clear all overrides
      await (prisma as any).$transaction([
        (prisma as any).submission.deleteMany(),
        (prisma as any).user.updateMany({ data: { overrideSlabId: null } }),
        (prisma as any).settings.update({ where: { id: 'global' }, data: { rewardsDistributed: false } })
      ]);
      return NextResponse.json({ success: true, message: 'All campaign data has been reset.' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const last10 = cleanPhone.slice(-10);

    // Delete all submissions for this phone number to reset their record
    // Using broad match to ensure we catch all related submissions
    await prisma.submission.deleteMany({
      where: {
        OR: [
          { phone: phone },
          { phone: cleanPhone },
          { phone: { contains: last10 } }
        ]
      }
    });

    return NextResponse.json({ success: true, message: 'User records reset successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
