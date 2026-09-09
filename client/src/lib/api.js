// In dev the Vite proxy forwards /api to the local server, so a bare path works.
// In production there is no proxy, so the deployed API URL must be supplied at
// build time via VITE_API_URL (Vite inlines VITE_* when the bundle is built —
// setting it only in a local .env will NOT reach the deployed build).
const configured = import.meta.env.VITE_API_URL?.trim()

// Hosts like Render expose a bare hostname; add the scheme when it is missing.
const withScheme = configured
  ? configured.includes('://')
    ? configured
    : `https://${configured}`
  : ''

const BASE = `${withScheme.replace(/\/$/, '')}/api`

if (import.meta.env.PROD && !configured) {
  console.warn(
    '[api] VITE_API_URL is not set — this build will call its own origin and fail. ' +
      'Set it in the host dashboard and redeploy.'
  )
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export const api = {
  projects: () => request('/projects'),
  experience: () => request('/experience'),
  skills: () => request('/skills'),
  stats: () => request('/stats'),
  guestbook: () => request('/guestbook'),
  countView: (slug) =>
    request(`/projects/${slug}/view`, { method: 'POST' }).catch(() => null),
  sign: (payload) =>
    request('/guestbook', { method: 'POST', body: JSON.stringify(payload) }),
  contact: (payload) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
}
