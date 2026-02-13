"use client"

import React, { useContext, useEffect, useState } from 'react'
import { HiSquares2X2, HiLightBulb, HiClipboardDocumentList } from "react-icons/hi2";
import { Button } from '../../components/ui/button';
import SelectCat from './_components/SelectCat';
import TopicDesc from './_components/TopicDesc';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from '../../configs/AiModel';
import LoadingDialogue from './_components/LoadingDialogue';
import { v4 as uuidv4 } from "uuid";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { duration } from 'drizzle-orm/gel-core';

function CreateCourse() {
  const Stepper = [
    { id: 1, name: 'Category', icon: <HiSquares2X2 /> },
    { id: 2, name: 'Topic', icon: <HiLightBulb /> },
    { id: 3, name: 'Options', icon: <HiClipboardDocumentList /> }
  ]

  const [activeIndex, setActiveIndex] = useState(0);
  const { UserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const checkStatus = () => {
    if (!UserCourseInput || Object.keys(UserCourseInput).length === 0) return true;
    if (activeIndex == 0 && !UserCourseInput?.cat) return true;
    if (activeIndex == 1 && !UserCourseInput?.topic) return true;
    if (
      activeIndex == 2 &&
      (
        UserCourseInput?.level == undefined ||
        UserCourseInput?.duration == undefined ||
        UserCourseInput?.video == undefined ||
        UserCourseInput?.noOfChap == undefined
      )
    ) return true;

    return false;
  }


  const handleGenerateCourse = async () => {
    if (!isLoaded || !user) return;
  
    try {
      setLoading(true);
  
      const BASIC_PROMPT =
        "Generate a course tutorial with course name, description, chapters (name, about, duration).";
  
      const USER_INPUT_PROMPT =
        `Category: ${UserCourseInput?.cat},
         Topic: ${UserCourseInput?.topic},
         Level: ${UserCourseInput?.level},
         Duration: ${UserCourseInput?.duration},
         Chapters: ${UserCourseInput?.noOfChap}`;
  
      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
  
      const result = await GenerateCourseLayout_AI(FINAL_PROMPT);
  
      const cleanJSON = (str) =>
        str.replace(/```json/gi, "").replace(/```/g, "").trim();
  
      const parsed = JSON.parse(cleanJSON(result));
  
      const id = uuidv4();
  
      const courseLayout = {
        courseId: id,
        name: parsed.course_name || UserCourseInput?.topic,
        category: UserCourseInput?.cat,
        level: UserCourseInput?.level,
        duration: UserCourseInput?.duration,
        courseOutput: JSON.stringify(parsed),
        createdBy: user.primaryEmailAddress.emailAddress,
        userName: user.fullName || "",
        userProfileImage: user.imageUrl || "",
      };
  
      await fetch("/api/save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseLayout),
      });
  
      router.replace("/create-course/" + id);
  
    } catch (err) {
      console.error(err);
  
      if (err.message?.includes("429")) {
        alert("Too many requests. Wait 1 minute and try again.");
      } else {
        alert("Something went wrong. Try again.");
      }
  
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div className="text-foreground">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-4xl font-medium">Create Course</h2>

        {/* Stepper */}
        <div className="flex mt-10">
          {Stepper.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                
                <div
                  className={`
                    p-3 rounded-full
                    ${activeIndex >= index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'}
                  `}
                >
                  {item.icon}
                </div>

                <h2 className={`
                    hidden md:block md:text-sm
                    ${activeIndex >= index
                      ? "text-foreground"
                      : "text-muted-foreground"}
                  `}>
                  {item.name}
                </h2>
              </div>

              {index !== Stepper.length - 1 && (
                <div
                  className={`
                    h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full
                    ${activeIndex - 1 >= index
                      ? 'bg-primary'
                      : 'bg-border'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-10 md:px-20 lg:px-44 mt-10">
        {activeIndex == 0 ? <SelectCat /> :
         activeIndex == 1 ? <TopicDesc /> :
         <SelectOption />}

        {/* Footer buttons */}
        <div className="flex justify-between items-center mt-10">
          <Button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>

          {activeIndex < 2 && (
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90"
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}

          {activeIndex == 2 && (
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90"
              disabled={checkStatus() || !isLoaded}
              onClick={() => handleGenerateCourse()}
            >
              Generate
            </Button>
          )}
        </div>
      </div>

      <LoadingDialogue loading={loading} />
    </div>
  )
}

export default CreateCourse;
