// app/api/bugs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE a new bug
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, severity, url, screenshot } = body;

    if (!title || !description || !severity) {
      return NextResponse.json(
        { success: false, error: "Title, description, and severity are required" },
        { status: 400 }
      );
    }

    const bug = await prisma.bug.create({
      data: { title, description, severity, url, screenshot },
    });

    return NextResponse.json({ success: true, bug });
  } catch (err: any) {
    console.error("POST /api/bugs error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET all bugs, newest first
export async function GET() {
  try {
    const bugs = await prisma.bug.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bugs });
  } catch (err: any) {
    console.error("GET /api/bugs error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// UPDATE bug by id (e.g., update status)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, severity, status, url, screenshot } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Bug ID is required" }, { status: 400 });
    }

    const bug = await prisma.bug.update({
      where: { id: Number(id) },
      data: { title, description, severity, status, url, screenshot },
    });

    return NextResponse.json({ success: true, bug });
  } catch (err: any) {
    console.error("PUT /api/bugs error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE bug by id
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Bug ID is required" }, { status: 400 });
    }

    await prisma.bug.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: `Bug ${id} deleted` });
  } catch (err: any) {
    console.error("DELETE /api/bugs error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
