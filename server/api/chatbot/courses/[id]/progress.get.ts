import { defineEventHandler, createError, getQuery } from "h3";
import UserCourseProgress from "~/server/models/user_course_progress";
import User from "~/server/models/user";
import authorize, { BOT_ROLE } from "~/server/utils/authorize";
import { normalizePhone } from "~/server/utils/input";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", BOT_ROLE]);

  const id = event.context.params!["id"];


  const queryParams = getQuery(event);

  const { userPhone } = queryParams;

  const query: {
    [key: string]: string;
  } = {

    course: id,
  };

  if (userPhone) {
    const phone = normalizePhone(userPhone);
    const user = await User.findOne({ phone });
    if (!user) {
      // Telefone sem usuário: não devolver o progresso dos outros alunos
      return [];
    }
    query.user = user.id;
  }



  const userCourseProgresses = await UserCourseProgress.find(query).populate("user", "name phone");

  return userCourseProgresses;
});