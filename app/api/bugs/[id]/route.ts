import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Convert id to number
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid bug ID" }, { status: 400 });
    }

    const bug = await prisma.bug.findUnique({
      where: { id },
    });

    if (!bug) {
      return NextResponse.json({ success: false, error: "Bug not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, bug });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
