"use client";

import { useState } from "react";
import FolderTree from "./components/FolderTree";
import DocumentList from "./components/DocumentList";
import Editor from "./components/Editor";
import VersionList from "./components/VersionList";
import DiffContainer from "./components/DiffContainer";

export default function Home() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<{
  id: string
  name: string
} | null>(null)

  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [versionRefreshKey, setVersionRefreshKey] = useState(0);
  const [documentRefreshKey, setDocumentRefreshKey] = useState(0);
  const [compare, setCompare] = useState<[number | null, number | null] | null>(null);


  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-2">
        <FolderTree
          onSelect={(id) => {
            setSelectedFolder(id);
            setSelectedDocument(null);
          }}
        />
      </aside>

      <main className="flex-1 p-6">
        {selectedFolder ? (
          <DocumentList
            folderId={selectedFolder}
            refreshKey={documentRefreshKey}
            onSelect={(id,name) => {
              setSelectedDocument({id,name});
              setSelectedVersion(null);
            }}
            onDeleted={() => {
              setSelectedDocument(null);
              setSelectedVersion(null);
              setCompare(null);
              setDocumentRefreshKey((k) => k + 1);
            }}
          />
        ) : (
          <div className="text-gray-400">Select a folder</div>
        )}

        {selectedDocument && (
          <div className="mt-4 flex h-150 border">
            <div className="flex-1 p-2">
              {compare ? (
                <DiffContainer
                  documentId={selectedDocument.id}
                  a={compare[0]!}
                  b={compare[1]!}
                  onClose={() => {
                    setCompare(null);
                    setSelectedVersion(null);
                  }}
                />
              ) : (
                <Editor
                  documentId={selectedDocument.id}
                  documentName={selectedDocument.name}
                  selectedVersion={selectedVersion}
                  onSaved={() => setVersionRefreshKey((v) => v + 1)}
                />
              )}
            </div>

            <VersionList
              documentId={selectedDocument.id}
              refreshKey={versionRefreshKey}
              onView={(v) => {
                setCompare(null);
                setSelectedVersion(v);
              }}
              onCompare={(a, b) => {
                setCompare([a, b]);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
