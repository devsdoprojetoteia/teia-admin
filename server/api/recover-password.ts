import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { phone, code, password } = body;
  const user = await User.findOne({ phone });

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Este telefone não está registrado",
    });
  }

  if (user.passwordResetCode !== code) {
    throw createError({
      statusCode: 400,
      message: "Código de recuperação inválido",
    });
  }

  user.password = hashSync(password, 10);

  await user.save();

  return { message: "Senha alterada com sucesso" };
});
