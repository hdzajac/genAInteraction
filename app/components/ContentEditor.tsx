import Placeholder from '@tiptap/extension-placeholder'
import {
  BubbleMenu,
  EditorContent,
  EditorEvents,
  Mark,
  mergeAttributes,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CheckCheck, RotateCcw, Undo2 } from 'lucide-react'

import './ContentEditor.css'

export type ActionTypes = 'SIMPLIFY'

type Props = {
  content: string
  onAction: (type: ActionTypes, selection: string) => void
  onUpdate?: (ev: EditorEvents['update']) => void
}

export default function ContentEditor({ content, onAction, onUpdate }: Props) {
  const [lastAction, setLastAction] = useState<ActionTypes | null>(null)

  const HighlightedText = Mark.create({
    name: 'mark-changed',
    addAttributes() {
      return {
        id: {
          default: null,
        },
      }
    },
    toDOM: (node) => {
      return ['span', { class: 'mark-changed', 'data-comment-id': node.attrs.id }, 0]
    },
    renderHTML({ HTMLAttributes }) {
      return ['span', mergeAttributes({ class: 'mark-changed' }, HTMLAttributes), 0]
    },
    parseHTML() {
      return [{ tag: 'span.mark-changed' }]
    },
  })

  const editor = useEditor({
    onUpdate: onUpdate ?? onUpdate,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write report here …',
      }),
      HighlightedText,
    ],
    content,
  })

  useEffect(() => {
    if (editor?.getHTML() !== content) {
      editor?.commands.setContent(content)
    }
  }, [content])

  function handleAction(type: ActionTypes) {
    if (!editor) return

    const { from, to } = editor?.state.selection
    const selection = editor?.state.doc.textBetween(from, to, ' ')

    onAction(type, selection)

    setLastAction(type)
  }

  const handleMarkedTextClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.classList.contains('mark-changed')) {
      const commentId = target.getAttribute('id')

      if (commentId && editor) {
        const from = editor.view.posAtDOM(target, 0)

        if (from !== null) {
          const to = from + target.innerHTML.length

          // Set the selection to the range of the mark
          editor.commands.setTextSelection({ from, to })
        }
      }
    }
  }

  const handleRegenerate = () => {
    if (lastAction) {
      handleAction(lastAction)
    }
  }

  const handleAcceptChange = () => {
    editor?.commands.unsetMark('mark-changed')
  }

  return (
    <EditorContent editor={editor} onClick={handleMarkedTextClick} data-editable={true}>
      {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu> */}

      <BubbleMenu editor={editor}>
        <div className="ContentEditor-bubbleMenu">
          {editor?.isActive('mark-changed') ? (
            <>
              <Flex
                align="center"
                gap="1"
                className="ContentEditor-bubbleItem"
                onClick={() => editor.commands.undo()}>
                <Undo2 size={14} /> Undo
              </Flex>
              <Flex
                align="center"
                gap="1"
                className="ContentEditor-bubbleItem"
                onClick={() => handleRegenerate()}>
                <RotateCcw size={14} /> Regenerate
              </Flex>
              <Flex
                align="center"
                gap="1"
                className="ContentEditor-bubbleItem"
                onClick={() => handleAcceptChange()}>
                <CheckCheck size={14} /> Accept
              </Flex>
            </>
          ) : (
            <>
              <div className="ContentEditor-bubbleItem" onClick={() => handleAction('SIMPLIFY')}>
                Simplify
              </div>
            </>
          )}
        </div>
      </BubbleMenu>
    </EditorContent>
  )
}
