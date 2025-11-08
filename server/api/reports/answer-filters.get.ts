import { defineEventHandler, getQuery, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~/server/models/user";
import Course from "~/server/models/course";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const courses = await Course.find().sort({ name: 1 });
  const users = await User.find({ role: "estudante" }).sort({ name: 1 });
  const filterOptions = {
    courses: courses.map(c => ({
      id: c.id,
      name: c.name,
    })),
    users: users.map(u => ({
      id: u.id,
      name: u.name,
    })),
  };

  return filterOptions;
});
