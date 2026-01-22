import axios from "axios";
import type { FileItem } from "../types/file";

export async function fetchFiles(folderId: string) {
  const res = await axios.get<FileItem[]>("http://localhost:3000/api/files", {
    params: { folderId },
  });
  return res.data;
}
export async function deleteFile(id: string) {
  await axios.delete(`http://localhost:3000/api/files/${id}`);
}
