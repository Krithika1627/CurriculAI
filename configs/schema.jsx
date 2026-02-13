import { pgTable, serial, varchar, text, boolean, integer, json } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),

  courseId: varchar("courseId", { length: 255 }).notNull(),

  name: text("name").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  duration: text("duration").notNull().default("Not specified"),
  includeVideo: text("includeVideo").notNull().default("Yes"),
  courseOutput: text("courseOutput").notNull(),
  createdBy: text("createdBy").notNull(),
  userName: text("userName"),
  userProfileImage: text("userProfileImage"),
  courseBanner:varchar("courseBanner").default("/placeholder.jpg"),
  publish:boolean("publish").default(false)
});

export const Chapters=pgTable("Chapters",{
  id: serial("id").primaryKey(),
  courseId: varchar("courseId", { length: 255 }).notNull(),
  chapterId:integer("chapterId").notNull(),
  content:text("content").notNull(),
  videoId:varchar("videoId").notNull()
})