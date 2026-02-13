"use client"
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";

function FinishScreen() {
  const params = useParams();
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();

  const getCourse = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const res = await fetch(`/api/course/${params.courseId}`, {
      headers: { "x-user-email": email },
    });

    const data = await res.json();

    if (data?.data?.length > 0) {
      const parsed = {
        ...data.data[0],
        courseOutput: JSON.parse(data.data[0].courseOutput),
      };
      setCourse(parsed);
    }
  };

  useEffect(() => {
    if (!user || !params?.courseId) return;
    getCourse();
  }, [user, params?.courseId]);

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7 text-foreground">
      
      <h2 className="text-center font-bold text-2xl my-3">
        Your Course is Ready!!
      </h2>

      <CourseBasicInfo course={course} refreshData={() => console.log} />

      <h2 className="mt-3 text-muted-foreground">
        Course URL:
      </h2>

      <h2 className="
        text-center
        text-muted-foreground
        border border-border
        bg-card
        p-2
        rounded
        shadow-xs
        flex gap-5 items-center
      ">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}

        <HiMiniClipboardDocumentCheck
          className="w-6 h-6 cursor-pointer text-muted-foreground hover:text-foreground"
          onClick={async () =>
            await navigator.clipboard.writeText(
              process.env.NEXT_PUBLIC_HOST_NAME +
              "/course/" +
              course?.courseId
            )
          }
        />
      </h2>

    </div>
  )
}

export default FinishScreen
