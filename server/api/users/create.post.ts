import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const body = await readBody(event);

  const { name, phone, password } = body;
  console.log(body);

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "Este telefone já está registrado",
    });
  }
  const user = new User({ name, phone, password: hashSync(password, 10) });

  if (authenticatedUser.role === "administrador") {
    user.role = body.role;
  } else {
    user.role = "estudante";
  }

  await user.save();

  return {
    statusCode: 201,
    body: user,
  };
});
