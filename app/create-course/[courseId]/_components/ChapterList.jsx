import React from 'react'
import { HiMiniClock, HiCheckCircle } from "react-icons/hi2";
import EditChapters from './EditChapters';

function ChapterList({ course, setCourse, edit = true }) {
  if (!course || !course.courseOutput || !Array.isArray(course.courseOutput.chapters)) {
    return (
      <div className="mt-5 text-muted-foreground">
        No chapters available
      </div>
    );
  }

  const chapters = course.courseOutput.chapters;

  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl text-foreground">
        Chapters
      </h2>

      <div className="mt-2">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="border border-border bg-card p-5 rounded-xl mb-2 flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary text-primary-foreground h-10 w-10 rounded-full text-center p-2 flex-none">
                {index + 1}
              </h2>

              <div>
                <h2 className="font-medium text-lg text-foreground">
                  {chapter?.name}
                  {edit && (
                    <EditChapters
                      course={course}
                      index={index}
                      setCourse={setCourse}
                    />
                  )}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {chapter?.about}
                </p>

                <p className="flex gap-2 items-center text-muted-foreground">
                  <HiMiniClock />
                  {chapter?.duration}
                </p>
              </div>
            </div>

            <HiCheckCircle className="text-3xl text-muted-foreground flex-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterList
