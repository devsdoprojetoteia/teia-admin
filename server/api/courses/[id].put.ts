import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);

  const id = event.context.params!["id"];

  const query: {
    [key: string]: string;
  } = {
    _id: id,
  };

  const course = await Course.findOne(query);

  const { name, description, phone, published, duration, learning, requirements, team } = body;

  if (!course) {
    throw createError({
      statusCode: 400,
      message: "Curso não encontrado",
    });
  }

  // if (phone !== course.phone) {
  //   const existingCourse = await Course.findOne({ phone });
  //   if (existingCourse) {
  //     throw createError({
  //       statusCode: 400,
  //       message: "Este telefone já está registrado em outro curso",
  //     });
  //   }
  // }

  if (name !== course.name) {
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      throw createError({
        statusCode: 400,
        message: "Já existe um curso com este nome",
      });
    }
  }

  course.name = name;
  course.description = description;
  course.phone = phone;
  course.published = published;
  course.duration = duration;
  course.learning = learning;
  course.requirements = requirements;
  course.team = team;

  await course.save();

  return {
    statusCode: 201,
    body: course,
  };
});
