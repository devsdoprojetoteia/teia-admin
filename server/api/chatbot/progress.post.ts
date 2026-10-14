import { defineEventHandler, readBody, createError } from "h3";
import authorize, { BOT_ROLE } from "~/server/utils/authorize";
import { normalizePhone, requireString } from "~/server/utils/input";
import UserCourseProgress from "~/server/models/user_course_progress";
import User from "~/server/models/user";
import { Module, Topic } from "~/server/models";


export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", BOT_ROLE]);

  const body = await readBody(event);
  const { courseId, userPhone } = body;

  if (!courseId || !userPhone) {
    throw createError({
      statusCode: 400,
      message: "ID do curso e telefone do usuário são obrigatórios",
    });
  }
  requireString(courseId, "courseId");

  const phone = normalizePhone(userPhone);


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
    userCourseProgress = new UserCourseProgress({ user: userId, course: courseId, topics: [], modules: [] });
  }

  const modules = await Module.find({ course: courseId }).sort({ order: 1 });

  for (const module of modules) {
    const currentIndex = userCourseProgress.modules.findIndex(m => m.module.toString() === module._id.toString());
    if (currentIndex === -1) {
      userCourseProgress.modules.push({ module: module._id, createdAt: new Date() });
      const topics = await Topic.find({ module: module._id }).sort({ order: 1 });
      for (const topic of topics) {
        userCourseProgress.topics.push({ module: module._id, topic: topic._id, createdAt: new Date() });
      }
      await userCourseProgress.save();
      break;
    }
  }


  return userCourseProgress;
}); 
