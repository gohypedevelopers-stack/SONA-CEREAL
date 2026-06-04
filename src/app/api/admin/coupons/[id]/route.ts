import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Allow updating status or note
    const allowedFields = ['status', 'note', 'expiresAt'];
    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'expiresAt') {
          updateData[field] = body[field] ? new Date(body[field]) : null;
        } else {
          updateData[field] = body[field];
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
