import { defineEventHandler, readBody, createError } from "h3";
import authorize, { BOT_ROLE } from "~/server/utils/authorize";
import { normalizePhone, requireString } from "~/server/utils/input";
import User from "~/server/models/user";
import UserCourseAnswer from "~/server/models/user_course_answer";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", BOT_ROLE]);

  const body = await readBody(event);
  const { courseId, userPhone, question, answer } = body;

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

  let userCourseAnswer = await UserCourseAnswer.findOne({ user: userId, course: courseId });
  if (!userCourseAnswer) {
    userCourseAnswer = new UserCourseAnswer({ user: userId, course: courseId, answers: [] });
  }

  if (!userCourseAnswer.answers) {
    userCourseAnswer.answers = [];
  }

  userCourseAnswer.answers.push({ question: question, answer: answer, createdAt: new Date() });

  await userCourseAnswer.save();


  return userCourseAnswer;
}); 
