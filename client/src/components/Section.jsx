import Reveal from './Reveal.jsx'

export default function Section({ id, num, title, note, className = '', children }) {
  return (
    <section className={`section ${className}`.trim()} id={id}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <span className="section-num">{num}</span>
            <h2 className="section-title">{title}</h2>
            {note && <span className="section-note">{note}</span>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
