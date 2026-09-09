import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

export default function Education({ items, loading }) {
  return (
    <Section
      id="education"
      num="05"
      title="Education"
      note={loading ? 'loading…' : null}
    >
      {loading ? (
        <div className="skeleton" style={{ height: 160 }} />
      ) : items.length === 0 ? (
        <div className="empty-state">No education entries yet.</div>
      ) : (
        <div className="edu-grid">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={i * 80}>
              <article className="edu-card">
                <div className="edu-head">
                  <span className="edu-years">
                    {item.start} — {item.end || 'Present'}
                  </span>
                  {item.summary && <span className="edu-grade">{item.summary}</span>}
                </div>

                <h3 className="edu-degree">{item.role}</h3>
                <p className="edu-org">{item.org}</p>
                {item.location && <p className="edu-place">{item.location}</p>}

                {item.points?.length > 0 && (
                  <ul className="edu-points">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
