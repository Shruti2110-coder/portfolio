import { Router } from 'express'
import { Stat, Project, Guestbook } from '../models/index.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const [visits, projectCount, signatures, topProjects] = await Promise.all([
      Stat.findOneAndUpdate(
        { key: 'visits' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      ).lean(),
      Project.countDocuments(),
      Guestbook.countDocuments({ approved: true }),
      Project.find().sort({ views: -1 }).limit(3).select('slug title views').lean(),
    ])

    res.json({
      visits: visits.value,
      projects: projectCount,
      signatures,
      topProjects,
    })
  } catch (err) {
    next(err)
  }
})

export default router
