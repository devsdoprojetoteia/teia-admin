import { uploadToS3 } from '~/server/utils/upload'
import { authorizeUpload, DOCUMENT_MIME_TYPES, safeFilename, UPLOAD_LIMITS, validateUpload } from '~/server/utils/upload-guard'

export default defineEventHandler(async (event) => {
  authorizeUpload(event)

  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'No file uploaded'
    })
  }

  const file = files[0]
  const mimeType = validateUpload(file, UPLOAD_LIMITS.document, (type) => DOCUMENT_MIME_TYPES.includes(type))
  const filename = safeFilename(file.filename)

  const key = `documents/${filename}`
  const url = await uploadToS3(file.data, key, mimeType)

  return {
    type: 'document',
    title: (file.filename || filename).replace(/\.[^/.]+$/, ''),
    url
  }
})
