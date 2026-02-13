import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "courseId is required" },
        { status: 400 }
      );
    }

    await db
      .update(CourseList)
      .set({ publish: true })
      .where(eq(CourseList.courseId, courseId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUBLISH ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
