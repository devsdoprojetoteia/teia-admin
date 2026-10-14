import { H3Event, createError } from "h3";
import { randomBytes } from "crypto";
import { extname } from "path";
import authorize from "~/server/utils/authorize";

type MultipartFile = { filename?: string; type?: string; data: Buffer };

const MB = 1024 * 1024;

export const UPLOAD_LIMITS = {
  image: 15 * MB,
  audio: 50 * MB,
  document: 50 * MB,
  video: 500 * MB,
};

// Tipos de documento aceitos (sem HTML/SVG/JS, que permitiriam XSS no bucket público)
export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/zip",
  "text/plain",
  "text/csv",
];

// Uploads só para a equipe que edita conteúdo
export const authorizeUpload = (event: H3Event) =>
  authorize(event, ["administrador", "tutor"]);

export const validateUpload = (
  file: MultipartFile,
  maxSize: number,
  isAllowedType: (mimeType: string) => boolean
) => {
  const mimeType = file.type || "application/octet-stream";
  if (!isAllowedType(mimeType)) {
    throw createError({
      statusCode: 400,
      message: "Tipo de arquivo não permitido.",
    });
  }
  if (file.data.length > maxSize) {
    throw createError({
      statusCode: 413,
      message: `Arquivo maior que o limite de ${Math.round(maxSize / MB)} MB.`,
    });
  }
  return mimeType;
};

// Nome gerado no servidor: evita sobrescrever arquivos existentes no bucket
export const safeFilename = (originalName?: string) => {
  const ext = extname(originalName || "").toLowerCase().replace(/[^a-z0-9.]/g, "").slice(0, 10);
  return `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
};
