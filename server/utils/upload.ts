import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { PDFImage } from 'pdf-image'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

export const s3Client = new S3Client({
  region: process.env.SPACES_REGION,
  endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`,
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!
  }
})

export const UPLOAD_PATH = 'uploads/'

export const createPath = async (path: string) => {
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true })
  }
}

export const imagesPath = async () => {
  const path = join(UPLOAD_PATH, 'images')
  await createPath(path)
  return path
}

export const thumbsPath = async () => {
  const path = join(UPLOAD_PATH, 'images/thumbs')
  await createPath(path)
  return path
}

export const averagesPath = async () => {
  const path = join(UPLOAD_PATH, 'images/averages')
  await createPath(path)
  return path
}

export const documentsPath = async () => {
  const path = join(UPLOAD_PATH, 'documents')
  await createPath(path)
  return path
}

export const uploadToS3 = async (file: Buffer, key: string, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.SPACES_BUCKET!,
    Key: key,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read'
  })

  await s3Client.send(command)
  return `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_REGION}.digitaloceanspaces.com/${key}`
}

export const processImage = async (file: Buffer, filename: string, mimeType: string) => {
  // Save original file
  const originalKey = `images/${filename}`
  const originalUrl = await uploadToS3(file, originalKey, mimeType)

  // Create and upload thumbnail
  const thumbBuffer = await sharp(file)
    .resize(400, 400, {
      fit: 'cover',
      withoutEnlargement: true
    })
    .toBuffer()
  const thumbKey = `images/thumbs/${filename}`
  const thumbUrl = await uploadToS3(thumbBuffer, thumbKey, mimeType)

  // Create and upload average size
  const averageBuffer = await sharp(file)
    .resize(1920, null, {
      withoutEnlargement: true
    })
    .toBuffer()
  const averageKey = `images/averages/${filename}`
  const averageUrl = await uploadToS3(averageBuffer, averageKey, mimeType)

  return {
    type: 'image',
    url: originalUrl,
    thumb: thumbUrl,
    average: averageUrl
  }
}

export const processPDF = async (file: Buffer, filename: string, docsPath: string) => {
  const key = `documents/${filename}`
  const url = await uploadToS3(file, key, 'application/pdf')

  const tempPath = join(docsPath, filename)
  await writeFile(tempPath, file)


  return {
    type: 'document',
    title: filename.replace(/\.[^/.]+$/, ''),
    url
  }
} 