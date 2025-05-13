import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const id = event.context.params!["id"];

  const query: {
    [key: string]: string;
  } = {
    _id: id,
  };

  const course = await Course.findOne(query);

  if (!course) {
    throw createError({
      statusCode: 400,
      message: "Curso não encontrado",
    });
  }

  return course;
});
