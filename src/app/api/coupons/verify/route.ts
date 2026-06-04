import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    if (coupon.status !== "AVAILABLE") {
      return NextResponse.json({ error: `Coupon is ${coupon.status.toLowerCase()}` }, { status: 400 });
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ error: "Coupon has expired" }, { status: 400 });
    }

    // Also check global settings if redeem portal is open (if needed, but for now we return status)
    const settings = await prisma.settings.findUnique({ where: { id: "global" } });

    return NextResponse.json({
      valid: true,
      couponId: coupon.id,
      rewardsDistributed: settings?.rewardsDistributed || false
    });

  } catch (error) {
    console.error("Error verifying coupon:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
