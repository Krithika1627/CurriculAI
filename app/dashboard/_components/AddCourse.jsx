"use client"
import { useUser } from '@clerk/nextjs';
import React, { useContext } from 'react'
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { UserCourseListContext } from '../../_context/UserCourseListContext';

function AddCourse() {
    const { user } = useUser();
    const { userCourseList } = useContext(UserCourseListContext);

  return (
    <div className='flex items-center justify-between'>
        <div>
            <h2 className='text-2xl text-foreground'>
              Hello, <span className='font-bold'>{user?.fullName}</span>
            </h2>
            <p className='text-sm text-muted-foreground'>
              Create new course with AI
            </p>
        </div>

        <Link href={userCourseList?.length > 5 ? '/dashboard/upgrade' : '/create-course'}>
            <Button className="bg-primary text-primary-foreground hover:bg-accent">
              + Create new course
            </Button>
        </Link>
    </div>
  )
}

export default AddCourse;
