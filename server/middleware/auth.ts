import { defineEventHandler, createError } from "h3";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export default defineEventHandler((event) => {
  const token = event.req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw createError({ statusCode: 401, message: "Token não fornecido." });
  }

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido." });
  }
});
