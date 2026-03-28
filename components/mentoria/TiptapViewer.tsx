'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface TiptapViewerProps {
  content: Record<string, unknown>
}

export function TiptapViewer({ content }: TiptapViewerProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })

  return (
    <EditorContent
      editor={editor}
      className="tiptap-viewer font-body text-navy"
    />
  )
}
