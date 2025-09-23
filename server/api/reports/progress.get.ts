import { defineEventHandler, getQuery, createError } from "h3";
import authorize from "~/server/utils/authorize";
import UserCourseProgress from "~/server/models/user_course_progress";
import User from "~/server/models/user";
import Course from "~/server/models/course";
import Module from "~/server/models/module";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const query = getQuery(event);
  const { courseId, userId, moduleId } = query;

  // Build filter object
  const filter: any = {};

  if (courseId) {
    filter.course = courseId;
  }

  if (userId) {
    filter.user = userId;
  }

  const progresses = await UserCourseProgress.find(filter);

  const courses = await Course.find(courseId ? { _id: courseId } : {}).sort({ name: 1 });
  const modules = await Module.find(courseId ? { course: courseId } : {}).sort({ order: 1 });
  const userQuery: any = { role: "estudante" };
  if (userId) {
    userQuery._id = userId;
  }
  const users = await User.find(userQuery).sort({ name: 1 });

  const reportData = [];
  for (const course of courses) {
    for (const module of modules.filter(m => m.course.toString() === course.id.toString())) {
      for (const user of users) {
        const progress = progresses.find(p => p.user.toString() === user.id.toString() && p.modules.some(m => m.module.toString() === module.id.toString()));

        reportData.push({
          user: {
            id: user.id,
            name: user.name,
          },
          course: {
            id: course?.id,
            name: course?.name,
          },
          module: {
            id: module.id,
            name: module.name,
          },
          completed: progress ? true : false,
        });
      }
    }
  }

  return reportData;
});
