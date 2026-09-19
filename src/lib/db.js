// Data-access helpers for Firestore + Storage.
// Keeping all reads/writes here means pages stay clean and the data shape
// is defined in one place.

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, isFirebaseConfigured } from './firebase'

/* ------------------------------ Changelog -------------------------------- */
// The public build log: what shipped in the platform, and when.
//
// The collection is still named `activityLog` — it was the repair-era activity
// log, and renaming it would orphan anything already written. Only the meaning
// and the fields changed.
//
// shape: { title, area, date, summary, detail, why, state, version,
//          isPublic, images[], createdAt }

const COL_CHANGELOG = 'activityLog'

export async function getPublicChangelog({ area } = {}) {
  if (!isFirebaseConfigured) return []
  const col = collection(db, COL_CHANGELOG)
  const clauses = [where('isPublic', '==', true)]
  if (area) clauses.push(where('area', '==', area))
  // Order by date desc. (Requires a composite index when filtering by area —
  // Firestore shows a one-click link to create it the first time.)
  const q = query(col, ...clauses, orderBy('date', 'desc'), limit(50))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAllChangelog() {
  if (!isFirebaseConfigured) return []
  const q = query(collection(db, COL_CHANGELOG), orderBy('createdAt', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function addChangelogEntry(data, { imageFiles = [] } = {}) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured.')
  const images = await uploadImages(imageFiles, 'changelog')
  return addDoc(collection(db, COL_CHANGELOG), {
    ...data,
    images,
    createdAt: serverTimestamp(),
  })
}

/* ---------------------------- Pilot requests ----------------------------- */
// collection: requests (public can create; staff read)
//
// shape: { organisation, name, role, email, phone, fleetSize, currentTool,
//          needToAnswer, preferredContact, consent, status, createdAt }

const COL_REQUESTS = 'requests'

export async function submitRequest(data) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured.')
  return addDoc(collection(db, COL_REQUESTS), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

export async function getRequests() {
  if (!isFirebaseConfigured) return []
  const q = query(collection(db, COL_REQUESTS), orderBy('createdAt', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/* -------------------------------- Helpers -------------------------------- */
async function uploadImages(files, folder) {
  const urls = []
  for (const file of files) {
    if (!file) continue
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const storageRef = ref(storage, `${folder}/${safeName}`)
    await uploadBytes(storageRef, file)
    urls.push(await getDownloadURL(storageRef))
  }
  return urls
}

// Format a Firestore Timestamp / Date / ISO string as a readable date.
export function formatDate(value) {
  if (!value) return ''
  let d
  if (value instanceof Timestamp) d = value.toDate()
  else if (value?.toDate) d = value.toDate()
  else d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}
