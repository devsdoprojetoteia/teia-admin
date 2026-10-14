import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { getSecretKey } from "~/server/utils/authorize";
import { requireString } from "~/server/utils/input";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const name = requireString(body?.name, "name");
  const phone = requireString(body?.phone, "phone");
  const password = requireString(body?.password, "password");
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "Este telefone já está registrado",
    });
  }
  const user = new User({ name, phone, password: hashSync(password, 10) });

  await user.save();

  const token = jwt.sign(user.publicData(), getSecretKey(), { expiresIn: "1y" });

  return { token, user: user.publicData() };
});
