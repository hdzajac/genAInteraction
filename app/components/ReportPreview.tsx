import { Button, Flex, Spinner } from '@radix-ui/themes'

import { useReport } from '@/components/useReport'
import { useOpenAI } from '@/hooks/useOpenAI'
import { useEffect } from 'react'
import { ContentEditor, ActionTypes } from './ContentEditor'

export type ReportActionProps = {
  selection: string
  paragraph: string
  rewriteText: string
  onUpdateText: (text: string) => void
}

export default function ReportPreview() {
  const { report, isLoading, createReport, regenerate } = useReport()
  const { rephraseSelection, convertToList, rewriteToInclude } = useOpenAI()

  useEffect(() => {
    createReport()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const handleAutoGenerate = () => {
    createReport()
  }

  const handleAction = async (type: ActionTypes, { onUpdateText, ...args }: ReportActionProps) => {
    let newText
    switch (type) {
      case 'CONVERT_TO_LIST':
        newText = await convertToList({ paragraph: args.paragraph })
        break
      case 'REWRITE_TO_INCLUDE':
        newText = await rewriteToInclude({
          paragraph: args.paragraph,
          rewriteText: args.rewriteText,
        })
        break
      case 'SIMPLIFY':
        newText = await rephraseSelection({ type: 'SIMPLIFY', ...args })
        break
    }

    onUpdateText(newText)
  }

  return (
    <Flex direction="column" gap="2">
      <Flex justify="start" gap="2">
        <Button variant="surface" onClick={handleAutoGenerate}>
          Re-generate
        </Button>

        <Button>Sign report</Button>
      </Flex>
      <Flex className="panel" direction="column" gap="4">
        {report && (
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              <ContentEditor content={report.content} onAction={handleAction} />
            )}
          </div>
        )}
      </Flex>
    </Flex>
  )
}
