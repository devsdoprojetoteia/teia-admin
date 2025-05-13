import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Module from "~~/server/models/module";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { name, description, courseId } = body;

  const module = new Module({ name, description, course: courseId });

  await module.save();

  return {
    statusCode: 201,
    body: module,
  };
});
