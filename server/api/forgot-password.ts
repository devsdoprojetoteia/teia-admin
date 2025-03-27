import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { phone } = body;
  const user = await User.findOne({ phone });
  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Este telefone não está registrado",
    });
  }

  user.passwordResetCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  console.log("##### PASSWORD RESET CODE #####");
  console.log(user.passwordResetCode);

  await user.save();
  return { message: "Código de recuperação enviado" };
});
