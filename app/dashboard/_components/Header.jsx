import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='bg-background text-foreground flex justify-between items-center p-5 shadow-sm border-b border-border'>
        <Image src={'/CurriculAI.png'} width={50} height={50} alt='img'/>
        <UserButton/>
    </div>
  )
}

export default Header
