"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import type { JSONContent, Editor as TiptapEditor } from "@tiptap/react";

export default function RichTextEditor({
  value,
  onChange,
  readOnly,
}: {
  value: JSONContent | null;
  onChange: (v: JSONContent) => void;
  readOnly: boolean;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor || !value) return;
    editor.commands.setContent(value);
  }, [value, editor]);

  useEffect(() => {
  if (!editor) return;
  editor.setEditable(!readOnly);
}, [readOnly, editor]);


  if (!editor) return null;

  return (
    <div className="flex flex-col h-full rounded border bg-white">
      {!readOnly && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}


function Toolbar({ editor }: { editor: TiptapEditor }) {
  return (
    <div className="flex flex-wrap gap-1 border-b bg-gray-50 p-2 text-sm">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btn(editor.isActive("bold"))}
      >
        Bold
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btn(editor.isActive("italic"))}
      >
        Italic
      </button>
   
    </div>
  );
}

function btn(active: boolean) {
  return `rounded px-2 py-1 ${
    active ? "bg-blue-600 text-white" : "bg-white border"
  }`;
}
