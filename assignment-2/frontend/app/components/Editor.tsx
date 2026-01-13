"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import {
  getLatestVersion,
  getVersionByNumber,
  saveVersion,
  rollbackVersion,
} from "../api/version.api";
import RichTextEditor from "./RichTextEditor";
import type { JSONContent } from "@tiptap/react";
import { richTextToPlainText } from "../utilities/richTextToPlainText";

function renderHighlightedContent(
  text: string,
  query: string,
  matches: number[],
  active: number
): ReactNode {
  if (!query) return text;

  const parts: ReactNode[] = [];
  let last = 0;

  matches.forEach((index, i) => {
    parts.push(text.slice(last, index));
    parts.push(
      <mark
        key={index}
        className={i === active ? "bg-yellow-400" : "bg-yellow-200"}
      >
        {text.slice(index, index + query.length)}
      </mark>
    );
    last = index + query.length;
  });

  parts.push(text.slice(last));
  return parts;
}

export default function Editor({
  documentId,
  selectedVersion,
  onSaved,
  documentName,
}: {
  documentId: string;
  selectedVersion: number | null;
  onSaved: () => void;
  documentName: string;
}) {
  const [content, setContent] = useState<JSONContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [activeMatch, setActiveMatch] = useState(0);

  const readOnly = selectedVersion !== null;

  useEffect(() => {
    let alive = true;

    (async () => {
      if (selectedVersion === null) {
        const latest = await getLatestVersion(documentId);
        if (alive && latest?.content !== undefined) {
          setContent(latest.content);
        }
      } else {
        const version = await getVersionByNumber(documentId, selectedVersion);
        if (alive && version?.content !== undefined) {
          setContent(version.content);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [documentId, selectedVersion]);

  const matches = useMemo(() => {
    if (!search) return [];

    const res: number[] = [];
    const text = richTextToPlainText(content).toLowerCase();
    const q = search.toLowerCase();

    let i = 0;
    while ((i = text.indexOf(q, i)) !== -1) {
      res.push(i);
      i += q.length;
    }

    return res;
  }, [search, content]);

  const plainText = richTextToPlainText(content);
  const safeActive = activeMatch >= matches.length ? 0 : activeMatch;

  const save = async () => {
    if (readOnly) return;
    setSaving(true);
    await saveVersion(documentId, content);
    onSaved();
    setSaving(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">
  {documentName}
  {readOnly && (
    <span className="ml-2 text-gray-400">
      (v{selectedVersion})
    </span>
  )}
</span>


        {!readOnly && (
          <button
            onClick={save}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        )}

        {readOnly && (
          <button
            onClick={async () => {
              await rollbackVersion(documentId, selectedVersion);
              onSaved();
            }}
            className="rounded bg-orange-600 px-3 py-1 text-sm text-white"
          >
            Restore this version
          </button>
        )}
      </div>

      <div className="mb-2 flex items-center gap-2 text-sm">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActiveMatch(0);
          }}
          placeholder="Find in document"
          className="w-48 rounded border px-2 py-1"
        />

        <span className="text-gray-500">
          {matches.length ? `${safeActive + 1}/${matches.length}` : "0"}
        </span>

        <button
          disabled={!matches.length}
          onClick={() =>
            setActiveMatch((v) => (v > 0 ? v - 1 : matches.length - 1))
          }
        >
          ↑
        </button>

        <button
          disabled={!matches.length}
          onClick={() =>
            setActiveMatch((v) => (v < matches.length - 1 ? v + 1 : 0))
          }
        >
          ↓
        </button>
      </div>

      {search ? (
        <div className="flex-1 overflow-auto rounded border bg-white p-3 text-sm text-gray-900 whitespace-pre-wrap">
          {renderHighlightedContent(plainText, search, matches, safeActive)}
        </div>
      ) : (
        <RichTextEditor
          value={content}
          readOnly={readOnly}
          onChange={setContent}
        />
      )}
    </div>
  );
}
