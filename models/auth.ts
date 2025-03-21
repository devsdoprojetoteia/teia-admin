import type Token from "./token";
import type User from "./user";

export default interface Auth {
  token: string;
  user: User;
}
