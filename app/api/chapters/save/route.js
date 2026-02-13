import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { Chapters } from "../../../../configs/schema";

export async function POST(req) {
    try {
      const { chapterId, courseId, content, videoId } = await req.json();
  
      if (
        typeof chapterId !== "number" ||
        !courseId ||
        !content
      ) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      await db.insert(Chapters).values({
        chapterId,
        courseId,
        content,
        videoId,
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("SAVE CHAPTER ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }
  