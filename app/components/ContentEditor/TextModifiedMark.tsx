import { Mark, mergeAttributes } from '@tiptap/react'

export const TextModifiedMark = Mark.create({
  name: 'text-modified',
  addAttributes() {
    return {
      id: {
        default: null,
      },
    }
  },
  toDOM: (node) => {
    return ['span', { class: 'text-modified', 'data-comment-id': node.attrs.id }, 0]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes({ class: 'text-modified' }, HTMLAttributes), 0]
  },
  parseHTML() {
    return [{ tag: 'span.text-modified' }]
  },
})
