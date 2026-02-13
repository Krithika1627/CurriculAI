import React from 'react'
import {HiOutlineClock} from 'react-icons/hi2';

function ChapterListCard({chapter,index}) {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b border-border hover:bg-muted/40 transition-colors cursor-pointer'>
        <div className='flex items-center justify-center'>
            <h2 className='flex items-center justify-center font-medium text-primary-foreground bg-primary rounded-full w-8 h-8 text-small'>{index+1}</h2>
        </div>
        <div className='col-span-4 space-y-1'>
            <h2 className='font-medium text-foreground'>{chapter.chapter_name}</h2>
            <h2 className='flex items-center
            gap-2 text-sm text-muted-foreground'><HiOutlineClock className='text-base'/>{chapter.duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard