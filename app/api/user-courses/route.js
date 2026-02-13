import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json([], { status: 200 });
  }

  const result = await db
    .select()
    .from(CourseList)
    .where(eq(CourseList.createdBy, email));

  return NextResponse.json(result);
}
