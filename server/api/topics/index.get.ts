import { defineEventHandler, createError } from "h3";
import authorize from "~/server/utils/authorize";
import Topic from "~/server/models/topic";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const query = getQuery(event);
  const moduleId = query.module as string;

  let filter = {};
  if (moduleId) {
    filter = { module: moduleId };
  }

  const topics = await Topic.find(filter).sort({ order: 1 });
  return topics;
}); 