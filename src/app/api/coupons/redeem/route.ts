import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { couponCode, userDetails, selectedGift } = body;

    if (!couponCode || !userDetails || !userDetails.phone || !selectedGift) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Process inside a transaction
    const result = await prisma.$transaction(async (tx) => {
      const coupon = await tx.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon) {
        throw new Error("Invalid coupon code");
      }

      if (coupon.status !== "AVAILABLE") {
        throw new Error(`Coupon is ${coupon.status.toLowerCase()}`);
      }

      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        throw new Error("Coupon has expired");
      }

      // Check slab eligibility based on total accepted invoices
      const userSubmissions = await tx.submission.findMany({
        where: {
          phone: userDetails.phone,
          status: { in: ['accepted', 'claimed'] }
        }
      });

      const totalAcceptedQty = userSubmissions.reduce((acc, sub) => acc + (parseFloat(sub.capacity) || 0), 0);

      const slabs = await tx.slab.findMany({
        orderBy: { target: "asc" },
      });

      const eligibleSlab = slabs.reverse().find(s => s.target <= totalAcceptedQty);

      if (!eligibleSlab) {
        throw new Error("No eligible slab for this user");
      }

      const allowedGifts = [
        eligibleSlab.giftA,
        eligibleSlab.giftB,
        eligibleSlab.giftC,
        eligibleSlab.giftD,
      ].filter(Boolean);

      if (!allowedGifts.includes(selectedGift)) {
        throw new Error("Invalid gift selected for your eligible slab");
      }

      // Create or update User
      const user = await tx.user.upsert({
        where: { phone: userDetails.phone },
        update: {
          name: userDetails.name || undefined,
          shopName: userDetails.shopName || undefined,
          city: userDetails.city || undefined,
        },
        create: {
          phone: userDetails.phone,
          name: userDetails.name || "Unknown",
          shopName: userDetails.shopName || "Unknown",
          city: userDetails.city || "Unknown",
        },
      });

      // Create redemption record
      const redemption = await tx.couponRedemption.create({
        data: {
          couponId: coupon.id,
          userId: user.id,
          slabId: eligibleSlab.id,
          selectedGift,
          phone: user.phone,
          name: user.name,
          ipAddress: req.headers.get("x-forwarded-for") || undefined,
          userAgent: req.headers.get("user-agent") || undefined,
        },
      });

      // Update coupon status
      await tx.coupon.update({
        where: { id: coupon.id },
        data: {
          status: "REDEEMED",
          redeemedById: user.id,
          redeemedAt: new Date(),
        },
      });

      return { user, redemption, slab: eligibleSlab };
    });

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    console.error("Error redeeming coupon:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
