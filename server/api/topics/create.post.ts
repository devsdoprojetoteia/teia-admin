import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import { Topic } from "~/server/models";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { title, content, module } = body;

  if (!title || !content || !module) {
    throw createError({
      statusCode: 400,
      message: "Título, conteúdo e módulo são obrigatórios",
    });
  }

  // Get the highest order in the module
  const lastTopic = await Topic.findOne({ module }).sort({ order: -1 });
  const order = lastTopic ? lastTopic.order + 1 : 1;

  const topic = new Topic({
    title,
    content,
    module,
    order,
  });

  await topic.save();
  return topic;
}); 