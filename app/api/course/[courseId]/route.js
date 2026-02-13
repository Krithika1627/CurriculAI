import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";

export async function GET(req, context) {
  try {
    
    const { courseId } = await context.params;

    console.log("PARAM courseId:", courseId);

    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, courseId));

    console.log("QUERY RESULT:", result);

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("DB ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
