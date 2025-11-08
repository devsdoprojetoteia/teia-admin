import { defineEventHandler, getQuery, createError } from "h3";
import authorize from "~/server/utils/authorize";
import UserCourseAnswer from "~/server/models/user_course_answer";
import User from "~/server/models/user";
import Course from "~/server/models/course";
import Module from "~/server/models/module";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const query = getQuery(event);
  const { courseId, userId, search } = query as { courseId: string; userId: string; search: string };

  // Build filter object
  const filter: any = {};

  if (courseId) {
    filter.course = courseId;
  }

  if (userId) {
    filter.user = userId;
  }


  const userCourseAnswers = await UserCourseAnswer.find(filter).sort({ createdAt: -1 });
  const userIds = userCourseAnswers.map(a => a.user.toString());
  const courseIds = userCourseAnswers.map(a => a.course.toString());
  const users = await User.find({ _id: { $in: userIds } }).select("id name").sort({ name: 1 });
  const courses = await Course.find({ _id: { $in: courseIds } }).select("id name").sort({ name: 1 });

  const reportData = [];
  for (const userCourseAnswer of userCourseAnswers) {
    for (const answer of userCourseAnswer.answers) {
      const user = users.find(u => u.id.toString() === userCourseAnswer.user.toString());
      const course = courses.find(c => c.id.toString() === userCourseAnswer.course.toString());
      if (search) {
        const searchSlug = slugify(user!.name + course!.name + answer.question, { lower: true });
        if (!searchSlug.includes(slugify(search, { lower: true }))) {
          continue;
        }
      }
      reportData.push({
        user: user,
        course: course,
        answer: answer.answer,
        question: answer.question,
        createdAt: answer.createdAt,
      });
    }
  }


  return reportData;
});
