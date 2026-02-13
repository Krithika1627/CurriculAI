import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog"
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from '../../../../components/ui/button';

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (!course || !course.courseOutput) return;

    setName(course.courseOutput.course_name);
    setDescription(course.courseOutput.description);
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.course_name = name;
    course.courseOutput.description = description;

    const res = await fetch("/api/course/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: course.id,
        courseOutput: course.courseOutput,
      }),
    });

    const data = await res.json();
    console.log(data);

    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-muted-foreground hover:text-foreground">
        <HiMiniPencilSquare />
      </DialogTrigger>

      <DialogContent className="bg-popover text-popover-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Edit Course Title and Description
          </DialogTitle>

          <DialogDescription className="text-muted-foreground">
            <div className="mt-3">
              <label className="text-muted-foreground">
                Course Title
              </label>
              <Input
                className="bg-background border-input focus:ring-ring"
                defaultValue={course?.courseOutput?.course_name}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-muted-foreground">
                Course Description
              </label>
              <Textarea
                className="h-40 bg-background border-input focus:ring-ring"
                defaultValue={course?.courseOutput?.description}
                onChange={(event) =>
                  setDescription(event?.target.value)
                }
              />
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button
              className="bg-primary text-primary-foreground hover:bg-accent"
              onClick={onUpdateHandler}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCourseBasicInfo
