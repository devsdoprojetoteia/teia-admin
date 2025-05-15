import { defineEventHandler, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Module from "~~/server/models/module";
import Topic from "~~/server/models/topic"; // usado para carregar o model do topic que vai ser usado no populate

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const courseId = event.context.params!["id"];
  if (!courseId) {
    throw createError({
      statusCode: 400,
      message: "ID do curso não informado",
    });
  }

  const modules = await Module.find({ course: courseId }).sort({ order: 1 }).populate("topics");
  return modules;
}); 