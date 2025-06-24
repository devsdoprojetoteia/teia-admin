import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import UserCourseProgress from "~/server/models/user_course_progress";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor", "estudante"]);

  const body = await readBody(event);
  const { courseId, moduleId, topicId } = body;

  if (!courseId || !moduleId || !topicId) {
    throw createError({
      statusCode: 400,
      message: "ID do curso, módulo e tópico são obrigatórios",
    });
  }

  let userId = authenticatedUser.id;

  if (authenticatedUser.role !== "estudante") {
    userId = body.userId;
  }

  let userCourseProgress = await UserCourseProgress.findOne({ user: userId, course: courseId });
  if (!userCourseProgress) {
    userCourseProgress = new UserCourseProgress({ user: userId, course: courseId, topics: [] });
  }
  
  const currentIndex = userCourseProgress.topics.findIndex(t => t.module.toString() === moduleId && t.topic.toString() === topicId);
  if (currentIndex === -1) {
    userCourseProgress.topics.push({ module: moduleId, topic: topicId, createdAt: new Date() });
  } 

  await userCourseProgress.save();

  return userCourseProgress;
}); 
