import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FolderGrid from "../components/FolderGrid";
import FileList from "../components/FileList";

import { startUpload } from "../features/uploads/uploadManager";
import { type FileItem } from "../types/file";
import DragDropZone from "../components/DragAndDropZone";
import { deleteFile, fetchFiles } from "../services/files";


const demoFolders = [
  { id: "root", name: "My Drive" },
  { id: "docs", name: "Documents" },
  { id: "images", name: "Images" },
  { id: "videos", name: "Videos" },
];

function FolderPage() {
  const { folderId = "root" } = useParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
async function handleDelete(id: string) {
  await deleteFile(id);
  setFiles(files => files.filter(f => f.id !== id));
}

  const currentFolder =
    demoFolders.find((f) => f.id === folderId)?.name || "My Drive";

  useEffect(() => {
    fetchFiles(folderId).then(setFiles);
  }, [folderId]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    Array.from(e.target.files).forEach((file) => startUpload(file, folderId));

    e.target.value = "";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title={currentFolder}
        onUploadClick={() => inputRef.current?.click()}
      />

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <DragDropZone
        onFiles={(files) =>
          Array.from(files).forEach((file) => startUpload(file, folderId))
        }
      >
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
          <FolderGrid folders={demoFolders} />
          <FileList files={files} onDelete={handleDelete} />
        </div>
      </DragDropZone>
    </div>
  );
}

export default FolderPage;
