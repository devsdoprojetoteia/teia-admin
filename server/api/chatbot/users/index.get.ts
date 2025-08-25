import { defineEventHandler, createError } from "h3";
import authorize from "~/server/utils/authorize";
import { UserCourseProgress, User } from "~/server/models";

export default defineEventHandler(async (event) => {
  // const authenticatedUser = authorize(event, ["administrador"]);

  const filters: {
    [key: string]: any;
  } = {
    role: "estudante",
  };

  const query = getQuery(event);
  if (query.user) {
    filters._id = query.user;
  }

  if (query.phone) {
    let phone = query.phone.toString();
    // se o telefone não estiver nesse formato "(11) 11111-1111" formatar para esse formato
    if (!phone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      phone = phone.replace(/\D/g, "");
      phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    }
    filters.phone = phone;
  }

  const users = await User.find(filters).sort({ name: 1 });
  let userList = users.map(user => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    courseProgresses: [],
  }));

  const userCourseProgresses = await UserCourseProgress.find({ user: { $in: userList.map(user => user.id) } }).populate("course", "name");
  const progressList = JSON.parse(JSON.stringify(userCourseProgresses));
  for (const user of userList) {
    user.courseProgresses = progressList.filter((progress: any) => progress.user.toString() === user.id.toString());
  }

  // se o parametro course estiver presente, filtrar os usuários que possuem progresso no curso
  if (query.course) {
    userList = userList.filter((user: any) => user.courseProgresses.some((progress: any) => progress.course.toString() === query.course!.toString()));
  }

  return userList;
}); 