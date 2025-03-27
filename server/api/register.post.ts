import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY || "YOUR_SECRET_KEY";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, phone, password } = body;
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "Este telefone já está registrado",
    });
  }
  const user = new User({ name, phone, password: hashSync(password, 10) });

  await user.save();

  const token = jwt.sign(user.publicData(), SECRET_KEY, { expiresIn: "1y" });

  return { token, user: user.publicData() };
});
