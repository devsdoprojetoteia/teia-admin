import { defineEventHandler, readBody, createError } from "h3";
import { randomInt } from "crypto";
import User from "~~/server/models/user";
import { requireString } from "~/server/utils/input";

const RESET_CODE_TTL_MINUTES = 30;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const phone = requireString(body?.phone, "phone");
  const user = await User.findOne({ phone });
  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Este telefone não está registrado",
    });
  }

  user.passwordResetCode = randomInt(100000, 1000000).toString();
  user.passwordResetExpires = new Date(Date.now() + RESET_CODE_TTL_MINUTES * 60 * 1000);
  user.passwordResetAttempts = 0;

  // TODO: enviar o código ao usuário (WhatsApp/SMS). Hoje ele só fica no log do servidor.
  console.log("##### PASSWORD RESET CODE #####");
  console.log(user.passwordResetCode);

  await user.save();
  return { message: "Código de recuperação enviado" };
});
