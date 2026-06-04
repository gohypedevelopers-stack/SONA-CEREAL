import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    
    const whereClause: any = {};
    
    if (status && status !== "ALL") {
      whereClause.status = status;
    }
    
    if (search) {
      whereClause.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { 
          redemption: {
            OR: [
              { phone: { contains: search } },
              { name: { contains: search, mode: "insensitive" } },
            ]
          }
        }
      ];
    }

    const coupons = await prisma.coupon.findMany({
      where: whereClause,
      include: {
        redemption: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10000 // Increased limit to show more coupons
    });

    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code
      }
    });

    return NextResponse.json({ success: true, coupon });
  } catch (error: any) {
    console.error("Error creating coupon:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // We optionally might want to not delete redeemed coupons, 
    // but the user asked to "delete all coupon code at once".
    // Note: If a coupon is referenced by a CouponRedemption, deleting it might fail due to foreign key constraints, 
    // unless we delete the redemptions first or cascade.
    // Let's delete redemptions first, then coupons to avoid foreign key errors.
    
    await prisma.couponRedemption.deleteMany({});
    await prisma.coupon.deleteMany({});
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting all coupons:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
