import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    await db.insert(CourseList).values(data).returning();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
