# Bokgoni Tech — Setup Guide

This is the step-by-step guide to get the website running locally and live.
It assumes no prior Firebase experience. Follow it top to bottom.

> **Where you are now:** the whole website is built. It runs right now without
> Firebase — you'll just see friendly "needs Firebase" notices on the parts that
> store data (pilot form, changelog, portal). Connecting Firebase turns
> those on.

---

## 1. Run the site locally (2 minutes)

```bash
npm install      # already done, but safe to re-run
npm run dev
```

Open the URL it prints (usually http://localhost:5173). You can click through the
whole public site immediately. The portal/login and forms will show a yellow
"needs Firebase" notice until you complete step 2.

---

## 2. Create your Firebase project (10 minutes)

Firebase is Google's free backend. It gives us the database, file storage,
staff login and (optionally) hosting.

1. Go to **https://console.firebase.google.com** and sign in with a Google account.
2. Click **Add project** → name it `bokgoni-tech` → continue (you can disable
   Google Analytics, it's not needed) → **Create project**.
3. On the project home, click the **`</>` (Web)** icon to "Add an app to get started".
   - App nickname: `Bokgoni Tech Web`
   - **Do not** tick "Firebase Hosting" here (we'll do hosting later).
   - Click **Register app**.
4. Firebase shows you a `firebaseConfig` block. **Keep this tab open** — you need
   these values in the next step.

### Turn on the three services

In the left sidebar of the Firebase console:

- **Build → Authentication** → *Get started* → **Sign-in method** tab →
  enable **Email/Password** → Save.
- **Build → Firestore Database** → *Create database* → Start in **production mode**
  → pick a location (e.g. `europe-west`) → Enable.
- **Build → Storage** → *Get started* → Start in **production mode** → Done.

---

## 3. Connect the website to Firebase (3 minutes)

1. In the project folder, copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste the matching values from the `firebaseConfig`
   block you saw in step 2.4:

   | .env.local key                        | firebaseConfig field   |
   | ------------------------------------- | ---------------------- |
   | `VITE_FIREBASE_API_KEY`               | `apiKey`               |
   | `VITE_FIREBASE_AUTH_DOMAIN`           | `authDomain`           |
   | `VITE_FIREBASE_PROJECT_ID`            | `projectId`            |
   | `VITE_FIREBASE_STORAGE_BUCKET`        | `storageBucket`        |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID`   | `messagingSenderId`    |
   | `VITE_FIREBASE_APP_ID`                | `appId`                |

3. Also set your real public contact details in the same file:
   `VITE_CONTACT_WHATSAPP` (digits only, e.g. `27821234567`), `VITE_CONTACT_EMAIL`,
   `VITE_CONTACT_PHONE`, `VITE_CONTACT_LOCATION`.

4. **Stop and restart** `npm run dev` (env changes only load on restart).

The yellow notices should now be gone.

---

## 4. Deploy the security rules (important — 5 minutes)

The repo includes rules that protect customer data (`firestore.rules`,
`storage.rules`). Deploy them so the public can't read private records.

1. Install the Firebase CLI once (globally):

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. Tell the CLI which project to use — edit `.firebaserc` and replace
   `your-firebase-project-id` with your real **Project ID** (from step 2.4).

3. Deploy the rules and indexes:

   ```bash
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```

> Until you do this, Firestore in production mode **denies all access**, so the
> site's data features won't work. This step is required.

---

## 5. Create your first staff login (5 minutes)

The portal is staff-only. You create staff accounts in two parts: the login
(Authentication) and the staff record (Firestore) that grants portal access.

1. **Firebase console → Authentication → Users → Add user.** Enter your email
   and a strong password. After it's created, **copy the User UID** shown in
   the table.

2. **Firebase console → Firestore Database → Start collection.**
   - Collection ID: `staff`
   - Document ID: **paste the User UID** from step 1 (must match exactly).
   - Add these fields:

     | Field  | Type   | Value             |
     | ------ | ------ | ----------------- |
     | `name` | string | Your full name    |
     | `role` | string | `admin`           |

   - Save.

3. Go to `/portal/login` on the site, sign in with that email/password, and you're
   in. (Only users with a matching `staff/{uid}` document can use the portal — the
   security rules enforce this.)

To add more staff later, repeat this step. Use `role: staff` for non-admins.

---

## 6. Use it

- **Public:** Home, What it does, How it works, Who it's for, Why different,
  Status, Changelog, Request a pilot, About, Contact. Only the changelog and the
  pilot form need Firebase; every other page is static copy.
- **Portal (`/portal`):**
  - **Dashboard** — new pilot requests, stages built, known gaps.
  - **Pilot Requests** — every form submission, with contact details.
  - **Add Changelog Entry** — publish what shipped to the public changelog
    (toggle Public/Private). **Screenshots are public — check them for customer
    hostnames, usernames and IP addresses first.**
  - **Build State** — the six build stages, their real state, and the three
    known gaps. Keep it true; a roadmap that says "done" when it means "mostly"
    is the failure this product exists to avoid.

---

## 7. Go live with Firebase Hosting (when ready)

```bash
npm run build
firebase deploy --only hosting
```

Firebase gives you a free `*.web.app` URL. To use your own domain
(e.g. `bokgonitech.co.za`): Firebase console → Hosting → Add custom domain, and
follow the DNS instructions.

> Deploy rules + hosting together any time with: `firebase deploy`

---

## Data model (for reference)

| Collection    | Who can read              | Who can write            | Holds                          |
| ------------- | ------------------------- | ------------------------ | ------------------------------ |
| `activityLog` | public (if `isPublic`)    | staff                    | the changelog                  |
| `requests`    | staff only                | **anyone can create**    | pilot enquiries from the form  |
| `staff`       | the user (their own doc)  | console only             | name + role per staff member   |

`activityLog` holds the changelog. The collection name is left over from the
repair-era activity log — renaming it would orphan anything already written, so
only its meaning and fields changed (`category` → `area`, plus `summary`,
`detail`, `why`, `version`, `state`).

Storage folder: `changelog/` (public read, staff write). The old `activity/` and
`requests/` folders are readable but closed to new writes.

---

## Troubleshooting

- **"needs Firebase" notices won't go away** → `.env.local` values are missing/wrong,
  or you didn't restart `npm run dev`.
- **"Missing or insufficient permissions"** → you haven't deployed the rules (step 4),
  or your `staff/{uid}` document ID doesn't exactly match your Auth UID.
- **Changelog filter shows nothing / console asks for an index** → Firestore needs
  a composite index. Either run `firebase deploy --only firestore:indexes` or click
  the one-click link in the browser console error.
- **Can't log in** → confirm Email/Password is enabled in Authentication, and that a
  `staff/{your-uid}` document exists.
```
