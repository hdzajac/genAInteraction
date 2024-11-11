import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu, EditorContent, EditorEvents, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import './ContentEditor.css'

export type ActionTypes = 'SIMPLIFY' | 'MAKE_SHORTER' | 'MAKE_LONGER'

type Props = {
  content: string
  onAction: (type: ActionTypes, selection: string) => void
  onUpdate?: (ev: EditorEvents['update']) => void
}

export default function ContentEditor({ content, onAction, onUpdate }: Props) {
  const editor = useEditor({
    onUpdate: onUpdate ?? onUpdate,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write report here …',
      }),
    ],

    content: content,
  })

  useEffect(() => {
    editor?.commands.setContent(content)
  }, [content])

  function handleAction(type: ActionTypes) {
    if (!editor) return

    const { from, to } = editor?.state.selection

    onAction(type, editor?.state.doc.textBetween(from, to, ' '))
  }

  return (
    <EditorContent editor={editor}>
      {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu> */}

      <BubbleMenu editor={editor}>
        <div className="ContentEditor-bubbleMenu">
          <div className="ContentEditor-bubbleItem" onClick={() => handleAction('SIMPLIFY')}>
            Simplify
          </div>
          <div className="ContentEditor-bubbleItem" onClick={() => handleAction('MAKE_SHORTER')}>
            Make shorter
          </div>
          <div className="ContentEditor-bubbleItem" onClick={() => handleAction('MAKE_LONGER')}>
            Make longer
          </div>
        </div>
      </BubbleMenu>
    </EditorContent>
  )
}
