// app/api/bugs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE BUG
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, severity, url, screenshot } = body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      !["LOW", "MEDIUM", "HIGH"].includes(severity)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }

    const bug = await prisma.bug.create({
      data: {
        title,
        description,
        severity,
        url: url || null,
        screenshot: screenshot || null,
      },
    });

    return NextResponse.json({ success: true, bug }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/bugs error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET ALL BUGS
export async function GET() {
  try {
    const bugs = await prisma.bug.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bugs });
  } catch (err: any) {
    console.error("GET /api/bugs error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
