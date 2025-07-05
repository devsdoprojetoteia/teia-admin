import Course from "~~/models/course";
import UserCourseProgress from "~~/models/user-course-progress";
import type { FormValues } from "~~/models/dynamic-form";
import HttpFactory from "../factory";

class CoursesModule extends HttpFactory {
  async list() {
    const json = await this.apiGet<any[]>(`/api/courses`);
    return Course.fromJsonArray(json);
  }
  async listPublished() {
    const json = await this.apiGet<any[]>(`/api/courses/list-published`);
    return Course.fromJsonArray(json);
  }
  async get(id: string): Promise<Course> {
    const json = await this.apiGet(`/api/courses/${id}`);
    return Course.fromJson(json);
  }

  async create(data: FormValues): Promise<Course> {
    const json = await this.apiPost(`/api/courses/create`, data);
    return Course.fromJson(json);
  }

  async update(id: string, data: FormValues): Promise<Course> {
    const json = await this.apiPut(`/api/courses/${id}`, data);
    return Course.fromJson(json);
  }

  async delete(id: string): Promise<void> {
    await this.apiDelete(`/api/courses/${id}`);
  }

  async progress(id: string): Promise<UserCourseProgress[]> {
    const json = await this.apiGet<any[]>(`/api/courses/${id}/progress`);
    return UserCourseProgress.fromJsonArray(json);
  }
}

export default CoursesModule;
