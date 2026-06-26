# Bokgoni Tech

Website for Bokgoni Tech — a technology solutions business (device repair, IT
support, cybersecurity, software development, and innovation/automation).

It has **two sides**:

- **Public website** — explains the business and turns visitors into repair / IT
  enquiries (Home, About, Services + 5 detail pages, Activity Log, Request a
  Service, Contact).
- **Private staff portal** (`/portal`) — the internal operating manual and
  records: dashboard, service requests, repair job logs, a content-management
  form for the activity log, and the Phase 1–5 business roadmap.

## Tech stack

- **React 19 + Vite** (JavaScript)
- **React Router 7** for routing
- **Tailwind CSS 3** — dark-blue / black brand theme
- **Firebase** — Authentication (staff login), Firestore (database), Storage
  (before/after photos), Hosting (deploy)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

The site runs without Firebase — data features show a "needs Firebase" notice
until you connect it.

## 👉 Full setup (Firebase, staff login, deploy)

See **[SETUP.md](./SETUP.md)** — a complete, beginner-friendly, step-by-step guide.

## Scripts

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the local dev server            |
| `npm run build`   | Production build into `dist/`         |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`    | Run the linter (oxlint)               |

## Project structure

```
src/
  components/      Navbar, Footer, Icon, WhatsApp button, auth guard, etc.
  context/         AuthContext (login state + staff role)
  layouts/         PublicLayout, PortalLayout
  lib/             firebase.js, db.js (data access), siteConfig.js, phases.js
  pages/           Public pages
  pages/portal/    Private portal pages
firestore.rules    Database security rules (protect customer data)
storage.rules      File storage security rules
firebase.json      Hosting + rules config
SETUP.md           Step-by-step setup guide
```

## Editing content

Most site copy lives in **`src/lib/siteConfig.js`** (services, contact details,
form options) and **`src/lib/phases.js`** (the internal roadmap). You rarely need
to touch the page components to change wording.

## Privacy

The activity log is designed to **prove work without exposing customers**.
Public entries should never contain names, phone numbers, IMEI/serial numbers or
other private identifiers — use "Private customer" and a device category instead.
Security rules enforce that the public can only read entries flagged public and
can only *submit* (never read) service requests.
