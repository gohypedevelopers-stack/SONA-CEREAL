import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

export async function GET(req: Request) {
  try {
    const redemptions = await prisma.couponRedemption.findMany({
      include: {
        coupon: true,
        slab: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const exportData = redemptions.map(r => ({
      RedemptionID: r.id,
      CouponCode: r.coupon.code,
      CouponStatus: r.coupon.status,
      UserPhone: r.phone || "",
      UserName: r.name || "",
      SelectedGift: r.selectedGift,
      SlabLevel: r.slab?.level || "",
      RedeemedAt: r.redeemedAt.toISOString(),
      IPAddress: r.ipAddress || "",
    }));

    const csv = Papa.unparse(exportData);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="coupon_redemptions_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting redemptions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
