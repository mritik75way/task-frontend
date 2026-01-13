const BASE_URL = "http://localhost:3000/api"

export const getDocumentsByFolder = async (folderId: string) => {
  const res = await fetch(`${BASE_URL}/documents/folder/${folderId}`)
  return res.json()
}

export const createDocument = async (data: {
  title: string
  folderId: string
}) => {
  const res = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const updateDocument = async (
  id: string,
  data: { title?: string; folderId?: string }
) => {
  const res = await fetch(`${BASE_URL}/documents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteDocument = async (id: string) => {
  await fetch(`${BASE_URL}/documents/${id}`, {
    method: "DELETE"
  })
}
