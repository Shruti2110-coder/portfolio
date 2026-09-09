import { useState } from 'react'
import { api } from '../lib/api.js'
import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'

const EMPTY = { name: '', email: '', subject: '', body: '', website: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  async function submit(e) {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })
    try {
      const res = await api.contact(form)
      setForm(EMPTY)
      setStatus({ state: 'ok', message: res.message ?? 'Message sent.' })
    } catch (err) {
      setStatus({ state: 'err', message: err.message })
    }
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="contact-grid">
          <Reveal className="contact-pitch">
            <span className="section-num">08</span>
            <h2>
              Let’s build
              <br />
              something.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: '46ch' }}>
              Internship, a project you want a hand with, or just to say hello — my inbox is
              open and I read everything.
            </p>

            <div className="social-list">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer noopener"
                >
                  <span className="social-label">{social.label}</span>
                  <span className="social-handle">{social.handle} ↗</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form className="card" onSubmit={submit}>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" value={form.name} onChange={set('name')} required />
              </div>

              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="c-subject">Subject</label>
                <input id="c-subject" value={form.subject} onChange={set('subject')} />
              </div>

              <div className="field">
                <label htmlFor="c-body">Message</label>
                <textarea id="c-body" value={form.body} onChange={set('body')} required />
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
                {status.state === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status.message && (
                <p className={`form-msg ${status.state === 'ok' ? 'ok' : 'err'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
