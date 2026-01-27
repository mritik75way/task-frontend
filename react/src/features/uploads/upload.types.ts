export interface Folder {
  id: string;
  name: string;
}
export interface Option {
  label: string;
  value: string;
  folderId: string;
}
export interface FileItem {
  id: string;
  originalName: string;
  storedName: string;
  folderId: string;
}
export interface UploadItem {
  id: string;
  fileName: string;
  progress: number;
  status: "uploading" | "completed" | "error";
}
export interface UploadState {
  items: UploadItem[];
  visible: boolean;
}