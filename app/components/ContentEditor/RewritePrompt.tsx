import {
  mergeAttributes,
  Node,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react'
import React, { ComponentType } from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Button, Flex } from '@radix-ui/themes'

import './RewritePrompt.css'

export default Node.create({
  name: 'rewritePrompt',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      selection: {
        default: '',
      },
      paragraph: {
        default: '',
      },
      nodePos: {
        default: {},
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'rewrite-prompt',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['rewrite-prompt', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})

function Component({ deleteNode, extension, node }: NodeViewProps) {
  function handleRewrite() {
    const onRewrite = extension.options.onRewrite

    if (onRewrite) {
      onRewrite(node.textContent, node.attrs.selection, node.attrs.paragraph, node.attrs.nodePos)

      deleteNode()
    }
  }

  return (
    <NodeViewWrapper className="rewrite-prompt">
      <label contentEditable={false}>Rewrite to include</label>

      <NodeViewContent className="content is-editable" />

      <Flex gap="2">
        <Button variant="soft" onClick={deleteNode}>
          Cancel
        </Button>
        <Button onClick={handleRewrite}>Rewrite</Button>
      </Flex>
    </NodeViewWrapper>
  )
}
