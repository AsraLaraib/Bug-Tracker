import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

// GET a single bug by ID
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const bugId = Number(params.id);

    if (isNaN(bugId)) {
      return NextResponse.json(
        { success: false, error: "Invalid bug ID" },
        { status: 400 }
      );
    }

    const bug = await prisma.bug.findUnique({
      where: { id: bugId },
    });

    if (!bug) {
      return NextResponse.json(
        { success: false, error: "Bug not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bug });
  } catch (err: any) {
    console.error("GET /api/bugs/[id] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// PATCH a bug by ID
export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    const bugId = Number(params.id);

    if (isNaN(bugId)) {
      return NextResponse.json(
        { success: false, error: "Invalid bug ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const allowedFields = [
      "title",
      "description",
      "severity",
      "status",
      "url",
      "screenshot",
    ];

    const data: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    const updatedBug = await prisma.bug.update({
      where: { id: bugId },
      data,
    });

    return NextResponse.json({ success: true, bug: updatedBug });
  } catch (err: any) {
    console.error("PATCH /api/bugs/[id] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE a bug by ID
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const bugId = Number(params.id);

    if (isNaN(bugId)) {
      return NextResponse.json(
        { success: false, error: "Invalid bug ID" },
        { status: 400 }
      );
    }

    await prisma.bug.delete({
      where: { id: bugId },
    });

    return NextResponse.json({
      success: true,
      message: "Bug deleted",
    });
  } catch (err: any) {
    console.error("DELETE /api/bugs/[id] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
