import { defineEventHandler, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Module from "~~/server/models/module";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const moduleId = event.context.params!["id"];
  if (!moduleId) {
    throw createError({
      statusCode: 400,
      message: "ID do módulo não informado",
    });
  }

  const module = await Module.findById(moduleId);
  if (!module) {
    throw createError({
      statusCode: 404,
      message: "Módulo não encontrado",
    });
  }

  await Module.deleteOne({ _id: moduleId });

  return {
    statusCode: 200,
    message: "Módulo removido com sucesso",
  };
}); 