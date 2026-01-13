"use client";

import { useEffect, useState } from "react";
import { getVersions } from "../api/version.api";

type Version = {
  version: number;
  createdAt: string;
};

export default function VersionList({
  documentId,
  refreshKey,
  onCompare,
  onView,
}: {
  documentId: string;
  refreshKey: number;
  onCompare: (a: number | null, b: number) => void;
  onView: (version: number | null) => void;
}) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getVersions(documentId);
      console.log(data)
      setVersions(data);
      setSelected([]);
    })();
  }, [documentId, refreshKey]);

  const toggle = (v: number) => {
    setSelected((prev) =>
      prev.includes(v)
        ? prev.filter((x) => x !== v)
        : prev.length < 2
        ? [...prev, v]
        : prev
    );
  };

  return (
    <div className="w-56 border-l p-2">
      <div className="mb-2 text-sm font-semibold text-gray-600">Versions</div>

      <ul className="space-y-1">
        <li
          className="cursor-pointer text-sm text-blue-600"
          onClick={() => {
            setSelected([]);
            onView(null);
          }}
        >
          Latest
        </li>

        {versions.map((v) => (
         <li
  key={v.version}
  className="flex items-center justify-between text-sm"
>
  <span
    className="cursor-pointer hover:underline"
    onClick={() => {
      setSelected([]);
      onView(v.version);
    }}
  >
    v{v.version}
  </span>

  <div className="flex items-center gap-2">
    <button
      className="text-xs text-blue-600 hover:underline"
      onClick={() => onCompare(null, v.version)}
    >
      Compare
    </button>

    <input
      type="checkbox"
      checked={selected.includes(v.version)}
      onChange={() => toggle(v.version)}
    />
  </div>
</li>

        ))}
      </ul>

      {selected.length === 2 && (
        <button
          onClick={() => onCompare(selected[0], selected[1])}
          className="mt-3 w-full rounded bg-gray-800 px-3 py-1 text-sm text-white"
        >
          Compare
        </button>
      )}
    </div>
  );
}
