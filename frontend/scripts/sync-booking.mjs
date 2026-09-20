// Booking-page mirror: hibiscustoairport.co.nz renders the bookaride.co.nz booking
// page VERBATIM (shared API, shared database, shared Stripe). The files in
// MIRRORED are copied byte-for-byte from the bookaride.co.nz repo and must
// never be edited here — any divergence is drift, and drift is a bug.
//
//   npm run sync:booking  [-- /path/to/BookARide]   copy from source, refresh manifest
//   npm run check:booking                            verify local copies match the manifest
//
// check:booking runs before every build (see package.json "prebuild"), so a
// local edit to a mirrored file fails the build until it is either reverted
// or made upstream in bookaride.co.nz and re-synced from there.
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const frontendDir = path.resolve(here, '..')
const manifestPath = path.join(here, 'booking-mirror.json')

// Paths relative to frontend/src in BOTH repos.
export const MIRRORED = [
  'pages/BookNow.jsx',
  'pages/PaymentSuccess.jsx',
  'components/DateTimePicker.jsx',
  'components/GoogleAddressInput.jsx',
  'components/TrustBadges.jsx',
  'components/LoadingSpinner.jsx',
  'lib/analytics.js',
  'config/api.js',
  'components/ui/button.jsx',
  'components/ui/input.jsx',
  'components/ui/label.jsx',
  'components/ui/select.jsx',
  'components/ui/textarea.jsx',
  'components/ui/card.jsx',
]

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')
const localPath = (rel) => path.join(frontendDir, 'src', rel)

function check() {
  if (!existsSync(manifestPath)) {
    console.error('booking mirror: manifest missing — run `npm run sync:booking` first')
    process.exit(1)
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const problems = []
  for (const rel of MIRRORED) {
    const expected = manifest.files[rel]
    if (!expected) { problems.push(`${rel}: not in manifest (re-run sync)`); continue }
    if (!existsSync(localPath(rel))) { problems.push(`${rel}: missing locally`); continue }
    const actual = sha256(readFileSync(localPath(rel)))
    if (actual !== expected) problems.push(`${rel}: differs from the bookaride.co.nz mirror`)
  }
  for (const rel of Object.keys(manifest.files)) {
    if (!MIRRORED.includes(rel)) problems.push(`${rel}: in manifest but no longer in MIRRORED list`)
  }
  if (problems.length) {
    console.error('booking mirror: DRIFT DETECTED — the booking page must stay identical to bookaride.co.nz')
    for (const p of problems) console.error('  - ' + p)
    console.error('Fix it upstream in the bookaride.co.nz repo, then run `npm run sync:booking -- <path-to-BookARide>`.')
    process.exit(1)
  }
  console.log(`booking mirror: OK (${MIRRORED.length} files match bookaride.co.nz @ ${manifest.source.commit.slice(0, 7)})`)
}

function sync(sourceRepo) {
  const src = path.resolve(sourceRepo || process.env.BOOKARIDE_SRC || path.resolve(frontendDir, '../../BookARide'))
  const srcFrontend = path.join(src, 'frontend', 'src')
  if (!existsSync(srcFrontend)) {
    console.error(`booking mirror: source repo not found at ${src} (pass a path or set BOOKARIDE_SRC)`)
    process.exit(1)
  }
  let commit = 'unknown'
  try { commit = execSync('git rev-parse HEAD', { cwd: src, encoding: 'utf8' }).trim() } catch {}
  const files = {}
  for (const rel of MIRRORED) {
    const from = path.join(srcFrontend, rel)
    if (!existsSync(from)) { console.error(`booking mirror: ${rel} missing in source`); process.exit(1) }
    mkdirSync(path.dirname(localPath(rel)), { recursive: true })
    copyFileSync(from, localPath(rel))
    files[rel] = sha256(readFileSync(localPath(rel)))
    console.log(`synced ${rel}`)
  }
  const manifest = {
    source: { repo: 'Book-A-Ride-Gap-Digital/BookARide', commit, syncedAt: new Date().toISOString() },
    files,
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`booking mirror: manifest written for ${commit}`)
}

const [mode, arg] = process.argv.slice(2)
if (mode === 'sync') sync(arg)
else if (mode === 'check') check()
else { console.error('usage: sync-booking.mjs <sync [source-repo]|check>'); process.exit(1) }
