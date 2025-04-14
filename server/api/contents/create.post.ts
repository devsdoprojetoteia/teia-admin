import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Content from "~~/server/models/content";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { title, body: contentBody, topicId } = body;

  const content = new Content({ title, body: contentBody, topicId });

  await content.save();

  return {
    statusCode: 201,
    body: content,
  };
});
