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

/* ----------------------------- Activity Log ------------------------------ */
// collection: activityLog
//   { title, category, date, deviceType, problem, before, work, after,
//     testing, status, customerVisibility, isPublic, imagesBefore[], imagesAfter[], createdAt }

const COL_ACTIVITY = 'activityLog'

export async function getPublicActivity({ category } = {}) {
  if (!isFirebaseConfigured) return []
  const col = collection(db, COL_ACTIVITY)
  const clauses = [where('isPublic', '==', true)]
  if (category) clauses.push(where('category', '==', category))
  // Order by date desc. (Requires a composite index when filtering by category —
  // Firestore shows a one-click link to create it the first time.)
  const q = query(col, ...clauses, orderBy('date', 'desc'), limit(50))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAllActivity() {
  if (!isFirebaseConfigured) return []
  const q = query(collection(db, COL_ACTIVITY), orderBy('createdAt', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function addActivity(data, { beforeFiles = [], afterFiles = [] } = {}) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured.')

  const imagesBefore = await uploadImages(beforeFiles, 'activity/before')
  const imagesAfter = await uploadImages(afterFiles, 'activity/after')

  return addDoc(collection(db, COL_ACTIVITY), {
    ...data,
    imagesBefore,
    imagesAfter,
    createdAt: serverTimestamp(),
  })
}

/* --------------------------- Service Requests ---------------------------- */
// collection: requests (public can create; staff read)

const COL_REQUESTS = 'requests'

export async function submitRequest(data, { photoFiles = [] } = {}) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured.')
  const photos = await uploadImages(photoFiles, 'requests')
  return addDoc(collection(db, COL_REQUESTS), {
    ...data,
    photos,
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

/* ------------------------------ Repair Jobs ------------------------------ */
// collection: jobs (internal repair records — never public)

const COL_JOBS = 'jobs'

export async function getJobs() {
  if (!isFirebaseConfigured) return []
  const q = query(collection(db, COL_JOBS), orderBy('createdAt', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function addJob(data) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured.')
  return addDoc(collection(db, COL_JOBS), { ...data, createdAt: serverTimestamp() })
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
