"use client";

import { useEffect, useState } from "react";
import { getVersionByNumber, getLatestVersion } from "../api/version.api";
import SideBySideDiff from "./SideBySideDiff";
import { richTextToPlainText } from "../utilities/richTextToPlainText";

export default function DiffContainer({
  documentId,
  a,
  b,
  onClose,
}: {
  documentId: string;
  a: number | null;
  b: number | null;
  onClose: () => void;
}) {
  const [aText, setAText] = useState("");
  const [bText, setBText] = useState("");

  useEffect(() => {
    (async () => {
      const v1 =
        a === null
          ? await getLatestVersion(documentId)
          : await getVersionByNumber(documentId, a);

      const v2 =
        b === null
          ? await getLatestVersion(documentId)
          : await getVersionByNumber(documentId, b);

      setAText(richTextToPlainText(v1?.content));
      setBText(richTextToPlainText(v2?.content));
    })();
  }, [documentId, a, b]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
        <span>
          Comparing {a === null ? "Latest" : `v${a}`} ↔{" "}
          {b === null ? "Latest" : `v${b}`}
        </span>

        <button
          onClick={onClose}
          className="rounded bg-blue-600 px-3 py-1 text-white"
        >
          Back to editor
        </button>
      </div>

      <div className="flex-1">
        <SideBySideDiff
          leftText={aText}
          rightText={bText}
          leftLabel={a === null ? "Latest" : `Version ${a}`}
          rightLabel={b === null ? "Latest" : `Version ${b}`}
        />
      </div>
    </div>
  );
}
