import { connectToDatabase } from '~/server/utils/mongoose'

export default defineNitroPlugin(async () => {
  try {
    console.log('Establishing MongoDB connection on server start...')
    await connectToDatabase()
    console.log('MongoDB connection established successfully')
  } catch (error) {
    console.error('Failed to establish MongoDB connection:', error)
    process.exit(1) // Exit the process if database connection fails
  }
}) 