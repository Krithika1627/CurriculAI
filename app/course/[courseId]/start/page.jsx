"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart() {
  const params = useParams();

  const [course, setCourse] = useState(null);
  const [courseOutput, setCourseOutput] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedChapter, setSelectedChapter] = useState(null); // UI chapter
  const [chapterContent, setChapterContent] = useState(null);   // DB content

  useEffect(() => {
    if (!params?.courseId) return;
    getCourse();
  }, [params?.courseId]);

  // 🔹 Fetch course + auto-load first chapter
  const getCourse = async () => {
    try {
      const res = await fetch(`/api/course/${params.courseId}`);
      const data = await res.json();

      if (data?.success && data?.data?.length > 0) {
        const courseData = data.data[0];
        setCourse(courseData);

        const parsedOutput =
          typeof courseData.courseOutput === "string"
            ? JSON.parse(courseData.courseOutput)
            : courseData.courseOutput;

        setCourseOutput(parsedOutput);

        // ✅ Auto-load first chapter
        const firstChapter = parsedOutput.chapters[0];
        setSelectedChapter(firstChapter);
        fetchChapterContent(0, firstChapter, courseData.courseId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch chapter content from DB
  const fetchChapterContent = async (chapterIndex, chapterMeta, courseId) => {
    if (chapterIndex === undefined || !courseId) return;

    const res = await fetch(
      `/api/chapters/${chapterIndex}?courseId=${courseId}`
    );

    if (!res.ok) {
      console.error("Chapter fetch failed:", res.status);
      return;
    }

    const data = await res.json();

    setSelectedChapter(chapterMeta);   // UI chapter
    setChapterContent(data.data);      // DB content
  };

  // 🔹 Loading state
  if (loading || !courseOutput) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        Loading course...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed md:w-64 hidden md:flex flex-col h-screen border-r border-border shadow-sm bg-sidebar">
        <div className="font-medium p-4 border-b border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground text-center">
          {courseOutput.course_name}
        </div>

        <div className="flex-1 overflow-y-auto">
          {courseOutput.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-colors ${
                selectedChapter?.chapter_name === chapter.chapter_name
                  ? "bg-sidebar-accent"
                  : "hover:bg-sidebar-accent/50"
              }`}
              onClick={() =>
                fetchChapterContent(index, chapter, course.courseId)
              }
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="md:ml-64 p-6 w-full">
        {chapterContent ? (
          <ChapterContent
            chapter={selectedChapter}
            content={chapterContent}
          />
        ) : (
          <p className="flex items-center justify-center h-full text-muted-foreground">Select a chapter</p>
        )}
      </div>
    </div>
  );
}

export default CourseStart;
