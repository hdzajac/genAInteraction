import { Button, Flex, Spinner } from '@radix-ui/themes'

import { useReport } from '@/components/useReport'
import { useOpenAI } from '@/hooks/useOpenAI'
import { useEffect } from 'react'
import { ContentEditor, ActionTypes } from './ContentEditor'

export default function ReportPreview() {
  const { report, isLoading, createReport, regenerate } = useReport()
  const { rephraseSelection } = useOpenAI()

  useEffect(() => {
    createReport()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const handleAutoGenerate = () => {
    regenerate()
  }

  const handleAction = async (
    type: ActionTypes,
    args: { selection: string; paragraph: string; onUpdateText: (text: string) => void }
  ) => {
    const newText = await rephraseSelection({ type, ...args })

    args.onUpdateText(newText)
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
