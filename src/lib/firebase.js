// Firebase initialisation for Bokgoni Tech.
//
// Configuration is read from Vite environment variables (see .env.example).
// Locally: create a `.env.local` file with your real values (git-ignored).
// On Netlify/hosting: set the same VITE_FIREBASE_* variables in the site's
// environment settings, then redeploy.

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Flag so the UI can show a friendly "not configured yet" message instead of
// crashing while Firebase keys are missing (e.g. env vars not set on the host).
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

// Only initialise Firebase when we actually have config. Initialising with
// undefined values can throw at import time and blank the whole app — guarding
// here means the site always renders, just without live data.
let app = null
let auth = null
let db = null
let storage = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (err) {
    console.error('Firebase failed to initialise:', err)
  }
} else {
  console.warn(
    'Firebase is not configured. Set the VITE_FIREBASE_* environment variables ' +
      '(see .env.example) — locally in .env.local, or in your host\'s environment settings.',
  )
}

export { auth, db, storage }
export default app
