/**
 * IndexedDB 本地案例库（纯浏览器，无后台）。
 * 库：gear-lab，对象仓：cases，keyPath=id，索引 by-updatedAt。
 */
import type { CaseFile } from '../io/caseFormat'

const DB_NAME = 'gear-lab'
const STORE = 'cases'
const VERSION = 1

let dbPromise: Promise<IDBDatabase> | null = null

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id' })
          store.createIndex('updatedAt', 'updatedAt', { unique: false })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }
  return dbPromise
}

function tx<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode)
        const req = fn(t.objectStore(STORE))
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      }),
  )
}

export async function saveCase(rec: { id?: string; file: CaseFile }): Promise<string> {
  const id = rec.id ?? crypto.randomUUID()
  const stored = {
    id,
    updatedAt: Date.now(),
    file: rec.file,
  }
  await tx('readwrite', (s) => s.put(stored))
  return id
}

export interface StoredCase {
  id: string
  updatedAt: number
  file: CaseFile
}

export async function listCases(): Promise<StoredCase[]> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, 'readonly')
    const req = t.objectStore(STORE).getAll()
    req.onsuccess = () => {
      const all = (req.result as StoredCase[]).sort((a, b) => b.updatedAt - a.updatedAt)
      resolve(all)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function deleteCase(id: string): Promise<void> {
  await tx('readwrite', (s) => s.delete(id))
}
