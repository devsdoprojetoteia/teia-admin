import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  console.log("authenticatedUser", authenticatedUser);

  const query: { [key: string]: any } = {};

  if (authenticatedUser.role !== "administrador") {
    if (authenticatedUser.role === "tutor") {
      query["$or"] = [{ role: "tutor" }, { role: "estudante" }];
    }
  }

  const users = await User.find(query);
  return users;
});
