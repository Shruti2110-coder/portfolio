import { profile } from '../data/profile.js'

export default function Footer({ stats }) {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name} — built with React, Express and MongoDB.
        </span>
        <div className="footer-stats">
          <span>{stats?.visits?.toLocaleString() ?? '—'} visits</span>
          <span>{stats?.signatures ?? '—'} signatures</span>
          <a href="#top">back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
