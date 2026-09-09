import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set — copy server/.env.example to server/.env')

  mongoose.connection.on('disconnected', () => console.warn('[db] disconnected'))
  mongoose.connection.on('reconnected', () => console.log('[db] reconnected'))

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  console.log(`[db] connected to ${mongoose.connection.name}`)
  return mongoose.connection
}
