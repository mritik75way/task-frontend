const BASE_URL = "http://localhost:3000/api"

export const getFolders = async () => {
  const res = await fetch(`${BASE_URL}/folders`)
  return res.json()
}

export const createFolder = async (data: {
  name: string
  parentId?: string | null
}) => {
  const res = await fetch(`${BASE_URL}/folders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const updateFolder = async (
  id: string,
  data: { name?: string; parentId?: string | null }
) => {
  const res = await fetch(`${BASE_URL}/folders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteFolder = async (id: string) => {
  await fetch(`${BASE_URL}/folders/${id}`, {
    method: "DELETE"
  })
}
