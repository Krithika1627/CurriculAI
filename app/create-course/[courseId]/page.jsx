"use client";

import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "../../../components/ui/button";
import { GenerateChapterContent_AI } from "../../../configs/AiModel";
import LoadingDialogue from "../_components/LoadingDialogue";
import service from "../../../configs/service";

function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const getCourse = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const res = await fetch(`/api/course/${params.courseId}`, {
      headers: { "x-user-email": email },
    });

    const data = await res.json();

    const rawOutput = JSON.parse(data.data[0].courseOutput);

    const normalizedOutput = {
      ...rawOutput,
      course_name:
        rawOutput.course_name ||
        rawOutput["course name"] ||
        rawOutput.name ||
        "",
    };

    const parsed = {
      ...data.data[0],
      courseOutput: normalizedOutput,
    };

    setCourse(parsed);
  };

  useEffect(() => {
    if (!isLoaded || !user || !params?.courseId) return;
    getCourse();
  }, [isLoaded, user, params?.courseId]);

  const cleanJSON = (str) =>
    str.replace(/```json/gi, "").replace(/```/g, "").trim();

  const generateChapterContent = async () => {
    setLoading(true);

    const chapters = course?.courseOutput?.chapters;
    if (!chapters) {
      setLoading(false);
      return;
    }

    try {
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];

        const videoResp = await service.getVideos(
          course?.name + ":" + chapter?.chapter_name
        );

        const videoId = videoResp?.[0]?.id?.videoId || "";

        const result = await GenerateChapterContent_AI(course, chapter);
        const parsed = JSON.parse(cleanJSON(result));

        await fetch("/api/chapters/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chapterId: index,
            courseId: course.courseId,
            content: JSON.stringify(parsed),
            videoId,
          }),
        });
      }

      await publishCourse();
      router.replace(`/create-course/${course?.courseId}/finish`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const publishCourse = async () => {
    try {
      await fetch("/api/course/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.courseId }),
      });
    } catch (err) {
      console.error("Publish update failed:", err);
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44 text-foreground">
      <h2 className="font-bold text-center text-2xl text-foreground">
        Course Layout
      </h2>

      <LoadingDialogue loading={loading} />

      <CourseBasicInfo course={course} refreshData={getCourse} />
      <CourseDetails course={course} />
      <ChapterList course={course} refreshData={getCourse} />

      <Button
        className="mt-5 bg-primary text-primary-foreground hover:bg-accent"
        onClick={generateChapterContent}
      >
        Generate Course
      </Button>
    </div>
  );
}

export default CoursePage;
