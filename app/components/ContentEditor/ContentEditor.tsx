import { Flex } from '@radix-ui/themes'
import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CheckCheck, RotateCcw, Undo2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import AlternativeSelection from './AlternativeSelection'
import './ContentEditor.css'
import { TextModifiedMark } from './TextModifiedMark'
import RewritePrompt from './RewritePrompt'

export type ActionTypes = 'SIMPLIFY' | 'CONVERT_TO_LIST' | 'REWRITE_TO_INCLUDE'

type Props = {
  content: string
  onAction: (
    type: ActionTypes,
    args: {
      selection: string
      paragraph: string
      rewriteText?: string
      onUpdateText: (text: string) => void
    }
  ) => void
}

export function ContentEditor({ content, onAction }: Props) {
  const [lastAction, setLastAction] = useState<ActionTypes | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write report here …',
      }),
      TextModifiedMark,
      RewritePrompt.configure({
        onRewrite: (rewriteText: string, selection: string, paragraph: string, pos) => {
          onAction('REWRITE_TO_INCLUDE', {
            selection,
            paragraph,
            rewriteText,
            onUpdateText: (text) => handleTextUpdate(text, pos),
          })
        },
      }),
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

    const parentNode = editor?.state.selection.$head
    const paragraph = parentNode.parent.textContent

    function onUpdateText(text: string) {
      const paragraphStart = editor?.state.selection.$head.start(1) ?? 0
      const paragraphEnd = paragraphStart + (parentNode.parent.nodeSize ?? 0) - 2

      editor
        ?.chain()
        .focus()
        .deleteRange({ from: paragraphStart, to: paragraphEnd })
        .insertContent(text)
        .run()
    }

    onAction(type, { selection, paragraph, onUpdateText })
    setLastAction(type)
  }

  /**
   * Handles the rewrite prompt
   */

  function handleStartRewrite() {
    if (!editor) return

    const { $from } = editor.state.selection
    const { from, to } = editor?.state.selection
    const endOfParagraph = $from.end($from.depth)
    const selection = editor?.state.doc.textBetween(from, to, ' ')

    editor
      .chain()
      .focus()
      .insertContentAt(endOfParagraph, {
        type: 'rewritePrompt',
        attrs: {
          nodePos: editor.state.selection.$from.pos,
          selection: selection,
          paragraph: editor.state.doc.textBetween($from.start($from.depth), endOfParagraph),
        },
        content: [],
      })
      .run()
  }

  /**
   * Handles the selection of an alternative
   */
  const handelPickAlternative = (alternative: string) => {
    if (!editor) return

    const from = editor?.state.selection.$head.start()
    const to = editor?.state.selection.$head.end()

    editor?.chain().focus().insertContentAt({ from, to }, alternative).run()
  }

  /**
   * Handles the update of the text
   */
  function handleTextUpdate(text: string, pos: number) {
    if (!editor) return

    const from = editor.state.doc.resolve(pos).start()
    const to = editor.state.doc.resolve(pos).end()

    editor?.chain().focus().insertContentAt({ from, to }, text).run()
  }

  const handleMarkedTextClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.classList.contains('text-modified')) {
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
    editor?.commands.unsetMark('text-modified')
  }

  return (
    <EditorContent editor={editor} onClick={handleMarkedTextClick} data-editable={true}>
      {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu> */}

      <BubbleMenu editor={editor} tippyOptions={{ maxWidth: 400 }}>
        <div className="ContentEditor-bubbleMenu">
          {editor?.isActive('text-modified') ? (
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
              <div
                className="ContentEditor-bubbleItem"
                onClick={() => handleAction('CONVERT_TO_LIST')}>
                Convert to list
              </div>
              <div className="ContentEditor-bubbleItem" onClick={() => handleStartRewrite()}>
                Rewrite to include
              </div>

              <AlternativeSelection onPickAlternative={handelPickAlternative} />
            </>
          )}
        </div>
      </BubbleMenu>
    </EditorContent>
  )
}
