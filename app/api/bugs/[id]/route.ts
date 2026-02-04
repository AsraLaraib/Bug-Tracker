import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Fix: Use Promise for params and type assertions to satisfy Next.js
type Params = { id: string };

export async function GET(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params; // keep await
    const bugId = Number(id);
    if (isNaN(bugId)) {
      return NextResponse.json({ success: false, error: "Invalid bug ID" }, { status: 400 });
    }

    const bug = await prisma.bug.findUnique({ where: { id: bugId } });
    if (!bug) return NextResponse.json({ success: false, error: "Bug not found" }, { status: 404 });

    return NextResponse.json({ success: true, bug }) as NextResponse<any>; // type assertion
  } catch (err: any) {
    console.error("GET /api/bugs/[id] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 }) as NextResponse<any>;
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const bugId = Number(id);
    if (isNaN(bugId)) return NextResponse.json({ success: false, error: "Invalid bug ID" }, { status: 400 }) as NextResponse<any>;

    const body = await req.json();
    const allowedFields = ["title", "description", "severity", "status", "url", "screenshot"];
    const data: Record<string, any> = {};
    for (const field of allowedFields) if (body[field] !== undefined) data[field] = body[field];

    const updatedBug = await prisma.bug.update({ where: { id: bugId }, data });
    return NextResponse.json({ success: true, bug: updatedBug }) as NextResponse<any>;
  } catch (err: any) {
    console.error("PATCH /api/bugs/[id] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 }) as NextResponse<any>;
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const bugId = Number(id);
    if (isNaN(bugId)) return NextResponse.json({ success: false, error: "Invalid bug ID" }, { status: 400 }) as NextResponse<any>;

    await prisma.bug.delete({ where: { id: bugId } });
    return NextResponse.json({ success: true, message: "Bug deleted" }) as NextResponse<any>;
  } catch (err: any) {
    console.error("DELETE /api/bugs/[id] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 }) as NextResponse<any>;
  }
}
