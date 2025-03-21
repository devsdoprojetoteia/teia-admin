import HttpFactory from "../factory";
import type User from "../../models/user";
import type Auth from "~~/models/auth";

class AuthModule extends HttpFactory {
  async login(phone: string, password: string): Promise<Auth> {
    return await this.apiPost<Auth>(`/api/login`, { phone, password });
  }
  async register(name: string, phone: string, password: string): Promise<Auth> {
    return await this.apiPost<Auth>(`/api/register`, { name, phone, password });
  }
}

export default AuthModule;
