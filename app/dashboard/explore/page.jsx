"use client";

import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "../../../components/ui/button";

function Explore() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    try {
      const res = await fetch(`/api/explore?page=${pageIndex}`);
      const data = await res.json();

      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-muted-foreground">
        Loading courses...
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-3xl text-foreground">
        Explore More Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses?.map((course, index) => (
          <div>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5">
        {pageIndex !== 0 && (
          <Button className="bg-secondary text-secondary-foreground hover:bg-muted"
            onClick={() => setPageIndex(pageIndex - 1)}>
            Previous
          </Button>
        )}

        <Button
          className="bg-primary text-primary-foreground hover:bg-accent"
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Explore;
