import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'
import { useScrollSpy } from '../lib/hooks.js'

const SECTIONS = ['about', 'work', 'design', 'experience', 'education', 'skills', 'guestbook', 'contact']
const LABELS = {
  about: 'About',
  work: 'Work',
  design: 'Design',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  guestbook: 'Guestbook',
  contact: 'Contact',
}

export default function Nav({ theme, onToggleTheme, onOpenPalette }) {
  const active = useScrollSpy(SECTIONS)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isMac = navigator.platform.toUpperCase().includes('MAC')

  return (
    <nav className={`nav ${stuck ? 'is-stuck' : ''}`}>
      <div className="shell nav-inner">
        <a href="#top" className="nav-mark">
          <span className="nav-dot" />
          {profile.name}
        </a>

        <div className="nav-links">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
              {LABELS[id]}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button className="kbd-btn" onClick={onOpenPalette} aria-label="Open command palette">
            <span className="kbd-btn-label">Search</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'}K</kbd>
          </button>
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </nav>
  )
}
