import type { JSONContent } from "@tiptap/react";

export function richTextToPlainText(doc: JSONContent | null): string {
  if (!doc) return "";

  let result = "";

  function walk(node: JSONContent) {
    if (node.text) {
      result += node.text;
    }

    if (node.content) {
      node.content.forEach(walk);
    }
  }

  walk(doc);
  return result;
}
