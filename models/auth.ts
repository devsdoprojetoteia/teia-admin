import Token from "./token";
import User from "./user";

export default interface Auth {
  token: Token;
  user: User;
}
