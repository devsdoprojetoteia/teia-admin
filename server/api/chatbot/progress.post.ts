import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import UserCourseProgress from "~/server/models/user_course_progress";
import User from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { courseId, moduleId, topicId, userPhone } = body;

  if (!courseId || !moduleId || !topicId || !userPhone) {
    throw createError({
      statusCode: 400,
      message: "ID do curso, módulo e tópico são obrigatórios",
    });
  }

  let phone = userPhone.toString();
  // se o telefone não estiver nesse formato "(11) 11111-1111" formatar para esse formato
  if (!phone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
    phone = phone.replace(/\D/g, "");
    phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
  }


  let user = await User.findOne({ phone: phone });
  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Usuário não encontrado",
    });
  }

  let userId = user.id;

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
