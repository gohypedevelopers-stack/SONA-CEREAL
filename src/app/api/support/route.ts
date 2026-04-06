import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { category, phone, message } = await req.json();

    if (!category || !phone || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        category,
        phone,
        message,
      },
    });

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error("Support submission error:", error);
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
