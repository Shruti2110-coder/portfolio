import { useCallback, useEffect, useState } from 'react'
import { api } from './lib/api.js'
import { useTheme, usePointerSpotlight, useScrollProgress } from './lib/hooks.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Design from './components/Design.jsx'
import Timeline from './components/Timeline.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Guestbook from './components/Guestbook.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CommandPalette from './components/CommandPalette.jsx'

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const progress = useScrollProgress()
  usePointerSpotlight()

  const [data, setData] = useState({
    projects: [],
    experience: [],
    skills: [],
    grouped: {},
    guestbook: [],
    stats: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [recruiter, setRecruiter] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [projects, experience, skillsRes, guestbook, stats] = await Promise.all([
          api.projects(),
          api.experience(),
          api.skills(),
          api.guestbook(),
          api.stats(),
        ])
        if (cancelled) return
        setData({
          projects,
          experience,
          skills: skillsRes.skills,
          grouped: skillsRes.grouped,
          guestbook,
          stats,
        })
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('recruiter', recruiter)
  }, [recruiter])

  const toggleRecruiter = useCallback(() => setRecruiter((r) => !r), [])

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
      if (e.key === 'Escape') setPaletteOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const onSigned = useCallback((entry) => {
    setData((d) => ({
      ...d,
      guestbook: [entry, ...d.guestbook],
      stats: d.stats ? { ...d.stats, signatures: d.stats.signatures + 1 } : d.stats,
    }))
  }, [])

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />

      {recruiter && (
        <div className="mode-banner">
          Recruiter mode — the essentials only, everything expanded.
          <button onClick={toggleRecruiter}>exit</button>
        </div>
      )}

      <Nav
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main>
        <Hero stats={data.stats} skills={data.skills} />
        <About />
        <Projects
          projects={data.projects.filter((p) => p.type !== 'design')}
          loading={loading}
          error={error}
        />
        <Design
          items={data.projects.filter((p) => p.type === 'design')}
          loading={loading}
        />
        <Timeline
          items={data.experience.filter((e) => e.kind !== 'education')}
          loading={loading}
        />
        <Education
          items={data.experience.filter((e) => e.kind === 'education')}
          loading={loading}
        />
        <Skills grouped={data.grouped} loading={loading} />
        <Guestbook entries={data.guestbook} onSigned={onSigned} />
        <Contact />
      </main>

      <Footer stats={data.stats} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        projects={data.projects}
        actions={{ toggleTheme, toggleRecruiter }}
      />
    </>
  )
}
