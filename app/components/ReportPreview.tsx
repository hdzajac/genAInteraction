import { Button, Flex, Spinner } from '@radix-ui/themes'

import ReportSection from './ReportSection'
import { useReport } from '@/components/useReport'

export default function ReportPreview() {
  const { report, isLoading, createReport } = useReport()

  const handleAutoGenerate = () => {
    createReport()
  }

  return (
    <Flex direction="column" gap="2">
      <Flex justify="end" gap="2">
        <Button variant="surface" onClick={handleAutoGenerate}>
          Auto-generate
        </Button>

        <Button>Approve</Button>
      </Flex>
      <Flex className="panel" direction="column" gap="4">
        {report && (
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              report.sections.map((section) => {
                return <ReportSection key={section.type} section={section} />
              })
            )}
          </div>
        )}
      </Flex>
    </Flex>
  )
}
