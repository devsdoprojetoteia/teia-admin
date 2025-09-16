import { defineEventHandler, createError, getQuery } from "h3";
import UserCourseProgress from "~/server/models/user_course_progress";
import authorize from "~/server/utils/authorize";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador"]);

  const id = event.context.params!["id"];


  const queryParams = getQuery(event);

  const { userPhone } = queryParams;

  const query: {
    [key: string]: string;
  } = {

    course: id,
  };

  if (userPhone) {
    let phone = userPhone?.toString() || "";
    // se o telefone não estiver nesse formato "(11) 11111-1111" formatar para esse formato
    if (!phone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      phone = phone.replace(/\D/g, "");
      phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    }
    query.user = phone;
  }



  const userCourseProgresses = await UserCourseProgress.find(query).populate("user", "name phone");

  return userCourseProgresses;
});