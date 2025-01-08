import { Button, Flex, Spinner } from '@radix-ui/themes'
import { RefreshCcw } from 'lucide-react'
import { useEffect } from 'react'

import { useReport } from '@/components/useReport'
import { useOpenAI } from '@/hooks/useOpenAI'
import { ActionTypes, ContentEditor } from './ContentEditor'

export type ReportActionProps = {
  selection: string
  paragraph: string
  rewriteText: string
  onUpdateText: (text: string) => void
}

export default function ReportPreview() {
  const { report, isLoading, createReport } = useReport()
  const { rephraseSelection, convertToList, rewriteToInclude } = useOpenAI()

  useEffect(() => {
    createReport()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (report.content.error) {
    return (
      <Flex justify="between">
        There was a problem generating the report. Please try again
        <Button variant="soft" onClick={createReport}>
          <RefreshCcw size={18} />
          Refresh
        </Button>
      </Flex>
    )
  }

  const handleAutoGenerate = () => {
    createReport()
  }

  const handleAction = async (type: ActionTypes, { onUpdateText, ...args }: ReportActionProps) => {
    let response
    switch (type) {
      case 'CONVERT_TO_LIST':
        response = await convertToList({ paragraph: args.paragraph })
        break
      case 'REWRITE_TO_INCLUDE':
        response = await rewriteToInclude({
          paragraph: args.paragraph,
          rewriteText: args.rewriteText,
        })
        break
      case 'SIMPLIFY':
        response = await rephraseSelection({ type: 'SIMPLIFY', ...args })
        break
    }

    if (!response || !response.body) return null

    const content = await response.json()

    onUpdateText(content)
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
