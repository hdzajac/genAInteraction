import { Box, Button, DropdownMenu, Flex, Heading, Spinner } from '@radix-ui/themes'
import { WandSparkles } from 'lucide-react'
import { useState } from 'react'

import { useOpenAI } from '@/hooks/useOpenAI'
import { debounce } from '@/utils'
import ContentEditor, { ActionTypes } from './ContentEditor'
import './ReportSection.css'
import { Alternative, ReportSection as TReportSection, useReport } from './useReport'

const reportSection: Record<string, string> = {
  VISUAL_DESCRIPTION: 'Visual description',
  ASSESSMENT: 'Assessment',
  PRIMARY_PLAN: 'Primary plan',
  ALTERNATIVE_PLAN: 'Alternative plan',
  FOLLOW_UP: 'Follow-up',
}

type Props = {
  section: TReportSection
}

export default function ReportSection({ section }: Props) {
  const { pickAlternative, summarizeSection, rephraseSelection, generateSection, updateContent } =
    useReport()
  const { getAlternatives } = useOpenAI()
  const { deleteSection } = useReport()
  const [alternatives, setAlternatives] = useState<any[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const isEmpty = section.content === '' || section.content === '<p></p>'

  const handleSummarize = async () => {
    setIsLoading(true)
    await summarizeSection(section.type)
    setIsLoading(false)
  }

  const handleShowAlternatives = async () => {
    setIsLoading(true)
    const alternatives = await getAlternatives({ paragraph: section.content })

    setAlternatives(alternatives)
    setIsLoading(false)
  }

  const handlePick = (alternative: Alternative) => {
    pickAlternative(section.type, alternative)

    setAlternatives(undefined)
  }

  const handleAction = async (type: ActionTypes, selection: string) => {
    await rephraseSelection(section.type, selection, type)
  }

  const handleGenerateSection = async () => {
    setIsLoading(true)
    await generateSection(section.type)
    setIsLoading(false)
  }

  return (
    <div className="ReportSection">
      <Flex justify="between" pr="2" mt="3">
        <Heading as="h3" size="2" mb="1" style={{ display: 'flex', alignItems: 'center' }}>
          {reportSection[section.type]}
          {isEmpty && (
            <Button variant="ghost" ml="2" size="1" onClick={handleGenerateSection}>
              <WandSparkles size={14} color="var(--gray-9)" />
            </Button>
          )}
        </Heading>
        <DropdownMenuBtn
          onDelete={() => deleteSection(section.type)}
          onShowAlternatives={handleShowAlternatives}
          onSummarize={handleSummarize}
        />
      </Flex>
      <Flex direction="column" gap="2" mb="4" position="relative">
        <Flex className="ReportSection-content" align="start" position="relative">
          {isLoading && (
            <Box
              height="100%"
              position="absolute"
              style={{
                borderRadius: '6px',
                backgroundColor: 'rgb(255, 255, 255, 0.8)',
                zIndex: 1,
              }}>
              <Spinner ml="3" mt="3" />
            </Box>
          )}
          <ContentEditor
            content={section.content}
            onAction={handleAction}
            onUpdate={({ editor }) => {
              debounce(updateContent(section.type, editor.getHTML()), 200)
            }}
          />
        </Flex>
      </Flex>

      {alternatives && (
        <AlternativesSelection alternatives={alternatives} pickAlternative={handlePick} />
      )}
    </div>
  )
}

const DropdownMenuBtn = ({ onDelete, onSummarize, onShowAlternatives }) => {
  return (
    <Flex gap="3" align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" size="1">
            ...
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="1">
          <DropdownMenu.Item onClick={onSummarize}>Summarize</DropdownMenu.Item>
          <DropdownMenu.Item onClick={onShowAlternatives}>Show alternatives</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red" onClick={onDelete}>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

type AlternativesProps = {
  alternatives: Alternative[]
  pickAlternative: (alternative: Alternative) => void
}

function AlternativesSelection({ alternatives, pickAlternative }: AlternativesProps) {
  return (
    <Flex direction="column" gap="2">
      {alternatives?.map((alternative, index) => (
        <div key={index}>
          <Flex gap="2" align="start" direction="column" className="ReportSection-alt">
            {alternative.content}
            <Button variant="soft" onClick={() => pickAlternative(alternative)}>
              Pick this version
            </Button>
          </Flex>
        </div>
      ))}
    </Flex>
  )
}
