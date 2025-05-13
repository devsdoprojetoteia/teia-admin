import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Module from "~~/server/models/module";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const moduleId = event.context.params!["id"];
  const body = await readBody(event);
  const { name, description, course, order } = body;

  const module = await Module.findById(moduleId);
  if (!module) {
    throw createError({
      statusCode: 404,
      message: "Módulo não encontrado",
    });
  }

  if (name !== undefined) module.name = name;
  if (description !== undefined) module.description = description;
  if (course !== undefined) module.course = course;
  if (order !== undefined) module.order = order;

  await module.save();

  return {
    statusCode: 200,
    body: module,
  };
}); 