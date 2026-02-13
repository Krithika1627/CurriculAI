import React from 'react'
import {
  HiMiniChartBar,
  HiMiniClock,
  HiMiniClipboardDocumentList,
  HiVideoCamera
} from "react-icons/hi2";

function CourseDetails({ course }) {
  return (
    <div className="border border-border bg-card p-6 rounded-xl mt-3 shadow-sm text-foreground">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        <div className="flex gap-2">
          <HiMiniChartBar className="text-4xl text-muted-foreground" />
          <div>
            <h2 className="text-xs text-muted-foreground">
              Skill Level
            </h2>
            <h2 className="font-medium text-lg">
              {course?.level}
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <HiMiniClock className="text-4xl text-muted-foreground" />
          <div>
            <h2 className="text-xs text-muted-foreground">
              Duration
            </h2>
            <h2 className="font-medium text-lg">
              {course?.duration}
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <HiMiniClipboardDocumentList className="text-4xl text-muted-foreground" />
          <div>
            <h2 className="text-xs text-muted-foreground">
              No Of Chapters
            </h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.chapters?.length}
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <HiVideoCamera className="text-4xl text-muted-foreground" />
          <div>
            <h2 className="text-xs text-muted-foreground">
              Video Included
            </h2>
            <h2 className="font-medium text-lg">
              {course?.includeVideo}
            </h2>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CourseDetails
