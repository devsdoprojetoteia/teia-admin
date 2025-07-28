import { defineEventHandler, createError } from "h3";
import Course from "~~/server/models/course";

export default defineEventHandler(async (event) => {

  const id = event.context.params!["id"];

  const query: {
    [key: string]: string;
  } = {
    _id: id,
  };

  const course = await Course.findOne(query).populate(
    {
      path: "modules",
      populate: {
        path: "topics",
      },
    }
  );

  if (!course) {
    throw createError({
      statusCode: 400,
      message: "Curso não encontrado",
    });
  }

  return course.toJSON();
});