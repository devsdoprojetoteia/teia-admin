import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const query: { [key: string]: any } = {};

  if (authenticatedUser.role !== "administrador") {
    query.role = "estudante";
  }

  const users = await User.find(query).sort({ name: 1 });
  return users;
});
