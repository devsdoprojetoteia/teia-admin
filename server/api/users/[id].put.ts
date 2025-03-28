import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);

  const body = await readBody(event);

  const id = event.context.params!["id"];

  const query: {
    [key: string]: string;
  } = {
    _id: id,
  };

  if (authenticatedUser.role !== "administrador") {
    query.role = "estudante";
  }

  const user = await User.findOne(query);

  const { name, phone } = body;

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Conta não encontrada",
    });
  }

  if (phone !== user.phone) {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Este telefone já está registrado para outra conta",
      });
    }
  }

  if (authenticatedUser.role === "administrador") {
    user.role = body.role;
  }
  user.name = name;
  user.phone = phone;

  await user.save();

  return {
    statusCode: 201,
    body: user.publicData(),
  };
});
