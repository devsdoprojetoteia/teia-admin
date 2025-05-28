import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import { Module } from "~/server/models";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { name, description, course } = body;

  if (!name || !course) {
    throw createError({
      statusCode: 400,
      message: "Nome e curso são obrigatórios",
    });
  }

  // Get the highest order in the course
  const lastModule = await Module.findOne({ course }).sort({ order: -1 });
  const order = lastModule ? lastModule.order + 1 : 1;

  const module = new Module({
    name,
    description,
    course,
    order,
  });

  await module.save();
  return module;
});
