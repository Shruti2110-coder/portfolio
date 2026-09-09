# Portfolio — Shruti Jain

A MERN portfolio site. React + Vite on the front, Express + MongoDB behind it.

## Quick start

```bash
npm run install:all   # install root, server and client deps
npm run db:up         # start MongoDB in Docker (needs Docker Desktop running)
npm run seed          # load projects, experience and skills into the database
npm run dev           # start API (:5050) and client (:5173) together
```

Then open http://localhost:5173

## Layout

```
server/                Express + Mongoose API
  src/models/index.js  Project, Experience, Skill, Message, Guestbook, Stat
  src/routes/          content, contact, guestbook, stats
  src/seed.js          ← your projects, experience and skills live here
client/                React + Vite front end
  src/data/profile.js  ← your name, bio, socials, résumé link
  src/components/      Nav, Hero, Projects, Timeline, Education, Skills, Guestbook, Contact, CommandPalette
```

## Editing your content

Two files hold everything about you:

- **`server/src/seed.js`** — projects, experience, skills. Edit, then run `npm run seed` again (it wipes and replaces those three collections).
- **`client/src/data/profile.js`** — name, role, bio, social links, résumé URL.

Drop your résumé at `client/public/resume.pdf` so the "Résumé" button works.

## Features

- **⌘K command palette** — fuzzy jump to any section, project or action
- **Guestbook** — visitors sign, entries persist in MongoDB
- **Contact form** — messages stored in MongoDB, rate limited, honeypot-protected
- **Recruiter mode** — collapses the page to essentials with everything expanded
- **Live counters** — page visits and per-project view counts
- Dark/light theme, scroll reveals, reading progress bar

## API

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/projects` | All projects (`?featured=true` to filter) |
| GET | `/api/projects/:slug` | One project |
| POST | `/api/projects/:slug/view` | Increment view count |
| GET | `/api/experience` | Timeline entries (`?kind=work\|education\|volunteer`) |
| GET | `/api/skills` | Skills, flat and grouped by category |
| GET | `/api/guestbook` | Latest 50 signatures |
| POST | `/api/guestbook` | Sign (3 per 15 min) |
| POST | `/api/contact` | Send a message (5 per hour) |
| GET | `/api/stats` | Visit count, project count, signatures |
| GET | `/api/health` | Liveness check |

## Reading the messages people send you

Contact messages land in the `messages` collection. To read them:

```bash
docker exec -it portfolio-mongo mongosh portfolio --eval 'db.messages.find().sort({createdAt:-1}).pretty()'
```

## Using MongoDB Atlas instead of Docker

Put your connection string in `server/.env`:

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
```

## Deploying

The client needs `VITE_API_URL` at **build time** (Vite inlines `VITE_*` into the
bundle). Setting it only in a local `.env` will not reach the deployed build — it
has to be set in the host's dashboard, then redeployed.

### 1. Database — MongoDB Atlas

Create a free cluster and a database user, allow network access, and copy the
connection string. Use `portfolio` as the database name.

### 2. Deploy

**Option A — both on Render (one blueprint).** Render → New → Blueprint → pick
this repo. `render.yaml` defines both services and wires `VITE_API_URL` from the
API's host automatically. Set two secrets in the dashboard:

- `MONGODB_URI` — the Atlas string
- `CLIENT_ORIGIN` — the client URL, e.g. `https://portfolio-web.onrender.com`

**Option B — client on Vercel, API on Render.** Deploy `server/` to Render
first, then import the repo into Vercel with root directory `client/` and set
`VITE_API_URL` to the Render URL. Add the Vercel URL to the API's
`CLIENT_ORIGIN`.

### 3. Seed the production database

Once, from your machine, pointed at Atlas:

```bash
MONGODB_URI="<your atlas string>" npm run seed
```

### Order matters

Deploy the API first, take its URL, then build the client with it. Building the
client before the API exists bakes in a missing URL and the site loads but shows
no content.

### Free-tier note

Render free services sleep after inactivity, so the first request can take
~30 seconds. The site renders immediately; content pops in when the API wakes.
