"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'

function CreateCourseLayout({children}) {
  const [UserCourseInput, setUserCourseInput]=useState([]);
  return (
    <div>
      <UserInputContext.Provider value={{UserCourseInput, setUserCourseInput}}>
        <>
        <Header/>
        {children}
        </>
      </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout