# Bokgoni Tech — Website

The public site for **Bokgoni Endpoint Management** — a platform for looking
after Windows computers you are responsible for but are not sitting in front of.

The product is three pieces, in three other repositories:

| Piece | Repository | Built with |
| --- | --- | --- |
| Agent (on each machine) | `BokgoniTech_Agent` | Rust |
| Backend (on your server) | `BokgoniTech_Backend` | Rust, PostgreSQL, Redis |
| Dashboard (the operator console) | `BokgoniTech_Dashboard` | Next.js |

**This repository is none of them.** It is the marketing site that explains the
product, plus a small private staff portal. It does not talk to the platform's
API — it has no access to any customer's fleet data.

## What is on the site

**Public pages**

| Route | What it is |
| --- | --- |
| `/` | The product: what a client gets, the five questions, the three pieces, the design rule |
| `/product` | What it does, capability by capability |
| `/how-it-works` | The three pieces, how a command travels, why long jobs are different, the stack |
| `/who-its-for` | The customer, what they are buying, and who it is **not** for |
| `/why-different` | The one design rule — "not knowing something is different from knowing it is fine" |
| `/changelog` | Published record of what shipped |
| `/pilot` | Request a pilot (there is no self-service signup — see below) |
| `/about`, `/contact` | Company and contact details |

**Private staff portal** (`/portal`, Firebase Auth)

| Route | What it is |
| --- | --- |
| `/portal` | Snapshot: new pilot requests, stages built, known gaps |
| `/portal/roadmap` | The six build stages and their real state — the internal record |
| `/portal/requests` | Incoming pilot enquiries and their contact details |
| `/portal/changelog/new` | Publish a changelog entry |

## Where the copy comes from

Nearly all site copy lives in two files:

- **`src/lib/siteConfig.js`** — everything on the public site.
- **`src/lib/stages.js`** — the six build stages and known gaps, for the portal.

Both are derived from the product docs in
**`BokgoniTech_Agent/docs/product/`**. That is the source of truth. If a claim
changes there, change it in `siteConfig.js` — not in a page component.

### Build state is internal

There used to be a public `/status` page listing what was built, what was not,
and the three known gaps. It is gone, and `/status` now redirects to `/product`.

The information still exists and is still kept true — in **`src/lib/stages.js`**,
behind the staff portal at `/portal/roadmap`, which is where a roadmap belongs.
A visitor deciding whether to talk to us needs to know what the product does for
them, not which capability landed in which sprint.

What survives into the public site is the *discipline*, stated as a benefit
rather than as a confession:

- `/why-different` explains that a check that passed and a check that never ran
  are different facts, and why that is worth having.
- An empty changelog says *nothing has been published* — not *nothing has been
  built*.
- The site never offers a download, because there is no hosted installer. It
  offers a pilot request, which is what actually happens.

If you add a page, keep to that. Claiming something works before it does is the
one thing this product is built not to do.

## Tech stack

- **React 19 + Vite** (JavaScript)
- **React Router 7** for routing
- **Tailwind CSS 3** — dark-blue / black brand theme
- **Firebase** — Authentication (staff login), Firestore (changelog + pilot
  requests), Storage (changelog screenshots), Hosting (deploy)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

The site runs without Firebase — the changelog and the pilot form show a
"needs Firebase" notice until you connect it. Every other page is static copy
and works immediately.

## 👉 Full setup (Firebase, staff login, deploy)

See **[SETUP.md](./SETUP.md)** — a complete, step-by-step guide.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the linter (oxlint) |

## Project structure

```
src/
  components/      Navbar, Footer, Icon, StateBadge, auth guard, etc.
  context/         AuthContext (login state + staff role)
  layouts/         PublicLayout, PortalLayout
  lib/             firebase.js, db.js (data access), siteConfig.js, stages.js
  pages/           Public pages
  pages/portal/    Private portal pages
firestore.rules    Database security rules
storage.rules      File storage security rules
firebase.json      Hosting + rules config
SETUP.md           Step-by-step setup guide
```

## Firestore collections

| Collection | Who can read | Who can write |
| --- | --- | --- |
| `activityLog` | Public, where `isPublic == true` | Staff only |
| `requests` | Staff only | Anyone may **create**, nobody else may read |
| `staff` | The signed-in user's own record | Nobody, from the client |

`activityLog` holds the changelog. The name is left over from the repair-era
activity log — renaming the collection would orphan anything already written, so
only its meaning and fields changed (`category` → `area`, plus `summary`,
`detail`, `why`, `version`, `state`).

## History

This site was previously a services-business site — device repair, IT support,
cybersecurity, software development, innovation — with a five-phase business
roadmap in the portal and a repair-intake form. When the company's work became
the endpoint management platform, the site was rewritten to match.

The retired routes (`/services`, `/services/:slug`, `/request`, `/activity`,
`/portal/jobs`) redirect rather than 404, so old links still land somewhere
sensible. The repair job-log page and its `jobs` collection were removed.
