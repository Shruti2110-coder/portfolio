import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import contentRoutes from './routes/content.js'
import contactRoutes from './routes/contact.js'
import guestbookRoutes from './routes/guestbook.js'
import statsRoutes from './routes/stats.js'

const app = express()
const PORT = process.env.PORT || 5050

app.set('trust proxy', 1)
// Comma-separated list of allowed origins; falls back to open in local dev.
const allowedOrigins = process.env.CLIENT_ORIGIN?.split(',').map((o) => o.trim()).filter(Boolean)
app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : '*' }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }))
app.use('/api', contentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/guestbook', guestbookRoutes)
app.use('/api/stats', statsRoutes)

app.use((req, res) => res.status(404).json({ error: `No route for ${req.method} ${req.path}` }))

app.use((err, req, res, next) => {
  console.error('[error]', err.message)
  const status = err.name === 'ValidationError' ? 400 : 500
  res.status(status).json({ error: status === 400 ? err.message : 'Something went wrong.' })
})

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log(`[api] listening on port ${PORT}`))
  })
  .catch((err) => {
    console.error('[db] connection failed:', err.message)
    console.error('    Start Mongo with `npm run db:up`, or set MONGODB_URI in server/.env')
    process.exit(1)
  })
