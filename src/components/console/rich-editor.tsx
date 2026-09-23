"use client";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useRef, useState } from "react";

/**
 * Article editor.
 *
 * Writes HTML rather than Markdown, so what the author sees is what publishes.
 * Images are uploaded through the same endpoint as the cover and inserted
 * inline at the cursor, the way they would be in Notion or Word.
 *
 * Output is sanitised server-side on render — see `renderBody` in lib/posts.
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
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https", "mailto"],
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({
        placeholder: "Write the article. Use the toolbar, or paste an image.",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "article-body focus:outline-none min-h-[22rem]",
      },
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
      <Toolbar
        editor={editor}
        onPickImage={() => fileInput.current?.click()}
        uploading={uploading}
      />

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

      <div
        className="max-h-[36rem] overflow-y-auto px-5 py-4"
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

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor;
  onPickImage: () => void;
  uploading: boolean;
}) {
  const setLink = () => {
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
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[var(--rule)] bg-[var(--surface)] p-2">
      <Group>
        <Btn
          on={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        >
          <span className="font-bold">B</span>
        </Btn>
        <Btn
          on={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        >
          <span className="italic">I</span>
        </Btn>
        <Btn
          on={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Underline"
        >
          <span className="underline">U</span>
        </Btn>
        <Btn
          on={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="Strikethrough"
        >
          <span className="line-through">S</span>
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
      </Group>

      <Divider />

      <Group>
        {([2, 3, 4] as const).map((level) => (
          <Btn
            key={level}
            on={editor.isActive("heading", { level })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            label={`Heading ${level}`}
          >
            H{level - 1}
          </Btn>
        ))}
        <Btn
          on={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
          label="Paragraph"
        >
          ¶
        </Btn>
      </Group>

      <Divider />

      <Group>
        <Btn
          on={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="Bulleted list"
        >
          •
        </Btn>
        <Btn
          on={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="Numbered list"
        >
          1.
        </Btn>
        <Btn
          on={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Quote"
        >
          &rdquo;
        </Btn>
        <Btn
          on={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          label="Code block"
        >
          &lt;/&gt;
        </Btn>
        <Btn
          on={false}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Divider"
        >
          —
        </Btn>
      </Group>

      <Divider />

      <Group>
        <Btn on={editor.isActive("link")} onClick={setLink} label="Link">
          🔗
        </Btn>
        <Btn on={false} onClick={onPickImage} label="Insert image">
          {uploading ? "…" : "🖼"}
        </Btn>
      </Group>

      <Divider />

      <Group>
        <Btn
          on={false}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          label="Undo"
        >
          ↶
        </Btn>
        <Btn
          on={false}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          label="Redo"
        >
          ↷
        </Btn>
      </Group>

      <span className="mono ml-auto pr-1 text-[0.5625rem] tracking-[0.12em] uppercase text-[var(--text-faint)]">
        {uploading ? "Uploading image…" : "Paste or drop images"}
      </span>
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-[var(--rule)]" aria-hidden />;
}

function Btn({
  children,
  onClick,
  on,
  label,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  on: boolean;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={on}
      className={`mono flex h-8 min-w-8 items-center justify-center px-2 text-xs transition-colors disabled:opacity-30 ${
        on
          ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
          : "text-[var(--text-dim)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
      }`}
    >
      {children}
    </button>
  );
}
