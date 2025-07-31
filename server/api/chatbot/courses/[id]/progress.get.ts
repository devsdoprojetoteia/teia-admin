import { defineEventHandler, createError } from "h3";
import UserCourseProgress from "~/server/models/user_course_progress";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const id = event.context.params!["id"];

  const query: {
    [key: string]: string;
  } = {
    _id: id,
  };

  const userCourseProgresses = await UserCourseProgress.find({ course: id }).populate("user", "name phone");

  return userCourseProgresses;
});