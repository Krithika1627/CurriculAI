"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CourseBasicInfo from "../../create-course/[courseId]/_components/CourseBasicInfo";
import Header from "../../_components/Header"
import CourseDetails from "../../create-course/[courseId]/_components/CourseDetails";
import ChapterList from "../../create-course/[courseId]/_components/ChapterList";
function Course() {
  const params = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!params?.courseId) return;
    getCourse();
  }, [params?.courseId]);

  const getCourse = async () => {
    const res = await fetch(`/api/course/${params.courseId}`);
    const data = await res.json();
    const raw = data.data[0];

    const parsedCourse = {
      ...raw,
      courseOutput:
        typeof raw.courseOutput === "string"
          ? JSON.parse(raw.courseOutput)
          : raw.courseOutput,
    };

    setCourse(parsedCourse);

    console.log(data);
  };
  if (!course) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main className="max-w-6xl mx-auto px-6 py-10 md:px-10 lg:px-16 space-y-10">
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <CourseBasicInfo course={course} refreshData={getCourse} edit={false} />
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <CourseDetails course={course}/>
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <ChapterList course={course} edit={false}/>
      </div>
      </main>
    </div>
    )
}

export default Course