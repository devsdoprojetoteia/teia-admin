import { processImage } from '~/server/utils/upload'
import { authorizeUpload, safeFilename, UPLOAD_LIMITS, validateUpload } from '~/server/utils/upload-guard'

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
  // SVG pode conter script, então não é aceito
  const mimeType = validateUpload(file, UPLOAD_LIMITS.image, (type) => type.startsWith('image/') && type !== 'image/svg+xml')
  const filename = safeFilename(file.filename)

  return await processImage(file.data, filename, mimeType)
})
