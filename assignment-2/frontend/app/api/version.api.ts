import { JSONContent } from "@tiptap/react"

const BASE_URL = "http://localhost:3000/api"

export const getLatestVersion = async (documentId: string) => {
  const res = await fetch(`${BASE_URL}/versions/${documentId}/latest`)
  return res.json()
}

export const saveVersion = async (
  documentId: string,
  content: JSONContent | null
) => {
  const res = await fetch(
    `${BASE_URL}/versions/${documentId}/save`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    }
  )

  return res.json()
}

export const getVersions = async (documentId: string) => {
  const res = await fetch(
    `${BASE_URL}/versions/${documentId}/versions`
  )
  return res.json()
}

export const getVersionByNumber = async (
  documentId: string,
  version: number
) => {
  const res = await fetch(
    `${BASE_URL}/versions/${documentId}/versions/${version}`
  )
  return res.json()
}

export const rollbackVersion = async (
  documentId: string,
  version: number
) => {
  const res = await fetch(
    `${BASE_URL}/versions/${documentId}/rollback/${version}`,
    { method: "POST" }
  )
  return res.json()
}

