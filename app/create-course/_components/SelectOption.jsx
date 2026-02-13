import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { UserInputContext } from "../../_context/UserInputContext";

function SelectOption() {
  const { UserCourseInput, setUserCourseInput } =
    useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 text-foreground">
      <div className="grid grid-cols-2 gap-10">

        <div>
          <label className="text-sm text-muted-foreground">
            Difficulty level
          </label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={UserCourseInput?.level}
          >
            <SelectTrigger className="h-14 text-lg bg-background border-border focus:ring-ring">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border-border">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Course Duration
          </label>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={UserCourseInput?.duration}
          >
            <SelectTrigger className="h-14 text-lg bg-background border-border focus:ring-ring">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border-border">
              <SelectItem value="1 hr">1 hr</SelectItem>
              <SelectItem value="2 hrs">2 hrs</SelectItem>
              <SelectItem value="more than 3 hrs">more than 3 hrs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Include video
          </label>
          <Select
            onValueChange={(value) => handleInputChange("video", value)}
            defaultValue={UserCourseInput?.video}
          >
            <SelectTrigger className="h-14 text-lg bg-background border-border focus:ring-ring">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border-border">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            No. of Chapters
          </label>
          <Input
            type="number"
            className="h-14 text-lg bg-background border-input focus:ring-ring"
            defaultValue={UserCourseInput?.noOfChap}
            onChange={(e) =>
              handleInputChange("noOfChap", e.target.value)
            }
          />
        </div>

      </div>
    </div>
  );
}

export default SelectOption;
