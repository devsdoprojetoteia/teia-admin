import Topic from "~~/models/topic";
import type { FormValues } from "~~/models/dynamic-form";
import HttpFactory from "../factory";

class TopicsModule extends HttpFactory {
  async list(moduleId: string): Promise<Topic[]> {
    const json = await this.apiGet<any[]>(`/api/topics?module=${moduleId}`);
    return Topic.fromJsonArray(json);
  }

  async create(data: FormValues): Promise<Topic> {
    const json = await this.apiPost(`/api/topics/create`, data);
    return Topic.fromJson(json);
  }

  async update(id: string, data: FormValues): Promise<Topic> {
    const json = await this.apiPut(`/api/topics/${id}`, data);
    return Topic.fromJson(json);
  }

  async delete(id: string): Promise<void> {
    await this.apiDelete(`/api/topics/${id}`);
  }

  async reorder(topicId: string, direction: 'up' | 'down'): Promise<void> {
    await this.apiPost(`/api/topics/reorder`, { topicId, direction });
  }

  async get(id: string): Promise<Topic> {
    const json = await this.apiGet<any>(`/api/topics/${id}`);
    return Topic.fromJson(json);
  }
}

export default TopicsModule; 