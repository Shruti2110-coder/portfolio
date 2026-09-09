import { useState } from 'react'
import { api } from '../lib/api.js'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

export default function Projects({ projects, loading, error }) {
  const [openSlug, setOpenSlug] = useState(null)
  const [counted, setCounted] = useState(() => new Set())

  function toggle(project) {
    const next = openSlug === project.slug ? null : project.slug
    setOpenSlug(next)

    // Count a view the first time a project is expanded in this session.
    if (next && !counted.has(project.slug)) {
      api.countView(project.slug)
      setCounted((prev) => new Set(prev).add(project.slug))
    }
  }

  return (
    <Section
      id="work"
      num="02"
      title="Selected work"
      note={loading ? 'loading…' : `${projects.length} projects`}
    >
      {error && (
        <div className="error-note">
          Could not load projects — is the API running? Start it with{' '}
          <code>npm run dev</code> and make sure MongoDB is up (<code>npm run db:up</code>).
        </div>
      )}

      {loading && (
        <div style={{ display: 'grid', gap: 12 }}>
          {[0, 1, 2].map((i) => (
            <div className="skeleton" key={i} />
          ))}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="empty-state">
          No projects yet. Run <code>npm run seed</code> to load the starter content.
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="project-list">
          {projects.map((project, i) => {
            const isOpen = openSlug === project.slug
            return (
              <Reveal key={project.slug} delay={i * 60}>
                <article
                  className={`project ${isOpen ? 'is-open' : ''}`}
                  onClick={() => toggle(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(project)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                >
                  <span className="project-index">{String(i + 1).padStart(2, '0')}</span>

                  <div>
                    <h3 className="project-title">
                      {project.title}
                      {project.featured && <span className="badge-featured">Featured</span>}
                    </h3>
                    <p className="project-tagline">{project.tagline}</p>
                    <div className="tag-row">
                      {project.tech?.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-aside">
                    <span>{project.year}</span>
                    {project.views > 0 && <span>{project.views} views</span>}
                    <span className="project-chevron" aria-hidden="true">
                      ›
                    </span>
                  </div>

                  <div className="project-detail">
                    <div>
                      <div className="project-detail-inner">
                        <p>{project.description}</p>
                        {project.highlights?.length > 0 && (
                          <ul>
                            {project.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        )}
                        <div className="project-links">
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer noopener"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Source ↗
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer noopener"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live demo ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      )}
    </Section>
  )
}
