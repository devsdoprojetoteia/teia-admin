import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const courses = await Course.find().sort({ name: 1 });
  return courses;
});
