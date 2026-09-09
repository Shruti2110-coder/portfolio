import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { Message } from '../models/index.js'

const router = Router()

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', limiter, async (req, res, next) => {
  try {
    const { name = '', email = '', subject = '', body = '', website = '' } = req.body ?? {}

    // Honeypot: bots fill hidden fields, humans never see them.
    if (website) return res.status(200).json({ ok: true })

    if (!name.trim() || !body.trim()) {
      return res.status(400).json({ error: 'Name and message are both required.' })
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'That email address does not look right.' })
    }

    await Message.create({ name, email, subject, body })
    res.status(201).json({ ok: true, message: 'Message received — thank you!' })
  } catch (err) {
    next(err)
  }
})

export default router
