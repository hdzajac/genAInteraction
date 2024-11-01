import { Button, DropdownMenu, Flex, Heading } from '@radix-ui/themes'

import ReportParagraph from './ReportParagraph'
import { ReportSection as TReportSection, useReport } from './useReport'

import './ReportSection.css'

type Props = {
  section: TReportSection
}

const reportSection = {
  VISUAL_DESCRIPTION: 'Visual description',
  ASSESSMENT: 'Assessment',
  PRIMARY_PLAN: 'Primary plan',
  ALTERNATIVE_PLAN: 'Alternative plan',
}

export default function ReportSection({ section }: Props) {
  const { deleteSection } = useReport()

  return (
    <div className="ReportSection">
      <Flex justify="between" pr="2" mt="3">
        <Heading as="h3" size="2" mb="2">
          {reportSection[section.type]}
        </Heading>
        <DropdownMenuBtn handleDelete={() => deleteSection(section.type)} />
      </Flex>
      <Flex direction="column" gap="2" mb="4">
        <ReportParagraph paragraph={section.content} id={{ section: section.type, index: 0 }} />
      </Flex>
    </div>
  )
}

const DropdownMenuBtn = ({ handleDelete }) => {
  return (
    <Flex gap="3" align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" size="1">
            ...
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="1">
          <DropdownMenu.Item color="red" onClick={handleDelete}>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
