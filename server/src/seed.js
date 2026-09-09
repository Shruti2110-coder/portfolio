/**
 * Seeds the database with starter content.
 * Edit the arrays below with your real details, then run: npm run seed
 * Warning: this wipes and replaces projects / experience / skills.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './db.js'
import { Project, Experience, Skill } from './models/index.js'

const projects = [
  {
    slug: 'truechoice',
    title: 'TrueChoice',
    tagline: 'A voting platform with real authentication',
    description:
      'A full-stack voting app where accounts are real: passwords hashed with bcrypt, sessions carried by JWT, and routes guarded so a ballot can only be cast by someone entitled to cast it.',
    highlights: [
      'JWT authentication with bcrypt-hashed credentials',
      'Protected routes so voting is gated behind a real session',
      'React Router front end against an Express and MongoDB API',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt'],
    repo: 'https://github.com/Shruti2110-coder/TrueChoice',
    demo: 'https://true-choice-ecru.vercel.app',
    year: 2026,
    featured: false,
    order: 4,
  },
  {
    slug: 'skillsync',
    title: 'SkillSync',
    tagline: 'A course platform with a real admin side',
    description:
      'A learning platform split cleanly into student and admin experiences — students browse, enrol and track courses; admins manage the catalogue behind role-guarded routes.',
    highlights: [
      'Separate admin surface for managing the course catalogue',
      'JWT auth with protected routes and middleware-enforced roles',
      'Controllers, models and middleware split into their own layers on the backend',
      'Tailwind front end deployed on Vercel',
    ],
    tech: ['React', 'Tailwind CSS', 'Express', 'MongoDB', 'JWT'],
    repo: 'https://github.com/Shruti2110-coder/SkillSync-',
    demo: 'https://skill-sync-gray-one.vercel.app',
    year: 2026,
    featured: true,
    order: 3,
  },
  {
    slug: 'chat-app-realtime',
    title: 'Real-Time Chat App',
    tagline: 'Instant group messaging over WebSockets',
    description:
      'A realtime chat application where messages land instantly — React and Vite on the front, Node and Socket.IO on the back, deployed as a split stack with the API on Render and the client on Vercel.',
    highlights: [
      'Instant messaging over Socket.IO and WebSockets, no polling',
      'Typing indicators and user join notifications',
      'Group chat supporting multiple users in one room',
      'Deployed as a split stack: Express API on Render, React client on Vercel',
    ],
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Socket.IO', 'WebSockets'],
    repo: 'https://github.com/Shruti2110-coder/chat-app-realtime',
    demo: 'https://chat-app-realtime-ten.vercel.app',
    year: 2026,
    featured: true,
    order: 1,
  },
  {
    slug: 'github-analyzer',
    title: 'GitHub Repo Analyser',
    tagline: 'Scores any public repository out of 100',
    description:
      'Paste a public repository and get a health score with a category breakdown and a prioritised list of what to fix next — the kind of review a maintainer would give you, done in a few seconds against the GitHub REST API.',
    highlights: [
      'Scores repositories across documentation, activity, discoverability, community and maintenance',
      'Returns a grade and a prioritised list of what to fix, not just a number',
      'Reads README depth, commit recency, topics, licence and issue-tracker state',
      'Express API on Render, React client on Vercel',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Mongoose', 'GitHub REST API'],
    repo: 'https://github.com/Shruti2110-coder/github-analyzer',
    demo: 'https://github-analyzer-theta-woad.vercel.app',
    year: 2025,
    featured: true,
    order: 2,
  },]

const designs = [
  {
    slug: 'find-your-fashion',
    type: 'design',
    title: 'Find Your Fashion',
    tagline: 'A fashion discovery interface',
    description:
      'A landing page for browsing clothing collections — warm cream ground broken up by blocks of yellow and red, editorial serif headlines set against cut-out product photography, and a nav that separates collections, brands, new arrivals and sales.',
    highlights: [
      'Editorial layout pairing a serif display face with bold colour blocking',
      'Navigation split by collections, brands, new arrivals and sales',
      'Designed at MacBook Pro 16" frame size',
    ],
    tech: ['Figma', 'UI Design', 'Layout', 'Typography'],
    demo: 'https://www.figma.com/design/qYLdlWopMIjYNDo0viPypi/find-your-fashion',
    year: 2025,
    featured: true,
    order: 1,
  },
  {
    slug: 'shopping-website',
    type: 'design',
    title: 'Shopping Website',
    tagline: 'A full e-commerce UI, listing through checkout',
    description:
      'A complete storefront page rather than a single screen — hero, two best-selling product grids, an exclusive-offer panel, a designer-clothes section and a full footer, carried by a green accent throughout.',
    highlights: [
      'Full page flow: hero, product listings, offers, categories and footer',
      'Two distinct product grid treatments for different merchandising needs',
      'Consistent accent colour and spacing system across every section',
    ],
    tech: ['Figma', 'E-commerce', 'UI Design', 'Design System'],
    demo: 'https://www.figma.com/design/t599WCp10zgOJtUYbcrrXX/shopping-website',
    year: 2025,
    featured: true,
    order: 2,
  },
  {
    slug: 'online-school-concept',
    type: 'design',
    title: 'Online School Concept',
    tagline: 'An education platform landing page',
    description:
      'A concept for a school information system — a deep purple gradient behind a collage of student portraits, with the page routing visitors straight into elementary, middle and high school paths.',
    highlights: [
      'Dark gradient ground with a rounded portrait collage as the focal point',
      'Splits visitors by school level right on the landing page',
      'Separate registration and sign-in paths alongside the primary call to action',
    ],
    tech: ['Figma', 'UI Design', 'Landing Page'],
    demo: 'https://www.figma.com/design/GBLCoyHMS0IqFv7ly2X6ak/idea-of-school-page',
    year: 2025,
    featured: false,
    order: 3,
  },
]

const experience = [
  {
    role: 'Open Source Contributor',
    org: 'CircuitVerse, Backstage, KubeStellar, Meshery & others',
    kind: 'volunteer',
    location: 'Remote',
    start: '2025',
    end: 'Present',
    summary: '29 pull requests opened across major open-source projects, 13 merged.',
    points: [
      'KubeStellar Console — six merged PRs, mostly Vitest coverage for hooks and pure helpers, plus null-guard and dialog fixes',
      'CircuitVerse — merged a feature-flag removal and a setInterval cleanup fix; currently working through a multi-part Commontator removal (native Comment and CommentThread models plus their policies)',
      'Backstage — merged a documentation link fix; open PRs on catalog-client request handling and search-react empty states',
      'Also contributing to Jaeger UI, Headlamp, Kmesh and Meshery — test coverage, performance and docs fixes',
    ],
    order: 1,
  },
  {
    role: 'B.Tech, Computer Science & Engineering',
    org: 'Gyan Ganga Institute of Technology and Sciences',
    kind: 'education',
    location: 'Jabalpur, Madhya Pradesh',
    start: '2024',
    end: '2028',
    summary: 'CGPA 8.48 / 10',
    points: [
      'Coursework in data structures, algorithms, DBMS, operating systems and computer networks',
      'Building and shipping full-stack products alongside coursework since first year',
    ],
    order: 3,
  },
]

const skills = [
  { name: 'JavaScript', category: 'Languages', level: 5, order: 1 },
  { name: 'C++', category: 'Languages', level: 4, order: 2 },
  { name: 'HTML & CSS', category: 'Languages', level: 5, order: 4 },
  { name: 'React', category: 'Frontend', level: 5, order: 1 },
  { name: 'React Router', category: 'Frontend', level: 4, order: 2 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 4, order: 3 },
  { name: 'Vite', category: 'Frontend', level: 4, order: 4 },
  { name: 'Node.js', category: 'Backend', level: 5, order: 1 },
  { name: 'Express', category: 'Backend', level: 5, order: 2 },
  { name: 'MongoDB & Mongoose', category: 'Backend', level: 4, order: 3 },
  { name: 'REST APIs', category: 'Core Concepts', level: 4, order: 2 },
  { name: 'JWT & bcrypt auth', category: 'Backend', level: 4, order: 5 },
  { name: 'Socket.IO & WebSockets', category: 'Backend', level: 4, order: 6 },
  { name: 'Data Structures & Algorithms', category: 'Core Concepts', level: 4, order: 1 },
  { name: 'Git & GitHub', category: 'Tools', level: 5, order: 1 },
  { name: 'Vercel & Render', category: 'Tools', level: 4, order: 2 },
  { name: 'Figma', category: 'Tools', level: 4, order: 3 },
  { name: 'Vitest', category: 'Tools', level: 4, order: 4 },
]

async function seed() {
  await connectDB()
  await Promise.all([
    Project.deleteMany({}),
    Experience.deleteMany({}),
    Skill.deleteMany({}),
  ])
  await Promise.all([
    Project.insertMany([...projects, ...designs]),
    Experience.insertMany(experience),
    Skill.insertMany(skills),
  ])
  console.log(
    `[seed] inserted ${projects.length} projects, ${designs.length} designs, ${experience.length} experience entries, ${skills.length} skills`
  )
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('[seed] failed:', err.message)
  process.exit(1)
})
