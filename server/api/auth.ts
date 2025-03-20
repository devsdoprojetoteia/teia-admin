import { defineEventHandler, readBody, createError } from "h3";
import User from "~~/server/models/user";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || 'YOUR_SECRET_KEY';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === "POST") {
    const body = await readBody(event);

    if (event.node.req.url?.includes("/register")) {
      const { email, password } = body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw createError({ statusCode: 400, message: "Email já registrado." });
      }
      const user = new User({ email, password });
      await user.save();
      return { message: "Usuário registrado com sucesso." };
    }

    if (event.node.req.url?.includes("/login")) {
      const { email, password } = body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw createError({ statusCode: 401, message: "Credenciais inválidas." });
      }
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
      return { token };
    }
  }

  throw createError({ statusCode: 405, message: "Método não permitido." });
});
