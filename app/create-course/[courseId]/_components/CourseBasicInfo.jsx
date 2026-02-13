"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HiMiniPuzzlePiece } from "react-icons/hi2";
import { Button } from "../../../../components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  if (!course || !course.courseOutput) {
    return (
      <div className="p-10 border border-border rounded-xl shadow-sm mt-5 text-muted-foreground">
        Loading course details...
      </div>
    );
  }

  const courseOutput =
    typeof course.courseOutput === "string"
      ? JSON.parse(course.courseOutput)
      : course.courseOutput;

  const [banner, setBanner] = useState(course?.courseBanner || "");

  useEffect(() => {
    if (course?.courseBanner) {
      setBanner(course.courseBanner);
    }
  }, [course?.courseBanner]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ai_course_images");
  
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwcgjajwa/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  
    const data = await res.json();
    return data.secure_url;
  };
  
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const imageUrl = await uploadToCloudinary(file);
  
    await fetch("/api/course/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: course.id,
        courseOutput,
        courseBanner: imageUrl,
      }),
    });
  
    setBanner(imageUrl);
    refreshData(true);
  };
  

  return (
    <div className="p-10 border border-border bg-card rounded-xl shadow-sm mt-5 text-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <h2 className="font-bold text-3xl flex gap-2 items-center">
            {courseOutput?.course_name}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>

          <p className="text-xs text-muted-foreground mt-3">
            {courseOutput?.description}
          </p>

          <h2 className="font-medium mt-2 flex gap-2 items-center text-muted-foreground">
            <HiMiniPuzzlePiece />
            {course?.category}
          </h2>

          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-5 bg-primary text-primary-foreground hover:bg-accent">
                Start
              </Button>
            </Link>
          )}
        </div>

        <div>
          <label htmlFor="upload-image">
            <Image
              src={banner || "/placeholder.jpg"}
              width={300}
              height={300}
              alt="img"
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
            />
          </label>

          {edit && (
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              className="hidden"
              onChange={onFileSelected}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default CourseBasicInfo;
