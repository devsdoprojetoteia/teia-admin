import { createError } from "h3";

// Garante que o valor vindo do body é uma string. Impede NoSQL injection
// com objetos como { "$ne": null } sendo usados direto em filtros do Mongo.
export const requireString = (value: unknown, field: string): string => {
  if (typeof value !== "string" || value.trim() === "") {
    throw createError({
      statusCode: 400,
      message: `Campo "${field}" inválido`,
    });
  }
  return value;
};

// Normaliza o telefone para o formato "(11) 11111-1111".
// Aceita também o número com código do país (55), como vem do WhatsApp.
export const normalizePhone = (value: unknown, field = "telefone"): string => {
  if (typeof value !== "string" && typeof value !== "number") {
    throw createError({
      statusCode: 400,
      message: `Campo "${field}" inválido`,
    });
  }

  let phone = value.toString();
  if (phone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
    return phone;
  }

  phone = phone.replace(/\D/g, "");
  if (phone.length > 11 && phone.startsWith("55")) {
    phone = phone.slice(2);
  }
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
};
