import { forwardRef, ForwardRefRenderFunction } from 'react'
import { TextArea as RTextArea } from '@radix-ui/themes'

const TextAreaComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  React.ComponentProps<typeof RTextArea>
> = (props, ref) => {
  return (
    <RTextArea
      {...props}
      ref={ref}
      style={{ height: 'auto', minHeight: '6em' }}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement
        target.style.height = 'auto'
        target.style.height = `${target.scrollHeight}px`
      }}
    />
  )
}

export const TextArea = forwardRef(TextAreaComponent)
