import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../../components/ui/alert-dialog";
import Image from 'next/image';

function LoadingDialogue({loading}) {
  return (
    <div aria-hidden={loading ? false : undefined}>
        <AlertDialog open={loading}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogDescription>
        <div className='flex flex-col items-center py-10'>
        <Image src={'/load-time.gif'} width={100} height={100} alt='img'/>
        <h2>Please Wait... AI is working on your course</h2>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>
    </div>
  )
}

export default LoadingDialogue