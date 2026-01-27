import { type ReactNode, useRef, useState } from "react";

function DragDropZone({
  onFiles,
  children,
}: {
  onFiles: (files: FileList) => void;
  children: ReactNode;
}) {
  const [active, setActive] = useState(false);
  const counter = useRef(0);

  function prevent(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragEnter(e: React.DragEvent) {
    prevent(e);
    counter.current += 1;
    setActive(true);
  }

  function onDragLeave(e: React.DragEvent) {
    prevent(e);
    counter.current -= 1;
    if (counter.current === 0) {
      setActive(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    prevent(e);
    counter.current = 0;
    setActive(false);
    if (e.dataTransfer.files.length) {
      onFiles(e.dataTransfer.files);
    }
  }

  return (
    <div
      onDragEnter={onDragEnter}
      onDragOver={prevent}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="relative"
    >
      {children}

      {active && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl border-2 border-dashed border-blue-500 bg-blue-500/10 pointer-events-none">
          <div className="text-blue-600 font-medium">Drop files to upload</div>
        </div>
      )}
    </div>
  );
}

export default DragDropZone;
