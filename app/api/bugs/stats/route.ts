import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const total = await prisma.bug.count();
    const open = await prisma.bug.count({ where: { status: "Open" } });
    const resolved = await prisma.bug.count({ where: { status: "Done" } });

    return NextResponse.json({ total, open, resolved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
