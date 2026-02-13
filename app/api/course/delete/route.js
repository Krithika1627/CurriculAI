import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Course id required" },
        { status: 400 }
      );
    }

    await db.delete(CourseList).where(eq(CourseList.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE COURSE ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
