"use client"

import { useEffect, useState } from "react"
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder
} from "../api/folder.api"

type Folder = {
  _id: string
  name: string
  parentId: string | null
}

type TreeFolder = Folder & { children: TreeFolder[] }

const buildTree = (folders: Folder[]) => {
  const map = new Map<string, TreeFolder>()
  const roots: TreeFolder[] = []

  folders.forEach(f => map.set(f._id, { ...f, children: [] }))

  folders.forEach(f => {
    const node = map.get(f._id)!
    if (f.parentId) map.get(f.parentId)?.children.push(node)
    else roots.push(node)
  })

  return roots
}

export default function FolderTree({
  onSelect
}: {
  onSelect: (id: string) => void
}) {
  const [folders, setFolders] = useState<TreeFolder[]>([])

  useEffect(() => {
    let active = true

    ;(async () => {
      const data = await getFolders()
      if (active) setFolders(buildTree(data))
    })()

    return () => {
      active = false
    }
  }, [])

  const reload = async () => {
    const data = await getFolders()
    setFolders(buildTree(data))
  }

  const renderFolder = (folder: TreeFolder) => (
    <div key={folder._id} className="ml-3">
      <div className="flex items-center gap-2">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => onSelect(folder._id)}
        >
          {folder.name}
        </span>

        <button
          className="text-xs text-blue-600"
          onClick={async () => {
            const name = prompt("Rename folder", folder.name)
            if (!name) return
            await updateFolder(folder._id, { name })
            reload()
          }}
        >
          rename
        </button>

        <button
          className="text-xs text-red-600"
          onClick={async () => {
            await deleteFolder(folder._id)
            reload()
          }}
        >
          delete
        </button>
      </div>

      {folder.children.map(renderFolder)}
    </div>
  )

  return (
    <div className="p-2">
      <button
        className="mb-2 text-sm text-green-600"
        onClick={async () => {
          const name = prompt("Folder name")
          if (!name) return
          await createFolder({ name })
          reload()
        }}
      >
        + New Folder
      </button>

      {folders.map(renderFolder)}
    </div>
  )
}
