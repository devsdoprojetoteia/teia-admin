import { processPDF, documentsPath, uploadToS3 } from '~/server/utils/upload'

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

  const docsPath = await documentsPath()

  if (mimeType === 'application/pdf') {
    return await processPDF(file.data, filename, docsPath)
  }

  // Handle other document types
  const key = `documents/${filename}`
  const url = await uploadToS3(file.data, key, mimeType)

  return {
    type: 'document',
    title: filename.replace(/\.[^/.]+$/, ''),
    url
  }
}) 