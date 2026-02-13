"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import {
  HiHome,
  HiMiniSquares2X2,
  HiArrowUpCircle,
  HiMiniArrowRightOnRectangle
} from "react-icons/hi2"
import { Progress } from "../../../components/ui/progress"
import { UserCourseListContext } from '../../_context/UserCourseListContext'

function SideBar() {
  const { userCourseList } = useContext(UserCourseListContext)
  const path = usePathname()

  const Menu = [
    { id: 1, name: 'Home', icon: <HiHome />, path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <HiMiniSquares2X2 />, path: '/dashboard/explore' },
    { id: 3, name: 'Upgrade', icon: <HiArrowUpCircle />, path: '/dashboard/upgrade' },
    { id: 4, name: 'Logout', icon: <HiMiniArrowRightOnRectangle />, path: '/dashboard/logout' },
  ]

  return (
    <div className="bg-sidebar text-sidebar-foreground fixed h-full md:w-64 p-5 border-r border-sidebar-border">
      
      <Image src="/CurriculAI.png" width={120} height={40} alt="CurriculAI logo" />
      
      <hr className="my-5 border-border" />

      <ul>
        {Menu.map((item) => {
          const isActive = item.path === path

          return (
            <Link key={item.id} href={item.path}>
              <li
                className={`
                  flex items-center gap-3 p-3 mb-2 rounded-xl cursor-pointer
                  transition-colors
                  ${isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </li>
            </Link>
          )
        })}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length / 5) * 100} />
        
        <p className="text-sm my-2 text-muted-foreground">
          {userCourseList?.length} out of 5 courses created
        </p>

        <p className="text-xs text-muted-foreground">
          Upgrade your plan to generate unlimited courses
        </p>
      </div>
    </div>
  )
}

export default SideBar
