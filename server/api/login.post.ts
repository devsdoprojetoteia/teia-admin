import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY || "YOUR_SECRET_KEY";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { phone, password } = body;
  const user = await User.findOne({ phone });
  if (!user || !(await user.comparePassword(password))) {
    throw createError({
      statusCode: 401,
      message: "Telefone ou senha inválidos",
    });
  }
  const token = jwt.sign(user.publicData(), SECRET_KEY, { expiresIn: "1y" });
  return { token, user: user.publicData() };
});
