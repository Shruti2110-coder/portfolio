import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

export default function Skills({ grouped, loading }) {
  const categories = Object.keys(grouped)

  return (
    <Section
      id="skills"
      num="06"
      title="Toolkit"
      note={loading ? 'loading…' : `${categories.length} areas`}
    >
      {loading ? (
        <div className="skeleton" style={{ height: 200 }} />
      ) : categories.length === 0 ? (
        <div className="empty-state">No skills recorded yet.</div>
      ) : (
        <Reveal>
          <div className="skill-groups">
            {categories.map((category) => (
              <div className="skill-group" key={category}>
                <h3>{category}</h3>
                {grouped[category].map((skill) => (
                  <div className="skill-row" key={skill._id}>
                    <div className="skill-name">
                      <span>{skill.name}</span>
                      <span>{'●'.repeat(skill.level)}</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-fill"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
