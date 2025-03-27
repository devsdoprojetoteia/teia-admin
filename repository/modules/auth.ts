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

  async forgotPassword(phone: string): Promise<boolean> {
    return await this.apiPost<boolean>(`/api/forgot-password`, { phone });
  }

  async recoverPassword(
    phone: string,
    code: string,
    password: string
  ): Promise<boolean> {
    return await this.apiPost<boolean>(`/api/recover-password`, {
      phone,
      code,
      password,
    });
  }
}

export default AuthModule;
