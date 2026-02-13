import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { Chapters } from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req, context) {
  // ✅ THIS IS THE FIX
  const { chapterId } = await context.params;

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const chapterIdNum = Number(chapterId);

  if (!courseId || Number.isNaN(chapterIdNum)) {
    return NextResponse.json(
      { success: false, error: "Invalid params" },
      { status: 400 }
    );
  }

  const result = await db
    .select()
    .from(Chapters)
    .where(
      and(
        eq(Chapters.chapterId, chapterIdNum),
        eq(Chapters.courseId, courseId)
      )
    );

  return NextResponse.json({
    success: true,
    data: result[0] ?? null,
  });
}
