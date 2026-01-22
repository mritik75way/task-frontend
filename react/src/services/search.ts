import axios from "axios";
import {type FileItem } from "../types/file";

export async function fetchAllFiles() {
  const res = await axios.get<FileItem[]>("http://localhost:3000/api/files/all");
  return res.data;
}
