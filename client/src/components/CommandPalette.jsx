import { useEffect, useMemo, useRef, useState } from 'react'
import { profile } from '../data/profile.js'

/** Loose subsequence match, the way most fuzzy finders behave. */
function fuzzy(needle, haystack) {
  const n = needle.toLowerCase()
  const h = haystack.toLowerCase()
  let i = 0
  for (const char of h) {
    if (char === n[i]) i += 1
    if (i === n.length) return true
  }
  return n.length === 0
}

export default function CommandPalette({ open, onClose, projects, actions }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const items = useMemo(() => {
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    return [
      { icon: '◉', label: 'About', hint: 'section', run: go('about') },
      { icon: '◈', label: 'Selected work', hint: 'section', run: go('work') },
      { icon: '✧', label: 'Design work', hint: 'section', run: go('design') },
      { icon: '◇', label: 'Experience', hint: 'section', run: go('experience') },
      { icon: '❖', label: 'Education', hint: 'section', run: go('education') },
      { icon: '◆', label: 'Skills', hint: 'section', run: go('skills') },
      { icon: '✎', label: 'Guestbook', hint: 'section', run: go('guestbook') },
      { icon: '✉', label: 'Contact', hint: 'section', run: go('contact') },
      ...projects.map((p) => ({
        icon: '▸',
        label: p.title,
        hint: 'project',
        run: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }),
      })),
      { icon: '☾', label: 'Toggle theme', hint: 'action', run: actions.toggleTheme },
      { icon: '⚡', label: 'Toggle recruiter mode', hint: 'action', run: actions.toggleRecruiter },
      { icon: '⇩', label: 'Download résumé', hint: 'action', run: () => window.open(profile.resumeUrl, '_blank') },
      { icon: '⌁', label: 'Copy email address', hint: 'action', run: () => navigator.clipboard?.writeText(profile.email) },
      ...profile.socials
        .filter((s) => s.label !== 'Email')
        .map((s) => ({
          icon: '↗',
          label: `Open ${s.label}`,
          hint: 'link',
          run: () => window.open(s.url, '_blank', 'noopener'),
        })),
    ]
  }, [projects, actions])

  const results = useMemo(
    () => items.filter((item) => fuzzy(query, `${item.label} ${item.hint}`)),
    [items, query]
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setCursor(0), [query])

  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [cursor, open])

  if (!open) return null

  function choose(item) {
    onClose()
    // Let the overlay unmount before scrolling or opening a tab.
    requestAnimationFrame(() => item.run())
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') return onClose()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (c + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault()
      choose(results[cursor])
    }
  }

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          className="palette-input"
          placeholder="Jump to a section, project or action…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Search commands"
        />

        <div className="palette-list" ref={listRef} role="listbox">
          {results.length === 0 ? (
            <div className="palette-empty">Nothing matches “{query}”.</div>
          ) : (
            results.map((item, i) => (
              <button
                key={`${item.hint}-${item.label}`}
                className="palette-item"
                role="option"
                aria-selected={i === cursor}
                onMouseEnter={() => setCursor(i)}
                onClick={() => choose(item)}
              >
                <span className="pi-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
                <span className="pi-hint">{item.hint}</span>
              </button>
            ))
          )}
        </div>

        <div className="palette-foot">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
