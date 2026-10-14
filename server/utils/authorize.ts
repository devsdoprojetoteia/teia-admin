import { H3Event, createError } from "h3";
import { timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";
import User from "~/models/user";

// Rotas em que o token fixo do chatbot é aceito. Fora daqui ele é recusado.
const BOT_ROUTES_PREFIX = "/api/chatbot/";

export const BOT_ROLE = "chatbot";

export const getSecretKey = () => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw createError({
      statusCode: 500,
      message: "Internal Server Error: Secret key not set",
    });
  }
  return secretKey;
};

const isBotToken = (token: string) => {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(botToken);
  return a.length === b.length && timingSafeEqual(a, b);
};

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

    let authenticatedUser: User;

    if (isBotToken(token)) {
      // O token do chatbot só vale nas rotas /api/chatbot/*
      if (!event.path.startsWith(BOT_ROUTES_PREFIX)) {
        throw createError({
          statusCode: 403,
          message: "Token do chatbot não pode acessar este recurso.",
        });
      }
      authenticatedUser = User.fromJson({
        _id: "67e4b0affa1f7e923d689728",
        name: "ChatBot",
        phone: "(99) 99999-9999",
        role: BOT_ROLE,
        password: "",
      });
    } else {
      const decodedToken = jwt.verify(token, getSecretKey());
      authenticatedUser = User.fromJson(decodedToken);
    }

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
