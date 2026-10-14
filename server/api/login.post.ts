import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";
import jwt from "jsonwebtoken";
import { getSecretKey } from "~/server/utils/authorize";
import { requireString } from "~/server/utils/input";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const phone = requireString(body?.phone, "phone");
  const password = requireString(body?.password, "password");
  const user = await User.findOne({ phone });
  if (!user || !(await user.comparePassword(password))) {
    throw createError({
      statusCode: 401,
      message: "Telefone ou senha inválidos",
    });
  }
  const token = jwt.sign(user.publicData(), getSecretKey(), { expiresIn: "1y" });
  return { token, user: user.publicData() };
});
