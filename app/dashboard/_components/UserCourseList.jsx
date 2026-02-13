"use client";

import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "../../_context/UserCourseListContext";

function UserCourseList() {
  const { user, isLoaded } = useUser();
  const [courseList, setCourseList] = useState([]);

  const { userCourseList, setUserCourseList } =
    useContext(UserCourseListContext);

  useEffect(() => {
    if (!isLoaded || !user) return;
    getUserCourses();
  }, [isLoaded, user]);

  const getUserCourses = async () => {
    const email = user.primaryEmailAddress.emailAddress;

    const res = await fetch(`/api/user-courses?email=${email}`);
    const data = await res.json();

    setCourseList(data);
    setUserCourseList(data);
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl text-foreground">My Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList.length > 0
          ? courseList.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={getUserCourses}
              />
            ))
          : [1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="w-full bg-muted animate-pulse rounded-lg mt-5 h-[270px]"
              />
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
