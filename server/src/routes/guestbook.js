import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { Guestbook } from '../models/index.js'

const router = Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'You have already signed recently. Thanks for the enthusiasm!' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.get('/', async (req, res, next) => {
  try {
    const entries = await Guestbook.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

router.post('/', limiter, async (req, res, next) => {
  try {
    const { name = '', note = '', emoji = '👋', website = '' } = req.body ?? {}
    if (website) return res.status(200).json({ ok: true })

    if (!name.trim() || !note.trim()) {
      return res.status(400).json({ error: 'Both a name and a note are required.' })
    }

    const entry = await Guestbook.create({ name, note, emoji })
    res.status(201).json(entry)
  } catch (err) {
    next(err)
  }
})

export default router
