import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Topic from "~/server/models/topic";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "ID do tópico é obrigatório",
    });
  }

  const body = await readBody(event);
  const { title, content, order } = body;

  const topic = await Topic.findById(id);
  if (!topic) {
    throw createError({
      statusCode: 404,
      message: "Tópico não encontrado",
    });
  }

  if (title !== undefined) topic.title = title;
  if (content !== undefined) topic.content = content;
  if (order !== undefined) topic.order = order;

  await topic.save();
  return topic;
}); 