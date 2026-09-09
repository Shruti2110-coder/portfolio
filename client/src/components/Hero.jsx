import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'

export default function Hero({ stats, skills }) {
  const marqueeItems = skills.length
    ? skills.map((s) => s.name)
    : ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Python']

  return (
    <header className="hero" id="top">
      <div className="shell">
        <Reveal>
          <span className="hero-status">
            <span className="nav-dot" />
            {profile.available}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1>
            Hi, I’m {profile.name.split(' ')[0]}.
            <br />I <em>build</em> things
            <br />for the web.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero-lede">
            {profile.role} based in {profile.location}. I turn awkward problems into
            interfaces that feel obvious — mostly with React, Node and MongoDB.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#work">
              See my work <span aria-hidden="true">↓</span>
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
            <a className="btn btn-ghost" href={profile.resumeUrl} download>
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="hero-meta">
            <div>
              <b>{stats?.projects ?? '—'}</b>
              projects shipped
            </div>
            <div>
              <b>{stats?.visits?.toLocaleString() ?? '—'}</b>
              visits to this page
            </div>
            <div>
              <b>{stats?.signatures ?? '—'}</b>
              guestbook signatures
            </div>
          </div>
        </Reveal>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span className="marquee-group" key={copy}>
              {marqueeItems.map((item) => (
                <span className="marquee-item" key={item}>
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
