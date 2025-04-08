import User from "~~/models/user";
import type { FormValues } from "~~/models/dynamic-form";
import HttpFactory from "../factory";

class UsersModule extends HttpFactory {
  async list() {
    const json = await this.apiGet<any[]>(`/api/users`);
    return User.fromJsonArray(json);
  }
  async get(id: string): Promise<User> {
    const json = await this.apiGet(`/api/users/${id}`);
    return User.fromJson(json);
  }

  async create(data: FormValues): Promise<User> {
    const json = await this.apiPost(`/api/users/create`, data);
    return User.fromJson(json);
  }

  async update(id: string, data: FormValues): Promise<User> {
    const json = await this.apiPut(`/api/users/${id}`, data);
    return User.fromJson(json);
  }

  async delete(id: string): Promise<void> {
    await this.apiDelete(`/api/users/${id}`);
  }

  async updatePassword(id: string, data: FormValues): Promise<void> {
    await this.apiPut(`/api/users/password/${id}`, data);
  }
}

export default UsersModule;
