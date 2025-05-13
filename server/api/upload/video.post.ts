import { uploadToS3 } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'No file uploaded'
    })
  }

  const file = files[0]
  const filename = file.filename || `${Date.now()}-${Math.random().toString(36).substring(7)}`
  const mimeType = file.type || 'application/octet-stream'

  if (!mimeType.startsWith('video/')) {
    throw createError({
      statusCode: 400,
      message: 'Invalid file type. Only videos are allowed.'
    })
  }

  const key = `videos/${filename}`
  const url = await uploadToS3(file.data, key, mimeType)

  return {
    type: 'video',
    url
  }
}) 