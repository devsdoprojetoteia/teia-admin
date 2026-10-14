import { hashSync } from "bcrypt";
import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";
import { requireString } from "~/server/utils/input";

const MAX_RESET_ATTEMPTS = 5;

const invalidCode = () =>
  createError({
    statusCode: 400,
    message: "Código de recuperação inválido",
  });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const phone = requireString(body?.phone, "phone");
  const code = requireString(body?.code, "code");
  const password = requireString(body?.password, "password");
  const user = await User.findOne({ phone });

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Este telefone não está registrado",
    });
  }

  // Só aceita código que foi de fato gerado, dentro do prazo e com tentativas restantes
  if (
    !user.passwordResetCode ||
    !user.passwordResetExpires ||
    user.passwordResetExpires.getTime() < Date.now() ||
    (user.passwordResetAttempts || 0) >= MAX_RESET_ATTEMPTS
  ) {
    throw invalidCode();
  }

  if (user.passwordResetCode !== code) {
    user.passwordResetAttempts = (user.passwordResetAttempts || 0) + 1;
    await user.save();
    throw invalidCode();
  }

  user.password = hashSync(password, 10);
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetAttempts = 0;

  await user.save();

  return { message: "Senha alterada com sucesso" };
});
