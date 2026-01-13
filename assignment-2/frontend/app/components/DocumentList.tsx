"use client"

import { useEffect, useState } from "react"
import {
  getDocumentsByFolder,
  createDocument,
  updateDocument,
  deleteDocument
} from "../api/document.api"

type Document = {
  _id: string
  title: string
  folderId: string
}

export default function DocumentList({
  folderId,
  onSelect,
  refreshKey,
  onDeleted
}: {
  refreshKey: number
onDeleted: () => void
  folderId: string
  onSelect: (id: string, name: string) => void
}) {
  const [documents, setDocuments] = useState<Document[]>([])
 


  useEffect(() => {
    let active = true;
    (async () => {
      const data = await getDocumentsByFolder(folderId)
      if (active) setDocuments(data)
    })()

    return () => {
      active = false
    }
  }, [folderId, refreshKey])

  const reload = async () => {
    const data = await getDocumentsByFolder(folderId)
    setDocuments(data)
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Documents</h2>

        <button
          className="text-sm text-green-600"
          onClick={async () => {
            const title = prompt("Document title")
            if (!title) return
            await createDocument({ title, folderId })
            reload()
          }}
        >
          + New
        </button>
      </div>

      <ul className="space-y-1">
        {documents.map(doc => (
          <li
            key={doc._id}
            className="flex items-center justify-between rounded px-2 py-1 hover:bg-gray-100"
          >
            <span
              className="cursor-pointer text-sm"
              onClick={() => onSelect(doc._id, doc.title)}
            >
              {doc.title}
            </span>

            <div className="flex gap-2">
              <button
                className="text-xs text-blue-600"
                onClick={async () => {
                  const title = prompt("Rename document", doc.title)
                  if (!title) return
                  await updateDocument(doc._id, { title })
                  reload()
                }}
              >
                rename
              </button>

              <button
                className="text-xs text-red-600"
                onClick={async () => {
                  await deleteDocument(doc._id)
                  onDeleted()
                  reload()
                }}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
