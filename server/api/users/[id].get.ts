import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import authorize from "~/server/utils/authorize";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const authenticatedUser = authorize(event, ["administrador", "tutor"]);


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

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Conta não encontrada",
    });
  }

  return {
    statusCode: 201,
    body: user.publicData(),
  };
});
