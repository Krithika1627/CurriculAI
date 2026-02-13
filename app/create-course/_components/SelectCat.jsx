import React, { useContext } from "react";
import CatList from "../../_shared/CatList";
import { UserInputContext } from "../../_context/UserInputContext";

function SelectCat() {
  const { UserCourseInput, setUserCourseInput } =
    useContext(UserInputContext);

  const handleCatChange = (cat) => {
    setUserCourseInput((prev) => ({
      ...prev,
      cat: cat,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="my-6 text-lg font-medium text-foreground text-center">
        Select the course category
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-[720px] mx-auto">

        {CatList.map((item, index) => {
          const Icon = item.icon;
          const isActive = UserCourseInput?.cat === item.name;

          return (
            <div
              key={index}
              onClick={() => handleCatChange(item.name)}
              className={`
                w-full max-w-[220px] flex flex-col items-center gap-3 p-6
                rounded-2xl border cursor-pointer
                transition-all

                ${
                  isActive
                    ? "border-accent bg-muted"
                    : "border-border bg-background hover:border-accent hover:bg-muted/50"
                }
              `}
            >
              {/* Icon */}
              <Icon className="w-12 h-12 text-primary" />

              {/* Name */}
              <h2 className="text-foreground font-medium">
                {item.name}
              </h2>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default SelectCat;
