import { defineEventHandler, createError } from "h3";
import authorize, { BOT_ROLE } from "~/server/utils/authorize";
import { normalizePhone } from "~/server/utils/input";
import { UserCourseProgress, User, Course } from "~/server/models";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", BOT_ROLE]);

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
    filters.phone = normalizePhone(query.phone);
  }

  const users = await User.find(filters).sort({ name: 1 });
  let userList = users.map(user => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    courseProgresses: [],
  }));

  const userCourseProgresses = await UserCourseProgress.find({ user: { $in: userList.map(user => user.id) } })
  const progressCourses = await Course.find({ _id: { $in: userCourseProgresses.map(progress => progress.course.toString()) } }).select("name");
  const progressList = JSON.parse(JSON.stringify(userCourseProgresses));
  for (const user of userList) {
    user.courseProgresses = progressList.filter((progress: any) => progress.user.toString() === user.id.toString()).map((progress: any) => ({
      ...progress,
      course: progressCourses.find((course: any) => course._id.toString() === progress.course.toString())
    }));
  }

  // se o parametro course estiver presente, filtrar os usuários que possuem progresso no curso
  if (query.course) {
    userList = userList.filter((user: any) => user.courseProgresses.some((progress: any) => progress.course.toString() === query.course!.toString()));
  }

  return userList;
}); 