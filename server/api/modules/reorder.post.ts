import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import { Module } from "~/server/models";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { moduleId, direction } = body;

  if (!moduleId || !direction) {
    throw createError({
      statusCode: 400,
      message: "ID do módulo e direção são obrigatórios",
    });
  }

  const module = await Module.findById(moduleId);
  if (!module) {
    throw createError({
      statusCode: 404,
      message: "Módulo não encontrado",
    });
  }

  // Find all modules in the same course
  const modules = await Module.find({ course: module.course }).sort({ order: 1 });
  const currentIndex = modules.findIndex(m => m._id.toString() === moduleId);
  
  if (currentIndex === -1) {
    throw createError({
      statusCode: 404,
      message: "Módulo não encontrado na lista",
    });
  }

  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  
  if (newIndex < 0 || newIndex >= modules.length) {
    throw createError({
      statusCode: 400,
      message: "Não é possível mover o módulo nesta direção",
    });
  }

  // Swap orders
  const tempOrder = modules[currentIndex].order;
  modules[currentIndex].order = modules[newIndex].order;
  modules[newIndex].order = tempOrder;

  // Save both modules
  await modules[currentIndex].save();
  await modules[newIndex].save();

  return { success: true };
}); 