"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";

function EditChapters({ course, index, setCourse }) {

  const parsedOutput =
    typeof course?.courseOutput === "string"
      ? JSON.parse(course.courseOutput)
      : course?.courseOutput;

  const Chapters = parsedOutput?.chapters;

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (!Chapters || !Chapters[index]) return;

    setName(Chapters[index].name || "");
    setAbout(Chapters[index].about || "");

  }, [Chapters, index]);

  const onUpdateHandler = async () => {

    const updatedOutput = {
      ...parsedOutput,
      chapters: parsedOutput.chapters.map((ch, i) =>
        i === index
          ? { ...ch, name, about }
          : ch
      ),
    };

    const res = await fetch("/api/course/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: course.id,
        courseOutput: updatedOutput,
      }),
    });

    const data = await res.json();
    console.log(data);

    setCourse(updatedOutput);
  };
  console.log(parsedOutput);
  console.log(Chapters);
  
  return (
    <Dialog>
      <DialogTrigger className="text-muted-foreground hover:text-foreground">
        <HiMiniPencilSquare />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>

          <DialogDescription>

            <div className="mt-3">
              <label>Chapter Title</label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Chapter Description</label>

              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
