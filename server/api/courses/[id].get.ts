import { defineEventHandler, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Course from "~~/server/models/course";
import Module from "~~/server/models/module";
import Topic from "~~/server/models/topic";

export default defineEventHandler(async (event) => {

  const id = event.context.params!["id"];

  const query: {
    [key: string]: string;
  } = {
    _id: id,
  };

  const course = await Course.findOne(query)

  if (!course) {
    throw createError({
      statusCode: 400,
      message: "Curso não encontrado",
    });
  }

  // Cursos publicados são públicos (Portal TEIA); os demais só para a equipe
  if (!course.published) {
    authorize(event, ["administrador", "tutor"]);
  }

  const modules = await Module.find({ course: id }).sort({ order: 1 })

  const moduleIds = modules.map(module => module.id)
  const topics = await Topic.find({ module: { $in: moduleIds } }).sort({ order: 1 })

  for (const module of modules) {
    module.topics = topics.filter(topic => topic.module.toString() === module.id.toString())
  }

  course.modules = modules

  return course.toJSON();
});