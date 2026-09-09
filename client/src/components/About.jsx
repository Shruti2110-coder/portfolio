import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <Section id="about" num="01" title="About" note={profile.location}>
      <div className="about-grid">
        <Reveal className="about-body">
          {profile.bio.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>

        <Reveal delay={120} className="about-aside">
          <span className="eyebrow">Right now</span>
          <ul className="fact-list">
            {profile.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
