import { defineEventHandler, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Topic from "~/server/models/topic";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "ID do tópico é obrigatório",
    });
  }

  const topic = await Topic.findById(id);
  if (!topic) {
    throw createError({
      statusCode: 404,
      message: "Tópico não encontrado",
    });
  }

  return topic;
}); 