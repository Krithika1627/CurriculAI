import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { id, courseOutput, courseBanner } = await req.json();

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: JSON.stringify(courseOutput),
        courseBanner: courseBanner,
      })
      .where(eq(CourseList.id, id))
      .returning({ id: CourseList.id });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
