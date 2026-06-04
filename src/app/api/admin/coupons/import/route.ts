import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const text = await file.text();
    
    // Parse CSV
    const { data, errors } = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase().replace(/^\uFEFF/, '')
    });

    if (errors.length > 0 && data.length === 0) {
      return NextResponse.json({ error: "Invalid CSV format" }, { status: 400 });
    }

    let successCount = 0;
    let duplicateCount = 0;
    let failedRows = [];

    // Process each row
    for (const [index, row] of data.entries()) {
      const code = (row as any).code?.trim();

      if (!code) {
        failedRows.push({ row: index + 2, reason: "Missing code" });
        continue;
      }

      try {
        await prisma.coupon.create({
          data: {
            code
          }
        });
        successCount++;
      } catch (err: any) {
        if (err.code === 'P2002') { // Unique constraint violation (duplicate code)
          duplicateCount++;
        } else {
          failedRows.push({ row: index + 2, reason: err.message || "Database error" });
        }
      }
    }

    return NextResponse.json({
      success: true,
      result: {
        totalRows: data.length,
        successCount,
        duplicateCount,
        failedRows
      }
    });

  } catch (error) {
    console.error("Error importing coupons:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
