import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

export default function Design({ items, loading }) {
  return (
    <Section
      id="design"
      num="03"
      title="Design work"
      note={loading ? 'loading…' : `${items.length} in Figma`}
    >
      {loading ? (
        <div className="skeleton" style={{ height: 220 }} />
      ) : items.length === 0 ? (
        <div className="empty-state">No design work yet.</div>
      ) : (
        <div className="design-grid">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={i * 80}>
              <a
                className="design-card"
                href={item.demo}
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="design-head">
                  <span className="design-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="design-open">Open in Figma ↗</span>
                </div>

                <h3 className="design-title">{item.title}</h3>
                <p className="design-tagline">{item.tagline}</p>
                <p className="design-desc">{item.description}</p>

                {item.highlights?.length > 0 && (
                  <ul className="design-points">
                    {item.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}

                <div className="tag-row">
                  {item.tech?.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
