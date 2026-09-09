import { useState } from 'react'
import { api } from '../lib/api.js'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

const EMOJIS = ['👋', '🔥', '🚀', '💡', '✨', '👏', '🌱', '☕']

function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso)) / 1000)
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs)
    if (value >= 1) return `${value} ${label}${value > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

export default function Guestbook({ entries, onSigned }) {
  const [form, setForm] = useState({ name: '', note: '', emoji: '👋', website: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  async function submit(e) {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })
    try {
      const entry = await api.sign(form)
      onSigned(entry)
      setForm({ name: '', note: '', emoji: '👋', website: '' })
      setStatus({ state: 'ok', message: 'Signed — thanks for stopping by!' })
    } catch (err) {
      setStatus({ state: 'err', message: err.message })
    }
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <Section
      id="guestbook"
      num="07"
      title="Guestbook"
      note={`${entries.length} signatures`}
      className="guestbook-section"
    >
      <div className="gb-layout">
        <Reveal>
          <form className="card" onSubmit={submit}>
            <p style={{ margin: '0 0 18px', color: 'var(--text-muted)', fontSize: 14.5 }}>
              Leave a note — it saves to the database and shows up on the wall right away.
            </p>

            <div className="field">
              <label htmlFor="gb-name">Your name</label>
              <input
                id="gb-name"
                value={form.name}
                onChange={set('name')}
                maxLength={40}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="gb-note">Note</label>
              <textarea
                id="gb-note"
                value={form.note}
                onChange={set('note')}
                maxLength={200}
                rows={3}
                required
                style={{ minHeight: 80 }}
              />
            </div>

            <div className="field">
              <label>Pick a mood</label>
              <div className="emoji-picker">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    aria-pressed={form.emoji === emoji}
                    onClick={() => setForm((f) => ({ ...f, emoji }))}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <input
              className="hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={set('website')}
              placeholder="Leave this empty"
            />

            <button
              className="btn btn-primary"
              type="submit"
              disabled={status.state === 'sending'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {status.state === 'sending' ? 'Signing…' : 'Sign the guestbook'}
            </button>

            {status.message && (
              <p className={`form-msg ${status.state === 'ok' ? 'ok' : 'err'}`}>{status.message}</p>
            )}
          </form>
        </Reveal>

        <div>
          {entries.length === 0 ? (
            <div className="empty-state">
              No signatures yet — be the first to leave a mark.
            </div>
          ) : (
            <div className="gb-wall">
              {entries.map((entry, i) => (
                <div
                  className="gb-note"
                  key={entry._id ?? i}
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                >
                  <span className="gb-emoji">{entry.emoji}</span>
                  <p className="gb-text">{entry.note}</p>
                  <div className="gb-meta">
                    <span>{entry.name}</span>
                    <span>{timeAgo(entry.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
