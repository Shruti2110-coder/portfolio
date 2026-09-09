import mongoose from 'mongoose'

const { Schema, model } = mongoose

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    // 'code' for built projects, 'design' for Figma/UI work.
    type: { type: String, enum: ['code', 'design'], default: 'code', index: true },
    tagline: String,
    description: String,
    highlights: [String],
    tech: [String],
    repo: String,
    demo: String,
    image: String,
    year: Number,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    org: { type: String, required: true },
    kind: { type: String, enum: ['work', 'education', 'volunteer'], default: 'work' },
    location: String,
    start: String,
    end: String,
    summary: String,
    points: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'Other' },
    level: { type: Number, min: 1, max: 5, default: 3 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 160 },
    subject: { type: String, trim: true, maxlength: 140 },
    body: { type: String, required: true, trim: true, maxlength: 4000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const guestbookSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 40 },
    note: { type: String, required: true, trim: true, maxlength: 200 },
    emoji: { type: String, default: '👋', maxlength: 8 },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const statSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project = model('Project', projectSchema)
export const Experience = model('Experience', experienceSchema)
export const Skill = model('Skill', skillSchema)
export const Message = model('Message', messageSchema)
export const Guestbook = model('Guestbook', guestbookSchema)
export const Stat = model('Stat', statSchema)
