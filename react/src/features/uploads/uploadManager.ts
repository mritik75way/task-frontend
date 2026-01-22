import axios from "axios";
import { store } from "../../app/store";
import {
  addUpload,
  updateProgress,
  markCompleted,
  markError,
} from "./uploadsSlice";

export function startUpload(file: File, folderId: string) {
  const id = crypto.randomUUID();

  store.dispatch(
    addUpload({
      id,
      fileName: file.name,
      progress: 0,
      status: "uploading",
    })
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderId", folderId);

  axios
    .post("http://localhost:3000/api/uploads", formData, {
      onUploadProgress(e) {
        const total = e.total || 1;
        const percent = Math.round((e.loaded * 100) / total);
        store.dispatch(updateProgress({ id, progress: percent }));
      },
    })
    .then(() => {
      store.dispatch(markCompleted(id));
    })
    .catch(() => {
      store.dispatch(markError(id));
    });
}
