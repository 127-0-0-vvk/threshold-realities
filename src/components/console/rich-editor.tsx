"use client";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useRef, useState } from "react";

/**
 * Article editor, in the Medium mould.
 *
 * Two floating surfaces rather than one fixed toolbar:
 *   - a bubble menu that appears over selected text, for formatting;
 *   - a "+" on every empty line, for inserting images and dividers.
 *
 * A compact fixed bar stays at the top for the things that are awkward to
 * reach by selection — undo, redo, and a visible reminder of what exists.
 *
 * Output is HTML, sanitised server-side on render. See `renderBody`.
 */
export function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https", "mailto"],
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading"
            ? "Heading"
            : "Tell the story\u2026",
        showOnlyWhenEditable: true,
        includeChildren: true,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "article-body focus:outline-none min-h-[24rem]" },
    },
  });

  const insertImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploading(true);
      setError(null);

      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/console/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      setUploading(false);

      if (!res.ok) {
        setError(data.error ?? "Image upload failed.");
        return;
      }
      editor.chain().focus().setImage({ src: data.url, alt: "" }).run();
    },
    [editor],
  );

  if (!editor) {
    return (
      <div className="mono border border-[var(--rule)] p-6 text-xs text-[var(--text-faint)]">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="border border-[var(--rule)]">
      <MiniBar editor={editor} uploading={uploading} />

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void insertImage(f);
          e.target.value = "";
        }}
      />

      {/* Formatting, on selection */}
      <BubbleMenu
        editor={editor}
        options={{ placement: "top", offset: 10 }}
        className="editor-bubble"
      >
        <Btn
          on={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        >
          <b>B</b>
        </Btn>
        <Btn
          on={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        >
          <i>i</i>
        </Btn>
        <Btn
          on={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Underline"
        >
          <u>U</u>
        </Btn>
        <Btn
          on={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="Strikethrough"
        >
          <s>S</s>
        </Btn>
        <Btn
          on={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          label="Highlight"
        >
          <span
            className="px-1"
            style={{ background: "var(--color-brand)", color: "#14181c" }}
          >
            H
          </span>
        </Btn>
        <Btn
          on={editor.isActive("link")}
          onClick={() => setLink(editor)}
          label="Link"
        >
          &#128279;
        </Btn>

        <span className="editor-div" aria-hidden />

        <Btn
          on={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="Large heading"
        >
          <span className="text-base font-semibold">T</span>
        </Btn>
        <Btn
          on={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="Small heading"
        >
          <span className="text-[0.6875rem] font-semibold">T</span>
        </Btn>
        <Btn
          on={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Quote"
        >
          &rdquo;
        </Btn>
      </BubbleMenu>

      {/* Insert, on an empty line. A single + in the gutter that opens a
          labelled menu — a row of icons here would sit on top of the text. */}
      <FloatingMenu
        editor={editor}
        options={{ placement: "left-start", offset: 10 }}
        className="editor-floating"
      >
        <InsertMenu
          onImage={() => fileInput.current?.click()}
          onBullets={() => editor.chain().focus().toggleBulletList().run()}
          onNumbers={() => editor.chain().focus().toggleOrderedList().run()}
          onDivider={() => editor.chain().focus().setHorizontalRule().run()}
          uploading={uploading}
        />
      </FloatingMenu>

      <div
        className="max-h-[40rem] overflow-y-auto py-6 pl-14 pr-6 sm:pl-16 sm:pr-10"
        onPaste={(e) => {
          const file = Array.from(e.clipboardData.files).find((f) =>
            f.type.startsWith("image/"),
          );
          if (file) {
            e.preventDefault();
            void insertImage(file);
          }
        }}
        onDrop={(e) => {
          const file = Array.from(e.dataTransfer.files).find((f) =>
            f.type.startsWith("image/"),
          );
          if (file) {
            e.preventDefault();
            void insertImage(file);
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {error ? (
        <p
          className="mono border-t border-[var(--rule)] px-5 py-2.5 text-[0.625rem]"
          style={{ color: "var(--color-critical)" }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function InsertMenu({
  onImage,
  onBullets,
  onNumbers,
  onDivider,
  uploading,
}: {
  onImage: () => void;
  onBullets: () => void;
  onNumbers: () => void;
  onDivider: () => void;
  uploading: boolean;
}) {
  const [open, setOpen] = useState(false);

  const items: { label: string; glyph: string; run: () => void }[] = [
    { label: "Image", glyph: "\u2295", run: onImage },
    { label: "Bulleted list", glyph: "\u2022", run: onBullets },
    { label: "Numbered list", glyph: "1.", run: onNumbers },
    { label: "Divider", glyph: "\u2014", run: onDivider },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((v) => !v)}
        title="Insert"
        aria-label="Insert"
        aria-expanded={open}
        className={`mono flex h-8 w-8 items-center justify-center rounded-full border border-[var(--rule)] bg-[var(--surface-raised)] text-sm transition-transform duration-200 hover:border-[var(--color-watch)] hover:text-[var(--color-watch)] ${
          open ? "rotate-45" : ""
        }`}
      >
        {uploading ? "\u2026" : "+"}
      </button>

      {open ? (
        <div className="absolute left-0 top-10 z-50 w-48 border border-[var(--rule)] bg-[var(--surface-raised)] py-1 shadow-[0_14px_34px_-20px_rgba(20,24,28,0.5)]">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                item.run();
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-[var(--text-dim)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              <span className="mono w-4 text-center text-xs">{item.glyph}</span>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function setLink(editor: Editor) {
  const previous = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("Link URL", previous ?? "https://");
  if (url === null) return;
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
    .run();
}

/** Kept deliberately small — the real work happens in the floating menus. */
function MiniBar({
  editor,
  uploading,
}: {
  editor: Editor;
  uploading: boolean;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-[var(--rule)] bg-[var(--surface)] px-3 py-2">
      <Btn
        on={false}
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
        label="Undo"
      >
        &#8630;
      </Btn>
      <Btn
        on={false}
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
        label="Redo"
      >
        &#8631;
      </Btn>
      <span className="mono ml-auto text-[0.5625rem] leading-relaxed tracking-[0.12em] uppercase text-[var(--text-faint)]">
        {uploading
          ? "Uploading image…"
          : "Select text to format · + on an empty line to insert"}
      </span>
    </div>
  );
}

function Btn({
  children,
  onClick,
  on,
  label,
  disabled = false,
  round = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  on: boolean;
  label: string;
  disabled?: boolean;
  round?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={on}
      className={`mono flex h-8 min-w-8 items-center justify-center px-2 text-xs transition-colors disabled:opacity-30 ${
        round ? "rounded-full" : ""
      } ${
        on
          ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
          : "text-[var(--text-dim)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
      }`}
    >
      {children}
    </button>
  );
}
