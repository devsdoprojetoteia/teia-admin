import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);

  const { name, description, phone, published } = body;

  const existingCourseByPhone = await Course.findOne({ phone });
  if (existingCourseByPhone) {
    throw createError({
      statusCode: 400,
      message: "Este telefone já está registrado em outro curso",
    });
  }

  const existingCourseByName = await Course.findOne({ name });
  if (existingCourseByName) {
    throw createError({
      statusCode: 400,
      message: "Este nome já está registrado em outro curso",
    });
  }
  const course = new Course({ name, phone, description, published });

  await course.save();

  return {
    statusCode: 201,
    body: course,
  };
});
