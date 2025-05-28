import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import { Topic } from "~/server/models";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { topicId, direction } = body;

  if (!topicId || !direction) {
    throw createError({
      statusCode: 400,
      message: "ID do tópico e direção são obrigatórios",
    });
  }

  const topic = await Topic.findById(topicId);
  if (!topic) {
    throw createError({
      statusCode: 404,
      message: "Tópico não encontrado",
    });
  }

  // Find all topics in the same module
  const topics = await Topic.find({ module: topic.module }).sort({ order: 1 });
  const currentIndex = topics.findIndex(t => t._id.toString() === topicId);
  
  if (currentIndex === -1) {
    throw createError({
      statusCode: 404,
      message: "Tópico não encontrado na lista",
    });
  }

  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  
  if (newIndex < 0 || newIndex >= topics.length) {
    throw createError({
      statusCode: 400,
      message: "Não é possível mover o tópico nesta direção",
    });
  }

  // Swap orders
  const tempOrder = topics[currentIndex].order;
  topics[currentIndex].order = topics[newIndex].order;
  topics[newIndex].order = tempOrder;

  // Save both topics
  await topics[currentIndex].save();
  await topics[newIndex].save();

  return { success: true };
}); 