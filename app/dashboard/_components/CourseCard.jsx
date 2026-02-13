import Image from 'next/image'
import React from 'react'
import { HiBookOpen } from "react-icons/hi2";
import { HiEllipsisVertical } from "react-icons/hi2";
import Dropdown from './Dropdown';
import Link from 'next/link';

function CourseCard({course,displayUser=false}) {
    const output =
    typeof course?.courseOutput === "string"
      ? JSON.parse(course.courseOutput)
      : course.courseOutput;

      const handleOnDelete = async () => {
        try {
          const res = await fetch("/api/course/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: course.id }),
          });
    
          const data = await res.json();
    
          if (data.success) {
            refreshData(); // re-fetch course list
          }
        } catch (err) {
          console.error("Delete failed:", err);
        }
      };
    

  return (
    <div className='bg-card text-card-foreground
  border border-border
  rounded-xl
  p-3 mt-4
  transition-all duration-300
  hover:-translate-y-1
  hover:shadow-md
  cursor-pointer'>
      <Link href={'/course/'+course?.courseId}>
        <Image src={course?.courseBanner} width={300} height={200} className='w-full h-[200px] object-cover rounded' alt='img'/>
      </Link>

        <div className='p-2'>
            <h2 className='font-medium text-lg flex justify-between items-center'>{output?.course_name || output?.["course name"]}
            
            {!displayUser&&<Dropdown handleOnDelete={()=>handleOnDelete()}><HiEllipsisVertical/></Dropdown>
            }
            </h2>  
            
            <p className='text-sm text-gray-400'>{course?.category}</p> 
        </div>
        <div className='flex items-center justify-between my-1'>
            <h2 className='flex gap-2 items-center p-1 text-sm'><HiBookOpen />
            {output?.chapters?.length} Chapters</h2>
            <h2 className='text-sm'>{course?.level}</h2>
        </div>

        {displayUser&&<div className='flex gap-2 items-center mt-2'>
          <Image src={course.userProfileImage} width={30} height={30} className='rounded-full'/>
          <p className='text-sm'>{course?.userName}</p>
        </div>}

    </div>
  )
}

export default CourseCard