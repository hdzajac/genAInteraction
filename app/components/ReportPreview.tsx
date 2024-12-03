import { Button, Flex, Spinner } from '@radix-ui/themes'

import { useReport } from '@/components/useReport'
import { useFlags } from './FeatureFlag/useFlags'
import ReportSection from './ReportSection'
import ReportSectionV2 from './ReportSectionV2'
import { useEffect } from 'react'

export default function ReportPreview() {
  const { report, isLoading, createReport } = useReport()
  const { flags } = useFlags()

  useEffect(() => {
    createReport()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const handleAutoGenerate = () => {
    createReport()
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
              report.sections.map((section) => {
                if (flags.showAlternatives === '1') {
                  return <ReportSection key={section.type} section={section} />
                } else if (flags.showAlternatives === '2') {
                  return <ReportSectionV2 key={section.type} section={section} />
                }
              })
            )}
          </div>
        )}
      </Flex>
    </Flex>
  )
}
