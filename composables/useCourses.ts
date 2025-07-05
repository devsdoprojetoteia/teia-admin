import type UserCourseProgress from "~/models/user-course-progress";
import Course from "~~/models/course";
import type { FormValues } from "~~/models/dynamic-form";

const useCourses = () => {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  let courses = useState<Course[] | null>("courses");
  let showAddCourse = useState<Boolean>("showAddCourse", () => false);
  let userCourseProgress = useState<UserCourseProgress[]>("userCourseProgress", () => []);

  let activeCourse = computed(() => {
    const courseId = route.query.course;
    if (courseId) {
      return courses.value?.find((d) => d.id === courseId);
    }
    return null;
  });

  const loadCourses = async () => {
    courses.value = await $api.courses.list();
  };

  const loadUserCourseProgress = async (courseId: string) => {
    userCourseProgress.value = [];
    userCourseProgress.value = await $api.courses.progress(courseId);
  };

  const hasCourses = computed(() => {
    return courses.value !== null && courses.value.length > 0;
  });

  const editCourse = async (course: Course) => {
    await router.push({
      path: route.path,
      query: {
        ...route.query,
        course: course.id,
      },
    });
  };

  const getCourse = async (id: string) => {
    const course = await $api.courses.get(id);
    return course;
  };

  const createCourse = async (data: FormValues) => {
    return await $api.courses.create(data);
  };

  const updateCourse = async (id: string, data: FormValues) => {
    return await $api.courses.update(id, data);
  };

  const deleteCourse = async (id: string) => {
    return await $api.courses.delete(id);
  };

  const closeCourse = () => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        course: undefined,
      },
    });
  };

  const getPublishedCourses = async () => {
    const courses = await $api.courses.listPublished();
    return courses;
  };

  return {
    courses,
    activeCourse,
    showAddCourse,
    hasCourses,
    loadCourses,
    editCourse,
    closeCourse,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    loadUserCourseProgress,
    userCourseProgress,
    getPublishedCourses,
  };
};
export default useCourses;
