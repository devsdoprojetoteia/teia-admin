import { defineEventHandler } from "h3";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {
  const courses = await Course.find({ published: true }).sort({ name: 1 });
  return courses;
});
