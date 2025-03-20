import HttpFactory from "../factory";
import User from "../../models/user";
import AuthResponse from "~~/models/auth";

class AuthModule extends HttpFactory {
  async authenticateWithFirebaseToken(token: string): Promise<AuthResponse> {
    return await this.apiPost<AuthResponse>(`/v1/auth/firebase`, { token });
  }
}

export default AuthModule;
