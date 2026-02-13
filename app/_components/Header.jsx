"use client"

import { Button } from '../../components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useUser } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className='flex justify-between p-4 bg-card text-card-foreground border-b border-border shadow-md'>
        <Image src={"/CurriculAI.png"} width={100} height={100} alt="img"/>
        <Link
            href={isSignedIn ? "/create-course" : "/sign-in"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition w-fit h-fit" >
              Get Started
        </Link>
    </div>
  )
}

export default Header