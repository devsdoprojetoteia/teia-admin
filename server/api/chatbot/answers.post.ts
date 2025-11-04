import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~/server/models/user";
import UserCourseAnswer from "~/server/models/user_course_answer";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const body = await readBody(event);
  const { courseId, userPhone, question, answer } = body;

  if (!courseId || !userPhone) {
    throw createError({
      statusCode: 400,
      message: "ID do curso e telefone do usuário são obrigatórios",
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
