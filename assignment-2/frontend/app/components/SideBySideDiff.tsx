"use client";

import { diff } from "diff-match-patch-es";


export default function SideBySideDiff({
  leftText,
  rightText,
  leftLabel,
  rightLabel,
}: {
  leftText: string;
  rightText: string;
  leftLabel: string;
  rightLabel: string;
}) {
  const diffs = diff(leftText, rightText, { diffTimeout: 1 });

  return (
    <div className="flex h-full flex-col">
      <div className="mb-1 grid grid-cols-2 text-xs text-gray-500">
        <div>{leftLabel}</div>
        <div>{rightLabel}</div>
      </div>

      <div className="grid h-full grid-cols-2 gap-2 text-sm">
        <div className="overflow-auto rounded border bg-white p-3 whitespace-pre-wrap text-gray-900">
          {diffs.map(([type, text], i) => {
            if (type === 1) return null;

            if (type === -1) {
              return (
                <span key={`l-${i}`} className="bg-red-200 line-through">
                  {text}
                </span>
              );
            }

            return <span key={`l-${i}`}>{text}</span>;
          })}
        </div>

        <div className="overflow-auto rounded border bg-white p-3 whitespace-pre-wrap text-gray-900">
          {diffs.map(([type, text], i) => {
            if (type === -1) return null;

            if (type === 1) {
              return (
                <span key={`r-${i}`} className="bg-green-200">
                  {text}
                </span>
              );
            }

            return <span key={`r-${i}`}>{text}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
