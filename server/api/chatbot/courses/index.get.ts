import { defineEventHandler, readBody, createError } from "h3";
import authorize, { BOT_ROLE } from "~/server/utils/authorize";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", BOT_ROLE]);

  const query = getQuery(event)
  const filters: {
    [key: string]: any;
  } = {}
  if (query.published === "true") {
    filters.published = true;
  }

  const courses = await Course.find(filters).sort({ name: 1 });

  return courses;
});
