import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 0;
    const limit = 9;
    const offset = page * limit;

    const result = await db
      .select()
      .from(CourseList)
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
