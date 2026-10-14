import { uploadToS3 } from '~/server/utils/upload'
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
  const mimeType = validateUpload(file, UPLOAD_LIMITS.audio, (type) => type.startsWith('audio/'))
  const filename = safeFilename(file.filename)

  const key = `audios/${filename}`
  const url = await uploadToS3(file.data, key, mimeType)

  return {
    type: 'audio',
    url
  }
})
