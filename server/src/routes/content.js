import { Router } from 'express'
import { Project, Experience, Skill } from '../models/index.js'

const router = Router()

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

router.get('/projects', wrap(async (req, res) => {
  const filter = {}
  if (req.query.featured === 'true') filter.featured = true
  if (req.query.type) filter.type = req.query.type
  const projects = await Project.find(filter).sort({ order: 1, year: -1 }).lean()
  res.json(projects)
}))

router.get('/projects/:slug', wrap(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug }).lean()
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json(project)
}))

// Counts a project view. Fire-and-forget from the client.
router.post('/projects/:slug/view', wrap(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true, projection: { views: 1 } }
  ).lean()
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json({ views: project.views })
}))

router.get('/experience', wrap(async (req, res) => {
  const filter = req.query.kind ? { kind: req.query.kind } : {}
  const items = await Experience.find(filter).sort({ order: 1 }).lean()
  res.json(items)
}))

router.get('/skills', wrap(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 }).lean()
  const grouped = skills.reduce((acc, s) => {
    ;(acc[s.category] ||= []).push(s)
    return acc
  }, {})
  res.json({ skills, grouped })
}))

export default router
