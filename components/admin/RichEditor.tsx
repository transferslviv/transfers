'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichEditor({ content, onChange, placeholder = 'Почніть вводити текст...', minHeight = '120px' }: RichEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'rich-editor-content',
        style: `min-height: ${minHeight}; outline: none; padding: 12px 16px; font-family: var(--font-nunito-sans); font-size: 15px; line-height: 1.6; color: #e0e0e0;`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external content changes (e.g. language switch)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-[#444] rounded-[10px] overflow-hidden bg-[#2a2a2a] transition-all focus-within:border-[#FFAE00]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 bg-[#222] border-b border-[#444]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Жирний"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Курсив"
        >
          <em>I</em>
        </ToolbarButton>

        <div className="w-px h-5 bg-[#444] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Маркований список"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="2.5" cy="4" r="1.5" />
            <circle cx="2.5" cy="8" r="1.5" />
            <circle cx="2.5" cy="12" r="1.5" />
            <rect x="6" y="3" width="9" height="2" rx="0.5" />
            <rect x="6" y="7" width="9" height="2" rx="0.5" />
            <rect x="6" y="11" width="9" height="2" rx="0.5" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Нумерований список"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <text x="1" y="5.5" fontSize="5" fontWeight="bold">1</text>
            <text x="1" y="9.5" fontSize="5" fontWeight="bold">2</text>
            <text x="1" y="13.5" fontSize="5" fontWeight="bold">3</text>
            <rect x="6" y="3" width="9" height="2" rx="0.5" />
            <rect x="6" y="7" width="9" height="2" rx="0.5" />
            <rect x="6" y="11" width="9" height="2" rx="0.5" />
          </svg>
        </ToolbarButton>

        <div className="w-px h-5 bg-[#444] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          active={false}
          title="Відмінити"
          disabled={!editor.can().undo()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          active={false}
          title="Повторити"
          disabled={!editor.can().redo()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Styles for the editor content */}
      <style jsx global>{`
        .rich-editor-content p {
          margin-bottom: 8px;
        }
        .rich-editor-content p:last-child {
          margin-bottom: 0;
        }
        .rich-editor-content ul,
        .rich-editor-content ol {
          padding-left: 24px;
          margin-bottom: 8px;
        }
        .rich-editor-content ul {
          list-style-type: disc;
        }
        .rich-editor-content ol {
          list-style-type: decimal;
        }
        .rich-editor-content li {
          margin-bottom: 4px;
        }
        .rich-editor-content li p {
          margin-bottom: 0;
        }
        .rich-editor-content strong {
          font-weight: 700;
        }
        .rich-editor-content em {
          font-style: italic;
        }
        .rich-editor-content .is-editor-empty:first-child::before {
          color: #666;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  active: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        w-8 h-8 rounded-[6px] flex items-center justify-center text-sm transition-all
        ${active
          ? 'bg-[#FFAE00] text-[#070707]'
          : disabled
            ? 'text-white/20 cursor-not-allowed'
            : 'text-white/70 hover:bg-[#444] hover:text-white'
        }
      `}
    >
      {children}
    </button>
  );
}
