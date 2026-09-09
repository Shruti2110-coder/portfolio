import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

const KIND_LABEL = { work: 'Work', education: 'Education', volunteer: 'Community' }

export default function Timeline({ items, loading }) {
  return (
    <Section id="experience" num="04" title="Where I’ve been" note={loading ? 'loading…' : null}>
      {loading ? (
        <div style={{ display: 'grid', gap: 12 }}>
          {[0, 1].map((i) => (
            <div className="skeleton" key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">Nothing here yet — run the seed script to add entries.</div>
      ) : (
        <div className="timeline">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={i * 70} className="tl-item">
              <div className="tl-when">
                {item.end && item.end !== item.start
                  ? `${item.start} — ${item.end}`
                  : item.end
                    ? item.start
                    : `${item.start} — Present`}
                <span className="tl-kind">{KIND_LABEL[item.kind] ?? item.kind}</span>
              </div>
              <div>
                <h3 className="tl-role">{item.role}</h3>
                <p className="tl-org">
                  {item.org}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                {item.summary && <p className="tl-summary">{item.summary}</p>}
                {item.points?.length > 0 && (
                  <ul className="tl-points">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
