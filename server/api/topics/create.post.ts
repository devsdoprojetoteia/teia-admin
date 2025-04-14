import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Topic from "~~/server/models/topic";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { name, description, moduleId } = body;

  const topic = new Topic({ name, description, moduleId });

  await topic.save();

  return {
    statusCode: 201,
    body: topic,
  };
});
