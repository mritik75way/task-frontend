import api from "../../services/api";
import type { FileItem } from "./upload.types";

export async function fetchFiles(folderId: string): Promise<FileItem[]> {
  const res = await api.get<FileItem[]>("/files", {
    params: { folderId },
  });
  return res.data;
}

export async function deleteFile(id: string): Promise<void> {
  await api.delete(`/files/${id}`);
}

export async function fetchAllFiles(): Promise<FileItem[]> {
  const res = await api.get<FileItem[]>("/files/all");
  return res.data;
}
