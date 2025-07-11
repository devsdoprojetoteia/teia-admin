import { H3Event, createError } from "h3";
import jwt from "jsonwebtoken";
import authenticated from "~/middleware/authenticated";
import User from "~/models/user";

const SECRET_KEY = process.env.SECRET_KEY || "YOUR_SECRET_KEY";
const BOT_TOKEN = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN";

export default (event: H3Event, requiredRoles: string[]) => {
  try {
    // Extract the Authorization header
    const authHeader = event.node.req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        message: "Token de autorização inválido",
      });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    if (token === BOT_TOKEN) {
      return User.fromJson({
        _id: "67e4b0affa1f7e923d689728",
        name: "ChatBot",
        phone: "(99) 99999-9999",
        role: "administrador",
        password: "",
      });
    }

    // Verify the token
    const secretKey = SECRET_KEY; // Ensure you have this set in your environment variables
    if (!secretKey) {
      throw createError({
        statusCode: 500,
        message: "Internal Server Error: Secret key not set",
      });
    }

    const decodedToken = jwt.verify(token, secretKey);
    const authenticatedUser = User.fromJson(decodedToken);

    // Check if the user has the required roles

    if (!requiredRoles.includes(authenticatedUser.role)) {
      throw createError({
        statusCode: 403,
        message:
          "Acesso negado. Você não tem permissão de " +
          requiredRoles.join(" ou ") +
          " para acessar este recurso.",
      });
    }

    // Token is valid, and user has required roles
    return authenticatedUser;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 401,
      message: error.message || "Unauthorized",
    });
  }
};