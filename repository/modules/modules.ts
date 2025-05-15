import Module from "~~/models/module";
import type { FormValues } from "~~/models/dynamic-form";
import HttpFactory from "../factory";

class ModulesModule extends HttpFactory {
  async list(courseId: string): Promise<Module[]> {
    const json = await this.apiGet<any[]>(`/api/courses/${courseId}/modules`);
    return Module.fromJsonArray(json);
  }

  async create(data: FormValues): Promise<Module> {
    const json = await this.apiPost(`/api/modules/create`, data);
    return Module.fromJson(json);
  }

  async update(id: string, data: FormValues): Promise<Module> {
    if (data.courseId) {
      data.course = data.courseId;
      delete data.courseId;
    }
    const json = await this.apiPut(`/api/modules/${id}`, data);
    return Module.fromJson(json);
  }

  async delete(id: string): Promise<void> {
    await this.apiDelete(`/api/modules/${id}`);
  }
}

export default ModulesModule;
