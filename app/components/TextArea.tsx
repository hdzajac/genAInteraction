import { forwardRef, ForwardRefRenderFunction } from 'react'
import { TextArea as RTextArea } from '@radix-ui/themes'

const TextAreaComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  React.ComponentProps<typeof RTextArea>
> = (props, ref) => {
  return <RTextArea {...props} ref={ref} />
}

export const TextArea = forwardRef(TextAreaComponent)
