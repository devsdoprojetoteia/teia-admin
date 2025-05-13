import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Topic from "~/server/models/topic";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { title, content, module, order } = body;

  if (!title || !content || !module) {
    throw createError({
      statusCode: 400,
      message: "Título, conteúdo e módulo são obrigatórios",
    });
  }

  const topic = new Topic({
    title,
    content,
    module,
    order: order || 0,
  });

  await topic.save();
  return topic;
}); 